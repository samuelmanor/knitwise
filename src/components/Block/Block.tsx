import { IconButton, Grid, Typography, Box, useTheme, Tooltip } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import { Row } from "../Row";
import { useDispatch, useSelector } from "react-redux";
import {
	EditOutlined,
	DeleteOutlined,
	SaveOutlined,
	SwapHorizOutlined,
	AddOutlined,
	SwapVertOutlined,
} from "@mui/icons-material";
import { deleteBlock } from "../../reducers/projectReducer";
import { StitchProps } from "../Stitch";
import { setMode } from "../../reducers/workspaceReducer";
import { SortableList } from "../Sortable/SortableList";
import { addBlockRow } from "../../reducers/projectReducer";
import { NameEditor } from "../NameEditor";
import { editBlockName } from "../../reducers/projectReducer";
import { Warning } from "../Warning";

export interface BlockProps {
	index: number;
	currentBlockRow: number;
	stitches: StitchProps[][];
	blockName: string;
	tallestBlockIndex?: number;
	draftBlockIndex?: number | null;
	setDraftBlockIndex?: (index: number) => void;
	setDragBlocksEnabled?: (enabled: boolean) => void;
}

/**
 * A block of the pattern; made up of many rows.
 * @param index The index of the block.
 * @param currentBlockRow The current row of the block.
 * @param stitches The stitches for the block.
 * @param blockName The name of the block.
 * @param tallestBlockIndex The index of the tallest block in the project - used to calculate padding for individual blocks.
 * @param draftBlockIndex The index of the block that is currently being edited.
 * @param setDraftBlockIndex A function to set the index of the block that is currently being edited.
 * @param setDragBlocksEnabled A function to enable/disable dragging blocks.
 */
export const Block: FC<BlockProps> = ({
	index,
	currentBlockRow,
	stitches,
	blockName,
	tallestBlockIndex,
	draftBlockIndex,
	setDraftBlockIndex,
	setDragBlocksEnabled,
}) => {
	const project = useSelector((state: any) => state.projects.project);
	const projectRow = useSelector((state: any) => state.projects.projectRow);
	const mode = useSelector((state: any) => state.workspace.mode);

	const [draftRow, setDraftRow] = useState<number | null>(null);
	const [dragRowsEnabled, setDragRowsEnabled] = useState(false);
	const [warning, setWarning] = useState<string | null>(null);

	const baseRowRef = useRef<HTMLDivElement>(null);

	const dispatch = useDispatch();
	const theme = useTheme();

	/**
	 * Calculates the padding for the block.
	 */
	const handlePadding = () => {
		const firstRow = projectRow === 1 && currentBlockRow === 1;
		if (index === tallestBlockIndex || firstRow) {
			// on the first row, all blocks are aligned
			return "5px";
		} else {
			// a block's position is relative to the current row of both the tallest block and the current block
			const tallestBlockPosition =
				project.blocks[tallestBlockIndex].currentBlockRow * baseRowRef.current.clientHeight;
			const currentBlockPosition = currentBlockRow * baseRowRef.current.clientHeight;

			return `${tallestBlockPosition - currentBlockPosition + 5}px`;
		}
	};

	const handleAddRow = (rowIndex: number) => {
		dispatch(addBlockRow({ blockIndex: index, rowIndex }));
	};

	const handleEditBlock = (index: number | null) => {
		setDraftBlockIndex(index);
		dispatch(setMode(index === null ? "edit" : "editBlock"));
	};

	const checkRows = () => {
		let error = false;
		stitches.forEach((row, i) => {
			if (row.length === 0) {
				setWarning("one or more rows are empty.");
				error = true;
			}
		});

		if (!error) {
			handleEditBlock(null);
		}
	};

	const rows = stitches.map((row, i) => {
		return (
			<Box ref={i === 0 ? baseRowRef : null}>
				<Row
					key={`row${blockName}${i}`}
					stitches={row}
					highlightRow={currentBlockRow - 1 === i}
					editingBlock={draftBlockIndex === index}
					rowIndex={i}
					blockIndex={index}
				/>
			</Box>
		);
	});

	const BlockContainer = ({ children }) => {
		return (
			<Grid
				container
				sx={{
					flexDirection: "column-reverse",
					backgroundColor: theme.palette.background.paper,
					// filter: `drop-shadow(5px 5px 0px ${theme.palette.primary.main})`,
					border: `2px solid ${theme.palette.primary.main}`,
					p: 0.5,
					borderTopRightRadius: "10px",
					borderTopLeftRadius: "10px",
					maxHeight: "100%",
					mb: baseRowRef.current && mode !== "edit" ? handlePadding() : "5px",
					width: "fit-content",
				}}
			>
				{children}
			</Grid>
		);
	};

	// chart mode
	if (mode === "chart") {
		return (
			<BlockContainer>
				<Grid container sx={{ justifyContent: "center" }}>
					<Typography variant="h5" sx={{ color: theme.palette.text.primary }}>
						{blockName}
					</Typography>
				</Grid>
				{rows}
			</BlockContainer>
		);
	}

	// this block is being edited
	if (mode === "editBlock" && draftBlockIndex === index) {
		return (
			<Grid container sx={{ flexDirection: "column", pb: 4 }}>
				<NameEditor
					name={blockName}
					onSave={name => dispatch(editBlockName({ blockName: name, blockIndex: index }))}
				/>
				<Grid item sx={{ display: "flex", flexDirection: "column-reverse", gap: 1 }}>
					{dragRowsEnabled ? (
						<SortableList
							items={stitches.map((item, i) => ({
								id: i + 1,
								item: (
									<Row
										stitches={item}
										editingBlock={true}
										rowIndex={i}
										blockIndex={index}
										draftRow={draftRow}
										setDraftRow={setDraftRow}
										dragRowsEnabled={dragRowsEnabled}
									/>
								),
							}))}
							direction="vertical"
						/>
					) : (
						stitches.map((row, i) => {
							return (
								<Row
									stitches={stitches[i]}
									editingBlock={true}
									rowIndex={i}
									blockIndex={index}
									draftRow={draftRow}
									setDraftRow={setDraftRow}
								/>
							);
						})
					)}
				</Grid>
				{dragRowsEnabled ? <Typography>click and drag rows to reorder them!</Typography> : null}
				<Grid
					container
					sx={{
						justifyContent: "center",
						gap: 3,
						mt: 2,
					}}
				>
					<Tooltip
						title="add row"
						placement="bottom"
						componentsProps={{
							tooltip: {
								sx: {
									color: theme.palette.primary.main,
								},
							},
						}}
					>
						<IconButton
							onClick={() => handleAddRow(stitches.length + 1)}
							disabled={draftRow !== null || dragRowsEnabled || warning !== null}
							data-testid={`block${index}AddRowBtn`}
							sx={{ color: theme.palette.primary.main }}
						>
							<AddOutlined />
						</IconButton>
					</Tooltip>
					<Tooltip
						title={dragRowsEnabled ? "finish reordering" : "reorder rows"}
						placement="bottom"
						componentsProps={{
							tooltip: {
								sx: {
									color: theme.palette.primary.main,
								},
							},
						}}
					>
						<IconButton
							onClick={() => setDragRowsEnabled(!dragRowsEnabled)}
							sx={{
								backgroundColor: dragRowsEnabled ? theme.palette.primary.main : "default",
								color: dragRowsEnabled ? theme.palette.text.secondary : theme.palette.primary.main,
							}}
							disableRipple
							disabled={draftRow !== null || warning !== null || stitches.length < 2}
						>
							<SwapVertOutlined />
						</IconButton>
					</Tooltip>
					<Tooltip
						title="save block"
						placement="bottom"
						componentsProps={{
							tooltip: {
								sx: {
									color: theme.palette.primary.main,
								},
							},
						}}
					>
						<IconButton
							onClick={checkRows}
							disabled={draftRow !== null || warning !== null}
							data-testid={`block${index}SaveBtn`}
							sx={{ color: theme.palette.primary.main }}
						>
							<SaveOutlined />
						</IconButton>
					</Tooltip>
				</Grid>
				{warning !== null ? (
					<Warning text={warning} action={() => handleEditBlock(null)} close={() => setWarning(null)} />
				) : null}
			</Grid>
		);
	}

	// edit mode, but no block is being edited
	if (mode === "edit") {
		return (
			<Grid container sx={{ flexDirection: "column", alignItems: "center" }}>
				<BlockContainer>
					<Grid container sx={{ justifyContent: "center" }}>
						{blockName}
					</Grid>
					{rows}
				</BlockContainer>
				<Grid container sx={{ justifyContent: "center", gap: 3, width: "fit-content" }}>
					<Grid item>
						<Tooltip
							title="edit block"
							placement="bottom"
							componentsProps={{
								tooltip: {
									sx: {
										color: theme.palette.primary.main,
									},
								},
							}}
							PopperProps={{
								modifiers: [
									{
										name: "offset",
										options: {
											offset: [0, -10],
										},
									},
								],
							}}
						>
							<IconButton
								sx={{
									color: theme.palette.primary.main,
									transform: "scale(1.5)",
									height: "fit-content",
									width: "fit-content",
								}}
								onClick={() => handleEditBlock(index)}
								data-testid={`block${index}EditBtn`}
								disabled={warning !== null}
							>
								<EditOutlined />
							</IconButton>
						</Tooltip>
					</Grid>
					<Grid item>
						<IconButton
							sx={{
								color: theme.palette.primary.main,
								transform: "scale(1.5)",
								height: "fit-content",
								width: "fit-content",
								cursor: "grab",
							}}
							disableRipple
							disabled={project.blocks.length === 1 || warning !== null}
						>
							<SwapHorizOutlined />
						</IconButton>
					</Grid>
					<Grid item>
						<Tooltip
							title="delete block"
							placement="bottom"
							componentsProps={{
								tooltip: {
									sx: {
										color: theme.palette.primary.main,
									},
								},
							}}
							PopperProps={{
								modifiers: [
									{
										name: "offset",
										options: {
											offset: [0, -10],
										},
									},
								],
							}}
						>
							<IconButton
								sx={{
									color: theme.palette.primary.main,
									transform: "scale(1.5)",
									height: "fit-content",
									width: "fit-content",
								}}
								onClick={() => {
									setWarning("this block will be deleted.");
									setDragBlocksEnabled(false);
								}}
								disabled={project.blocks.length === 1 || warning !== null}
							>
								<DeleteOutlined />
							</IconButton>
						</Tooltip>
					</Grid>
				</Grid>
				{warning !== null ? (
					<Warning
						text={warning}
						action={() => {
							dispatch(deleteBlock({ blockIndex: index }));
							setWarning(null);
							setDragBlocksEnabled(true);
						}}
						close={() => {
							setWarning(null);
							setDragBlocksEnabled(true);
						}}
					/>
				) : null}
			</Grid>
		);
	}
};
