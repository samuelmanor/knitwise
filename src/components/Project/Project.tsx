import { Box, Button, Grid } from "@mui/material";
import { FC, ReactElement, useEffect, useState } from "react";
import { Block, BlockProps } from "../Block";
import { useDispatch, useSelector } from "react-redux";
import { nextRow } from "../../reducers/projectReducer.js";

export interface ProjectProps {
	projectName?: string;
	currentProjectRow: number;
	blocks: BlockProps[];
}

/**
 * A project; made up of many blocks.
 * @param blocks The blocks to be rendered.
 */
export const Project: FC<ProjectProps> = ({ currentProjectRow, blocks }) => {
	// => to redux, as well as some kind of currentRow var to initialize block rows with
	// const [triggerNextRow, setTriggerNextRow] = useState(false);
	// const [triggerPrevRow, setTriggerPrevRow] = useState(false);
	// const [blocks, setBlocks] = useState<ReactElement[]>([]);

	// const currentRow = useSelector((state: any) => state.projects.currentRow);
	// const dispatch = useDispatch();

	if (!blocks) return <div>no blocks found</div>;

	return (
		<Grid
			container
			sx={{
				background: "green",
				// height: "fit-content",
				// // justifyContent: "space-around",
				// border: "2px solid black",
				// display: "flex",
				// // flexDirection: "row",
				justifyContent: "center",
				gap: 2,
			}}
		>
			{blocks.map((block, i) => {
				return (
					<Box key={i} sx={{ display: "flex", alignItems: "flex-end" }}>
						<Block currentBlockRow={block.currentBlockRow} stitches={block.stitches} index={i} />
					</Box>
				);
			})}
		</Grid>
	);
};
