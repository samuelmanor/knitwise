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
	const testSelector = useSelector((state: any) => state.projects.project);
	if (!blocks) return <div>no blocks found</div>;

	// const tallestBlockLength = () => {
	// 	let tallestBlock = 0;
	// 	blocks.forEach(block => {
	// 		if (block.stitches.length > tallestBlock) {
	// 			tallestBlock = block.stitches.length;
	// 		}
	// 	});
	// 	return tallestBlock;
	// };

	const getTallestBlock = () => {
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

	return (
		<Grid
			container
			sx={{
				background: "green",
				// height: getTallestBlock() * 100,
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
						<Block
							// currentBlockRow={block.currentBlockRow}
							stitches={block.stitches}
							index={i}
							tallestBlockIndex={getTallestBlock()}
							// tallestBlock={getTallestBlock()}
						/>
					</Box>
				);
			})}

			<Grid item sx={{ position: "absolute", mt: 36 }} onClick={() => console.log(getTallestBlock())}>
				current row
			</Grid>
		</Grid>
	);
};
