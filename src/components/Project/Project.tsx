import { Box, Button, ClickAwayListener, Grid, IconButton, Typography, useTheme } from "@mui/material";
import { FC, useState } from "react";
import { Block, BlockProps } from "../Block";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined, AddOutlined, CancelOutlined } from "@mui/icons-material";
import { BlockEditor } from "../BlockEditor";
import { deleteBlock, addBlock } from "../../reducers/projectReducer";
import { BlockSearch } from "../BlockSearch";

// export interface ProjectProps {}

/**
 * The project; made up of many blocks.
 */
export const Project: FC<{}> = () => {
	// const currentRow = useSelector((state: any) => state.projects.currentRow);
	const mode = useSelector((state: any) => state.workspace.mode);
	const blocks = useSelector((state: any) => state.projects.project.blocks);
	const [showBlockEditor, setShowBlockEditor] = useState(false);
	const [showBlockSearch, setShowBlockSearch] = useState(false);
	const [showBlockMenu, setShowBlockMenu] = useState(false);
	// const [currentDraftBlock, setCurrentDraftBlock] = useState(-1);

	const [draftBlockIndex, setDraftBlockIndex] = useState<number | null>(null); // the index of the block that is being edited

	const dispatch = useDispatch();
	const theme = useTheme();

	if (!blocks) return <div>no blocks found</div>;

	/**
	 * Finds the tallest block in the project-- used to calculate the position for individual blocks when working rows.
	 * @returns The index of the tallest block.
	 */
	const getTallestBlock = () => {
		// move to block component?
		let tallestBlock = 0;
		let index = 0;
		blocks.forEach((block, i) => {
			if (block.stitches.length > tallestBlock) {
				tallestBlock = block.stitches.length;
				index = i;
			}
		});
		return index;
	};

	/**
	 * Opens the block editor.
	 */
	// const handleEdit = (blockIndex: number) => {
	// 	setShowBlockEditor(true);
	// 	setCurrentDraftBlock(blockIndex);
	// };

	/**
	 * Adds a new block to the project at either the beginning or end of the project. //=> todo: add feat to add block between already existing blocks
	 * @param blockName The name of the block to be added.
	 * @param stitches The stitches for the block to be added.
	 */
	// const handleAddNewBlock = (blockName: string, stitches: BlockProps | [[]]) => {
	// 	dispatch(
	// 		addBlock({
	// 			blockName,
	// 			stitches,
	// 			blockIndex: currentDraftBlock === 0 ? 0 : blocks.length,
	// 		}),
	// 	);

	// 	setShowBlockMenu(false);
	// 	setShowBlockEditor(!showBlockSearch);
	// 	setShowBlockSearch(false);
	// };

	const project = blocks.map((block: BlockProps, i: number) => {
		// when a specific block is being edited, only show that block
		if (mode === "editBlock" && draftBlockIndex !== null && draftBlockIndex !== i) return null;

		return (
			<Block
				index={i}
				currentBlockRow={block.currentBlockRow}
				blockName={block.blockName}
				stitches={block.stitches}
				tallestBlockIndex={getTallestBlock()}
				draftBlockIndex={draftBlockIndex}
				setDraftBlockIndex={setDraftBlockIndex}
			/>
		);
	});

	// if (mode === "edit") {
	// 	return (
	// 		<Grid container sx={{ background: "gray", border: "2px solid black", justifyContent: "center", gap: 2 }}>
	// 			{showBlockEditor ? (
	// 				<BlockEditor blockIndex={currentDraftBlock} closeEditor={() => setShowBlockEditor(false)} />
	// 			) : null}
	// 			{!showBlockEditor ? (
	// 				<Grid item>
	// 					<IconButton
	// 						onClick={() => {
	// 							setShowBlockMenu(true);
	// 							setCurrentDraftBlock(0);
	// 						}}
	// 					>
	// 						<AddOutlined />
	// 					</IconButton>
	// 				</Grid>
	// 			) : null}
	// 			{showBlockMenu ? (
	// 				<Grid container sx={{ position: "absolute" }}>
	// 					<IconButton onClick={() => setShowBlockMenu(false)}>
	// 						<CancelOutlined />
	// 					</IconButton>
	// 					<Grid item>
	// 						<Button onClick={() => handleAddNewBlock("new block", [[]])}>
	// 							<Typography>create new block</Typography>
	// 						</Button>
	// 					</Grid>
	// 					<Grid item>
	// 						<Button onClick={() => setShowBlockSearch(true)}>
	// 							<Typography>add new instance of an existing block</Typography>
	// 						</Button>
	// 					</Grid>
	// 				</Grid>
	// 			) : null}
	// 			{!showBlockEditor ? project : null}
	// 			{showBlockSearch ? (
	// 				<BlockSearch closeBlockSearch={() => setShowBlockSearch(false)} addBlock={handleAddNewBlock} />
	// 			) : null}
	// 			{!showBlockEditor ? (
	// 				<Grid item>
	// 					<IconButton
	// 						onClick={() => {
	// 							setShowBlockMenu(true);
	// 							setCurrentDraftBlock(blocks.length);
	// 						}}
	// 					>
	// 						<AddOutlined />
	// 					</IconButton>
	// 				</Grid>
	// 			) : null}
	// 		</Grid>
	// 	);
	// }

	// if (mode === "edit") {
	return (
		<Grid
			container
			sx={{
				width: "fit-content",
				height: "fit-content",
				mt: 2,
				mb: mode === "chart" ? 5 : 10,
				pl: mode === "chart" ? 5 : 10,
				pr: mode === "chart" ? 5 : 10,
				flexWrap: "nowrap",
				gap: 2,
				border: "2px solid green",
				alignItems: "flex-end",
			}}
		>
			{/* {project} */}
			{/* {showBlockEditor ? (
				<BlockEditor blockIndex={currentDraftBlock} closeEditor={() => setShowBlockEditor(false)} />
			) : (
				project
			)} */}
			{project}
		</Grid>
	);
	// }

	// if (mode === "chart") {
	// 	return (
	// 		<Grid
	// 			container
	// 			sx={{
	// 				width: "fit-content",
	// 				height: "fit-content",
	// 				p: 1,
	// 			}}
	// 		>
	// 			{/* <Typography variant="h6">current row: {currentRow}</Typography> */}
	// 			<Grid container sx={{ flexWrap: "nowrap", gap: 2, border: "2px solid green" }}>
	// 				{project}
	// 			</Grid>
	// 		</Grid>
	// 	);
	// }
};
