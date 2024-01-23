import { Button, Grid, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Row } from "../Row";
import { StitchProps } from "../Stitch";
import { useDispatch, useSelector } from "react-redux";
import { updateBlockRow } from "../../reducers/projectReducer.js";

export interface BlockProps {
	stitches?: StitchProps[][];
	index?: number;
	tallestBlockIndex?: number;
}

/**
 * A block of the pattern; made up of many rows.
 * @param rows The rows to be rendered.
 */
export const Block: FC<BlockProps> = ({ stitches, index, tallestBlockIndex }) => {
	const currentRow = useSelector((state: any) => state.projects.currentRow);
	const currentBlockRow = useSelector((state: any) => state.projects.project.blocks[index].currentBlockRow);
	const tallestBlock = useSelector((state: any) => state.projects.project.blocks[tallestBlockIndex]);

	const handlePadding = () => {
		const firstRow = currentRow === 1 && currentBlockRow === 1;
		if (index === tallestBlockIndex || firstRow) {
			return "50px";
		} else {
			const tallestBlockPosition = tallestBlock.currentBlockRow * 49;
			const currentBlockPosition = currentBlockRow * 49;
			return `${tallestBlockPosition - currentBlockPosition + 50}px`;
		}
	};

	return (
		<Grid
			container
			sx={{
				border: "2px solid red",
				maxHeight: "100%",
				mb: handlePadding(),
			}}
		>
			<Grid
				container
				sx={{
					flexDirection: "column-reverse",
				}}
			>
				<Typography>{currentBlockRow}</Typography>
				{stitches.map((row, i) => {
					return <Row key={`row${i}`} row={row} i={i} rowToHighlight={currentBlockRow - 1 === i} />;
				})}
			</Grid>
		</Grid>
	);
};
