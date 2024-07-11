import { IconButton, Grid, Typography, TextField, Box, useTheme, ClickAwayListener } from "@mui/material";
import { FC, useRef, useState } from "react";
import { Row } from "../Row";
import { useDispatch, useSelector } from "react-redux";
import {
	EditOutlined,
	DeleteOutlined,
	SaveOutlined,
	CloseOutlined,
	SwapHorizOutlined,
	AddOutlined,
} from "@mui/icons-material";
import { editBlockName, deleteBlock } from "../../reducers/projectReducer";
import { StitchProps } from "../Stitch";
import { setMode } from "../../reducers/workspaceReducer";
import { Search } from "../Search";
import { SortableList } from "../Sortable/SortableList";
import { BlockEditor } from "../BlockEditor";
import { addBlockRow } from "../../reducers/projectReducer";

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

	const [draftRow, setDraftRow] = useState<number | null>(null);

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

	/**
	 * Handles changes to the block name and checks for errors.
	 * @param e The event object.
	 */
	// const handleBlockNameChange = e => {
	// 	setBlockNameDraft(e.target.value);

	// 	if (e.target.value.length === 0) {
	// 		setBlockNameError(true);
	// 		setBlockNameHelperText("cannot be empty");
	// 	}
	// };

	const handleEditBlock = (index: number | null) => {
		setDraftBlockIndex(index);
		dispatch(setMode(index === null ? "edit" : "editBlock"));
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
					// draftRow={draftRow}
					// setDraftRow={setDraftRow}
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
					filter: `drop-shadow(5px 5px 0px ${theme.palette.primary.main})`,
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
		// move name field editor to here?
		return (
			<Grid container sx={{ flexDirection: "column" }}>
				<Grid item>{blockName}</Grid>
				<Grid item sx={{ display: "flex", flexDirection: "column-reverse", gap: 1 }}>
					{draftRow === null ? (
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
				<IconButton
					onClick={() => handleAddRow(stitches.length + 1)}
					disabled={draftRow !== null}
					data-testid={`block${index}AddRowBtn`}
				>
					<AddOutlined />
				</IconButton>
				<IconButton
					onClick={() => handleEditBlock(null)}
					disabled={draftRow !== null}
					data-testid={`block${index}SaveBtn`}
				>
					<SaveOutlined />
				</IconButton>
			</Grid>
		);
	}

	// edit mode, but no block is being edited
	if (mode === "edit") {
		return (
			<Grid container sx={{ flexDirection: "column", alignItems: "center" }}>
				<BlockContainer>
					<Grid container sx={{ justifyContent: "center" }}>
						{/* <ClickAwayListener
							onClickAway={() =>
								dispatch(editBlockName({ blockName: blockNameDraft, blockIndex: index }))
							}
						>
							<TextField
								value={blockNameDraft}
								onChange={e => handleBlockNameChange(e)}
								variant="standard"
								InputProps={{
									style: {
										fontSize: "18px",
										borderColor: theme.palette.text.secondary,
									},
									endAdornment:
										blockNameDraft !== blockName ? (
											<IconButton
												onClick={() =>
													dispatch(
														editBlockName({ blockName: blockNameDraft, blockIndex: index }),
													)
												}
											>
												<SaveOutlined />
											</IconButton>
										) : null,
								}}
								placeholder="block name"
								error={blockNameError}
								helperText={blockNameHelperText}
							/>
						</ClickAwayListener> */}
						{blockName}
					</Grid>
					{rows}
				</BlockContainer>
				<Grid container sx={{ justifyContent: "center", gap: 3, width: "fit-content" }}>
					<Grid item>
						<IconButton
							sx={{
								color: theme.palette.primary.main,
								transform: "scale(1.5)",
								height: "fit-content",
								width: "fit-content",
							}}
							onClick={() => handleEditBlock(index)}
							data-testid={`block${index}EditBtn`}
						>
							<EditOutlined />
						</IconButton>
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
						>
							<SwapHorizOutlined />
						</IconButton>
					</Grid>
					<Grid item>
						<IconButton
							sx={{
								color: theme.palette.primary.main,
								transform: "scale(1.5)",
								height: "fit-content",
								width: "fit-content",
							}}
							onClick={() => dispatch(deleteBlock({ blockIndex: index }))}
						>
							<DeleteOutlined />
						</IconButton>
					</Grid>
				</Grid>
			</Grid>
		);
	}
};
