import { Grid, Typography } from "@mui/material";
import { FC } from "react";
import { Row } from "../Row";
import { StitchProps } from "../Stitch";
import { useSelector } from "react-redux";

export interface BlockProps {
	stitches: StitchProps[][];
	index?: number;
	tallestBlockIndex?: number;
}

/**
 * A block of the pattern; made up of many rows.
 * @param stitches The rows of stitches to be rendered.
 * @param index The index of the block.
 * @param tallestBlockIndex The index of the tallest block in the project - used to calculate padding for individual blocks.
 */
export const Block: FC<BlockProps> = ({ stitches, index, tallestBlockIndex }) => {
	const currentRow = useSelector((state: any) => state.projects.currentRow);
	const numOfBlocks = useSelector((state: any) => state.projects.project.blocks.length);
	const currentBlockRow = useSelector((state: any) => state.projects.project.blocks[index].currentBlockRow);
	const tallestBlock = useSelector((state: any) => state.projects.project.blocks[tallestBlockIndex]);

	/**
	 * Calculates the padding for the block.
	 */
	const handlePadding = () => {
		const firstRow = currentRow === 1 && currentBlockRow === 1;
		if (index === tallestBlockIndex || firstRow) {
			// on the first row, all blocks are aligned
			return "50px";
		} else {
			// a block's position is relative to the current row of both the tallest block and the current block
			const tallestBlockPosition = tallestBlock.currentBlockRow * 49;
			const currentBlockPosition = currentBlockRow * 49;
			return `${tallestBlockPosition - currentBlockPosition + 50}px`;
		}
	};

	if (!stitches) {
		return null; // make error block ?
	}

	return (
		<Grid
			container
			sx={{
				border: "2px solid red",
				maxHeight: "100%",
				mb: handlePadding(),
			}}
			data-testid={`block${index}`}
		>
			<Grid
				container
				sx={{
					flexDirection: "column-reverse",
				}}
			>
				<Typography>{currentBlockRow}</Typography>
				{stitches.map((row, i) => {
					return (
						<Row
							key={`row${i}`}
							row={row}
							highlightRow={currentBlockRow - 1 === i}
							rowIndex={i}
							showLeftRowMarker={index === 0 && currentRow % 2 === 0}
							showRightRowMarker={index === numOfBlocks - 1 && currentRow % 2 === 1}
						/>
					);
				})}
			</Grid>
		</Grid>
	);
};
