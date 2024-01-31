import { Box, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { Block, BlockProps } from "../Block";
import { useSelector } from "react-redux";

export interface ProjectProps {
	// projectName?: string;
	blocks: BlockProps[];
}

/**
 * A project; made up of many blocks.
 * @param blocks The blocks of the project.
 */
export const Project: FC<ProjectProps> = ({ blocks }) => {
	const currentRow = useSelector((state: any) => state.projects.currentRow);
	if (!blocks) return <div>no blocks found</div>;

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
				background: "gray",
				border: "2px solid black",
				justifyContent: "center",
				gap: 2,
			}}
		>
			<Typography variant="h6">current row: {currentRow}</Typography>
			{blocks.map((block, i) => {
				return (
					<Box key={i} sx={{ display: "flex", alignItems: "flex-end" }}>
						<Block stitches={block.stitches} index={i} tallestBlockIndex={getTallestBlock()} />
					</Box>
				);
			})}
		</Grid>
	);
};
