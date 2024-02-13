import { Box, Grid, IconButton, Typography } from "@mui/material";
import { FC, useState } from "react";
import { Block, BlockProps } from "../Block";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@mui/icons-material";
import { BlockEditor } from "../BlockEditor";
import { deleteBlock } from "../../reducers/projectReducer";

export interface ProjectProps {
	projectName?: string;
	// blocks?: BlockProps[];
}

/**
 * A project; made up of many blocks.
 * @param blocks The blocks of the project.
 */
export const Project: FC<ProjectProps> = ({}) => {
	const currentRow = useSelector((state: any) => state.projects.currentRow);
	const currentMode = useSelector((state: any) => state.workspace.mode);
	const blocks = useSelector((state: any) => state.projects.project.blocks);
	const [showBlockEditor, setShowBlockEditor] = useState(false);
	const [currentDraftBlock, setCurrentDraftBlock] = useState(0);

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

	return (
		<Grid
			container
			sx={{
				background: "gray",
				border: "2px solid black",
				justifyContent: "center",
				gap: 2,
			}}
		>
			{currentMode === "edit" && showBlockEditor ? (
				<BlockEditor blockIndex={currentDraftBlock} closeEditor={() => setShowBlockEditor(false)} />
			) : null}
			{currentMode === "chart" ? <Typography variant="h6">current row: {currentRow}</Typography> : null}
			{blocks.map((block: BlockProps, i: number) => {
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
			})}
		</Grid>
	);
};
