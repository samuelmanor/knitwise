import { Box, Button, ClickAwayListener, Grid, IconButton, Typography } from "@mui/material";
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
	const [currentDraftBlock, setCurrentDraftBlock] = useState(-1);

	const dispatch = useDispatch();

	if (!blocks) return <div>no blocks found</div>;

	/**
	 * Finds the tallest block in the project-- used to calculate the position for individual blocks when working rows.
	 * @returns The index of the tallest block.
	 */
	const getTallestBlock = () => {
		// move to block component?
		let tallestBlock = 0;
		let index = 0;
		blocks.forEach((block: BlockProps, i: number) => {
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
	const handleEdit = (blockIndex: number) => {
		setShowBlockEditor(true);
		setCurrentDraftBlock(blockIndex);
	};

	/**
	 * Adds a new block to the project at either the beginning or end of the project. //=> todo: add feat to add block between already existing blocks
	 * @param blockName The name of the block to be added.
	 * @param stitches The stitches for the block to be added.
	 */
	const handleAddNewBlock = (blockName: string, stitches: BlockProps | [[]]) => {
		dispatch(
			addBlock({
				blockName,
				stitches,
				blockIndex: currentDraftBlock === 0 ? 0 : blocks.length,
			}),
		);

		setShowBlockMenu(false);
		setShowBlockEditor(!showBlockSearch);
		setShowBlockSearch(false);
	};

	const project = blocks.map((block: BlockProps, i: number) => {
		return (
			<Box key={i} sx={{ display: "flex", alignItems: "flex-end", pb: 2 }}>
				{mode === "edit" ? (
					<Grid container position={"absolute"}>
						<IconButton onClick={() => handleEdit(i)}>
							<EditOutlined />
						</IconButton>
						<IconButton onClick={() => dispatch(deleteBlock({ blockIndex: i }))}>
							<DeleteOutlined />
						</IconButton>
					</Grid>
				) : null}
				<Block
					stitches={block.stitches}
					blockName={block.blockName}
					index={i}
					tallestBlockIndex={getTallestBlock()}
				/>
			</Box>
		);
	});

	if (mode === "edit") {
		return (
			<Grid container sx={{ background: "gray", border: "2px solid black", justifyContent: "center", gap: 2 }}>
				{showBlockEditor ? (
					<BlockEditor blockIndex={currentDraftBlock} closeEditor={() => setShowBlockEditor(false)} />
				) : null}
				<Grid item>
					<IconButton
						onClick={() => {
							setShowBlockMenu(true);
							setCurrentDraftBlock(0);
						}}
					>
						<AddOutlined />
					</IconButton>
				</Grid>
				{showBlockMenu ? (
					<Grid container sx={{ position: "absolute" }}>
						<IconButton onClick={() => setShowBlockMenu(false)}>
							<CancelOutlined />
						</IconButton>
						<Grid item>
							<Button onClick={() => handleAddNewBlock("new block", [[]])}>
								<Typography>create new block</Typography>
							</Button>
						</Grid>
						<Grid item>
							<Button onClick={() => setShowBlockSearch(true)}>
								<Typography>add new instance of an existing block</Typography>
							</Button>
						</Grid>
					</Grid>
				) : null}
				{project}
				{showBlockSearch ? (
					<BlockSearch closeBlockSearch={() => setShowBlockSearch(false)} addBlock={handleAddNewBlock} />
				) : null}
				<Grid item>
					<IconButton
						onClick={() => {
							setShowBlockMenu(true);
							setCurrentDraftBlock(blocks.length);
						}}
					>
						<AddOutlined />
					</IconButton>
				</Grid>
			</Grid>
		);
	}

	if (mode === "chart") {
		return (
			<Grid
				container
				sx={{
					// background: "gray",
					// border: "2px solid black",
					// justifyContent: "center",
					gap: 2,
					// pl: 10,
					// pr: 10,
					// display: "flex",
					// flexDirection: "row",
					// width: "100%",
					width: "fit-content",
					backgroundImage:
						"linear-gradient(to right, #f6f2df, #f5f1dc, #f5f0d9, #f4efd6, #f3eed3, #f2edd0, #f2ebce, #f1eacb, #f0e9c8, #efe8c5, #eee6c2, #ede5bf)",
					flexWrap: "nowrap",
					pr: 8,
					pl: 8,
					pt: 2,
					backgroundColor: "red",
					// overflowX: "scroll",
					// flexWrap: "nowrap",
				}}
			>
				{/* <Typography variant="h6">current row: {currentRow}</Typography> */}
				{project}
			</Grid>
		);
	}
};
