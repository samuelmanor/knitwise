import { IconButton, Grid, Typography, Box, useTheme, Tooltip } from "@mui/material";
import { FC, useRef, useState } from "react";
import { Row } from "../Row";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined, SaveOutlined, AddOutlined, SwapVertOutlined } from "@mui/icons-material";
import { deleteBlock } from "../../reducers/projectReducer";
import { StitchProps } from "../Stitch";
import { setMode } from "../../reducers/workspaceReducer";
import { SortableList } from "../Sortable/SortableList";
import { addBlockRow } from "../../reducers/projectReducer";
import { NameEditor } from "../NameEditor";
import { editBlockName } from "../../reducers/projectReducer";
import { Warning } from "../Warning";
import { changeSetting } from "../../reducers/workspaceReducer";

export interface BlockProps {
	index: number;
	currentBlockRow: number;
	stitches: StitchProps[][];
	blockName: string;
	tallestBlockIndex?: number;
	draftBlockIndex?: number | null;
	setDraftBlockIndex?: (index: number) => void;
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
 */
export const Block: FC<BlockProps> = ({
	index,
	currentBlockRow,
	stitches,
	blockName,
	tallestBlockIndex,
	draftBlockIndex,
	setDraftBlockIndex,
}) => {
	const project = useSelector((state: any) => state.projects.project);
	const projectRow = useSelector((state: any) => state.projects.projectRow);
	const mode = useSelector((state: any) => state.workspace.mode);
	const showDeleteBlockConfirmation = useSelector(
		(state: any) => state.workspace.settings.showDeleteBlockConfirmation,
	);

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

	/**
	 * Adds a new row to the block.
	 */
	const handleAddRow = (rowIndex: number) => {
		dispatch(addBlockRow({ blockIndex: index, rowIndex }));
	};

	/**
	 * Sets the block to edit mode.
	 */
	const handleEditBlock = (i: number | null) => {
		setDraftBlockIndex(i);
		dispatch(setMode(i === null ? "edit" : "editBlock"));

		setTimeout(() => {
			const editedBlock = document.getElementById(`block${index}`);
			if (editedBlock) {
				window.scrollTo({
					top: document.body.scrollHeight,
					left: editedBlock.offsetLeft - window.innerWidth / 2 + editedBlock.clientWidth / 2,
				});
			}
		}, 10);
	};

	/**
	 * Checks the rows of the block for empty rows or width errors, and sets a warning if necessary.
	 */
	const checkRows = () => {
		stitches.forEach((row, i) => {
			// check for empty rows
			if (row.length === 0) {
				setWarning("one or more rows are empty.");
			}

			// check for rows with different numbers of stitches
			if (i === 0) return; // skip the first row
			if (row.length !== stitches[i - 1].length) {
				setWarning(`row ${i + 1} has a different number of stitches than the previous row.`);
			}
		});
	};

	/**
	 * Renders the rows of the block.
	 */
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

	/**
	 * Standard container for blocks.
	 */
	const BlockContainer = ({ children }) => {
		return (
			<Grid
				container
				sx={{
					flexDirection: "column-reverse",
					backgroundColor: theme.palette.background.paper,
					border: `2px solid ${theme.palette.primary.main}`,
					p: 0.5,
					borderTopRightRadius: "10px",
					borderTopLeftRadius: "10px",
					maxHeight: "100%",
					mb: baseRowRef.current && mode !== "edit" ? handlePadding() : "5px",
					width: "fit-content",
				}}
				id={`block${index}`}
			>
				{children}
			</Grid>
		);
	};

	// chart mode
	if (mode === "chart") {
		return (
			<BlockContainer>
				<Grid container sx={{ justifyContent: "center", paddingX: 2, whiteSpace: "nowrap" }}>
					<Typography variant="h5" sx={{ color: theme.palette.text.primary }}>
						{blockName}
					</Typography>
				</Grid>
				{stitches.length === 1 && stitches[0].length === 0 ? (
					<Grid container sx={{ justifyContent: "center", width: "fit-content" }}>
						<Typography variant="h4">no stitches yet!</Typography>
					</Grid>
				) : (
					rows
				)}
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
					disabled={warning !== null || dragRowsEnabled}
				/>
				<Grid
					item
					sx={{
						display: "flex",
						flexDirection: "column-reverse",
						gap: 1,
						p: 1,
						border: dragRowsEnabled ? `1rem solid ${theme.palette.primary.light}` : "none",
						borderImage: dragRowsEnabled
							? `repeating-linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.primary.light} 5px, ${theme.palette.primary.main} 6px, ${theme.palette.primary.main} 15px, ${theme.palette.primary.light} 16px, ${theme.palette.primary.light} 20px) 20/1rem`
							: "none",
					}}
				>
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
							onClick={() => handleAddRow(stitches.length + 1)}
							disabled={draftRow !== null || dragRowsEnabled || warning !== null}
							data-testid={`block${index}AddRowBtn`}
							sx={{ color: theme.palette.primary.main }}
						>
							<AddOutlined fontSize="large" />
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
							onClick={() => setDragRowsEnabled(!dragRowsEnabled)}
							sx={{
								backgroundColor: dragRowsEnabled ? theme.palette.primary.main : "default",
								color: dragRowsEnabled ? theme.palette.text.secondary : theme.palette.primary.main,
							}}
							disableRipple
							disabled={draftRow !== null || warning !== null || stitches.length < 2}
						>
							<SwapVertOutlined fontSize="large" />
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
							onClick={checkRows}
							disabled={draftRow !== null || warning !== null}
							data-testid={`block${index}SaveBtn`}
							sx={{ color: theme.palette.primary.main }}
						>
							<SaveOutlined fontSize="large" />
						</IconButton>
					</Tooltip>
				</Grid>
				{warning !== null ? (
					<Warning
						text={warning}
						action={() => {
							handleEditBlock(null);
							setWarning(null);
						}}
						close={() => setWarning(null)}
					/>
				) : null}
			</Grid>
		);
	}

	// edit mode, but no block is being edited
	if (mode === "edit" || mode === "dragBlocks") {
		return (
			<Grid container sx={{ flexDirection: "column", alignItems: "center" }}>
				<BlockContainer>
					<Grid container sx={{ justifyContent: "center" }}>
						<Typography
							variant="h5"
							sx={{ color: theme.palette.text.primary, whiteSpace: "nowrap", paddingX: 2 }}
						>
							{blockName}
						</Typography>
					</Grid>
					{rows}
				</BlockContainer>
				<Grid container sx={{ justifyContent: "center", gap: 3, width: "fit-content", flexWrap: "nowrap" }}>
					<Grid item display={mode === "dragBlocks" ? "none" : ""}>
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
											offset: [0, -15],
										},
									},
								],
							}}
						>
							<IconButton
								sx={{
									color: theme.palette.primary.main,
								}}
								onClick={() => handleEditBlock(index)}
								data-testid={`block${index}EditBtn`}
								disabled={warning !== null}
							>
								<EditOutlined fontSize="large" />
							</IconButton>
						</Tooltip>
					</Grid>
					<Grid item display={mode === "dragBlocks" ? "none" : ""}>
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
											offset: [0, -15],
										},
									},
								],
							}}
						>
							<IconButton
								sx={{
									color: theme.palette.primary.main,
								}}
								onClick={() => {
									showDeleteBlockConfirmation
										? setWarning("this block will be deleted.")
										: dispatch(deleteBlock({ blockIndex: index }));
								}}
								disabled={project.blocks.length === 1 || warning !== null}
							>
								<DeleteOutlined fontSize="large" />
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
						}}
						close={() => {
							setWarning(null);
						}}
						setting={showDeleteBlockConfirmation}
						updateSetting={() =>
							dispatch(changeSetting({ setting: "showDeleteBlockConfirmation", value: false }))
						}
					/>
				) : null}
			</Grid>
		);
	}
};
