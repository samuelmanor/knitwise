import { Box, Button, ClickAwayListener, Grid, IconButton, Typography } from "@mui/material";
import { FC, useState } from "react";
import { Block, BlockProps } from "../Block";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined, AddOutlined, CancelOutlined } from "@mui/icons-material";
import { BlockEditor } from "../BlockEditor";
import { deleteBlock, addBlock } from "../../reducers/projectReducer";

export interface ProjectProps {}

/**
 * A project; made up of many blocks.
 */
export const Project: FC<ProjectProps> = () => {
	const currentRow = useSelector((state: any) => state.projects.currentRow);
	const currentMode = useSelector((state: any) => state.workspace.mode);
	const blocks = useSelector((state: any) => state.projects.project.blocks);
	const [showBlockEditor, setShowBlockEditor] = useState(false);
	const [showBlockMenu, setShowBlockMenu] = useState(false);
	const [currentDraftBlock, setCurrentDraftBlock] = useState(-1);

	const dispatch = useDispatch();

	if (!blocks) return <div>no blocks found</div>;

	const getTallestBlock = () => {
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

	const handleEdit = (blockIndex: number) => {
		setShowBlockEditor(true);
		setCurrentDraftBlock(blockIndex);
	};

	const handleAddNewBlock = (position: "start" | "end") => {
		dispatch(addBlock({ blockIndex: position === "start" ? 0 : blocks.length }));
		setShowBlockMenu(false);
		setShowBlockEditor(true);
	};

	const project = blocks.map((block: BlockProps, i: number) => {
		return (
			<Box key={i} sx={{ display: "flex", alignItems: "flex-end" }}>
				{currentMode === "edit" ? (
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

	if (currentMode === "edit") {
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
					<ClickAwayListener onClickAway={() => setShowBlockMenu(false)}>
						<Grid container sx={{ position: "absolute" }}>
							<IconButton onClick={() => setShowBlockMenu(false)}>
								<CancelOutlined />
							</IconButton>
							<Grid item>
								<Button onClick={() => handleAddNewBlock(currentDraftBlock === 0 ? "start" : "end")}>
									<Typography>create new block</Typography>
								</Button>
							</Grid>
							<Grid item>
								<Button>
									<Typography>add new instance of an existing block</Typography>
								</Button>
							</Grid>
						</Grid>
					</ClickAwayListener>
				) : null}
				{project}
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

	if (currentMode === "chart") {
		return (
			<Grid container sx={{ background: "gray", border: "2px solid black", justifyContent: "center", gap: 2 }}>
				<Typography variant="h6">current row: {currentRow}</Typography>
				{project}
			</Grid>
		);
	}
};
