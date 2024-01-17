import { Box, Button, Grid } from "@mui/material";
import { FC, ReactElement, useEffect, useState } from "react";
import { Block, BlockProps } from "../Block";
import { useDispatch, useSelector } from "react-redux";
import { nextRow } from "../../reducers/projectReducer.js";

export interface ProjectProps {
	projectName?: string;
	projectRow: number;
	blocks: BlockProps[];
}

/**
 * A project; made up of many blocks.
 * @param blocks The blocks to be rendered.
 */
export const Project: FC<ProjectProps> = ({ projectRow, blocks }) => {
	// => to redux, as well as some kind of currentRow var to initialize block rows with
	// const [triggerNextRow, setTriggerNextRow] = useState(false);
	// const [triggerPrevRow, setTriggerPrevRow] = useState(false);
	// const [blocks, setBlocks] = useState<ReactElement[]>([]);

	const currentRow = useSelector((state: any) => state.projects.currentRow);
	const dispatch = useDispatch();

	if (!blocks) return <div>no blocks found</div>;

	const BlockContainer = ({ block, left, bottom }) => {
		return (
			<Box
				sx={{
					position: "absolute",
					ml: left,
					mb: bottom,
					border: "1px solid red",
					// height: "100px",
					// width: "fit-content",
				}}
			>
				{/* editingMode ? show delbtn : dont show delbtn */}
				<Block currentRow={block.currentRow} stitches={block.stitches} />
			</Box>
		);
	};

	return (
		<Grid
			container
			sx={{
				background: "green",
				// justifyContent: "space-around",
				border: "2px solid black",
				display: "flex",
				// flexDirection: "row",
			}}
		>
			{blocks.map((block, i) => {
				return <BlockContainer block={block} left={i * 15} bottom={0} />;
			})}
		</Grid>
	);
};
