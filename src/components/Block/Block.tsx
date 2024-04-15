import { IconButton, Grid, Typography, TextField, Box, useTheme, ClickAwayListener } from "@mui/material";
import { FC, ReactElement, useRef, useState } from "react";
import { Row } from "../Row";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined, SaveOutlined } from "@mui/icons-material";
import { BlockEditor } from "../BlockEditor";
import { editBlockName, deleteBlock } from "../../reducers/projectReducer";

export interface BlockProps {
	index: number;
	tallestBlockIndex: number;
	draftBlockIndex: number | null;
	setDraftBlockIndex: (index: number) => void;
}

/**
 * A block of the pattern; made up of many rows.
 * @param index The index of the block.
 * @param tallestBlockIndex The index of the tallest block in the project - used to calculate padding for individual blocks.
 */
export const Block: FC<BlockProps> = ({ index, tallestBlockIndex, draftBlockIndex, setDraftBlockIndex }) => {
	const project = useSelector((state: any) => state.projects.project);
	const projectRow = useSelector((state: any) => state.projects.projectRow);
	const block = useSelector((state: any) => state.projects.project.blocks[index]);
	const mode = useSelector((state: any) => state.workspace.mode);

	const [blockNameDraft, setBlockNameDraft] = useState(block.blockName);
	const [blockNameError, setBlockNameError] = useState(false);
	const [blockNameHelperText, setBlockNameHelperText] = useState("");
	// const [draftBlockIndex, setDraftBlockIndex] = useState<number | null>(null); // the index of the block that is being edited

	const baseRowRef = useRef<HTMLDivElement>(null);

	const dispatch = useDispatch();
	const theme = useTheme();

	/**
	 * Calculates the padding for the block.
	 */
	const handlePadding = () => {
		const firstRow = projectRow === 1 && block.currentBlockRow === 1;
		if (index === tallestBlockIndex || firstRow) {
			// on the first row, all blocks are aligned
			return "5px";
		} else {
			// a block's position is relative to the current row of both the tallest block and the current block
			const tallestBlockPosition =
				project.blocks[tallestBlockIndex].currentBlockRow * baseRowRef.current.clientHeight;
			const currentBlockPosition = block.currentBlockRow * baseRowRef.current.clientHeight;

			return `${tallestBlockPosition - currentBlockPosition + 5}px`;
		}
	};

	/**
	 * Handles changes to the block name and checks for errors.
	 * @param e The event object.
	 */
	const handleBlockNameChange = e => {
		setBlockNameDraft(e.target.value);

		if (e.target.value.length === 0) {
			setBlockNameError(true);
			setBlockNameHelperText("cannot be empty");
		}
	};

	const rows = block.stitches.map((row, i) => {
		return (
			<Box ref={i === 0 ? baseRowRef : null}>
				<Row
					key={`row${block.blockName}${i}`}
					stitches={row}
					highlightRow={block.currentBlockRow - 1 === i}
					rowIndex={i}
					blockIndex={index}
					showLeftRowMarker={index === 0 && projectRow % 2 === 0}
					showRightRowMarker={index === project.blocks.length - 1 && projectRow % 2 === 1}
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
						{block.blockName}
					</Typography>
				</Grid>
				{rows}
			</BlockContainer>
		);
	}

	// specific block is being edited
	if (mode === "edit" && draftBlockIndex === index) {
		console.log(index, "is being edited");
	}

	// edit mode, but block is not being edited
	if (mode === "edit") {
		return (
			<Grid
				container
				data-testid={`block${block.blockName}${index}`}
				sx={{ flexDirection: "column", alignItems: "center" }}
			>
				<BlockContainer>
					<Grid container sx={{ justifyContent: "center" }}>
						<ClickAwayListener
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
										blockNameDraft !== block.blockName ? (
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
						</ClickAwayListener>
					</Grid>
					{rows}
				</BlockContainer>
				<Grid
					container
					sx={{ border: "2px solid blue", justifyContent: "center", gap: 3, width: "fit-content" }}
				>
					<Grid item>
						<IconButton
							sx={{
								color: theme.palette.primary.main,
								transform: "scale(1.5)",
								height: "fit-content",
								width: "fit-content",
							}}
							onClick={() => setDraftBlockIndex(index)}
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
