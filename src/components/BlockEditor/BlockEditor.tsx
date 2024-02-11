import { FC } from "react";
import { Block, BlockProps } from "../Block/Block";
import { Button, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

interface BlockEditorProps {
	blockIndex: number;
	closeEditor: () => void;
}

export const BlockEditor: FC<BlockEditorProps> = ({ blockIndex, closeEditor }) => {
	const block = useSelector((state: any) => state.projects.project.blocks[blockIndex]);

	return (
		<Grid container onClick={() => console.log(block)}>
			<Grid item>
				<Block index={blockIndex} {...block} />
			</Grid>
			<Grid item>
				<Button onClick={closeEditor}>close</Button>
			</Grid>
		</Grid>
	);
};
