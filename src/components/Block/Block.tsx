import { Button, Grid, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Row } from "../Row";
import { StitchProps } from "../Stitch";
import { useSelector } from "react-redux";

export interface BlockProps {
	// block?: object[];
	currentBlockRow: number;
	stitches: StitchProps[][];
	index?: number;
}

/**
 * A block of the pattern; made up of many rows.
 * @param rows The rows to be rendered.
 */
export const Block: FC<BlockProps> = ({ currentBlockRow, stitches, index }) => {
	// const currentRow = useSelector((state: any) => state.projects.currentRow);
	const [rowToHighlight, setRowToHighlight] = useState(currentBlockRow);
	const currentRow = useSelector((state: any) => state.projects.currentRow);

	useEffect(() => {
		if (currentRow <= stitches.length) {
			setRowToHighlight(currentRow);
		} else if (currentRow === stitches.length + 1 || rowToHighlight === stitches.length) {
			setRowToHighlight(1);
		} else if (rowToHighlight < stitches.length) {
			setRowToHighlight(rowToHighlight + 1);
		}
		// console.log(`currentBlockRow for block ${index} is ${currentBlockRow}`);

		// call updateBlockRow at the end when saving progress
	}, [currentRow]);

	/**
	 * Handles the block repeat when going to the previous row.
	 */
	// useEffect(() => {
	// 	if (triggerPrevRow) {
	// 		if (currentBlockRow === 1) {
	// 			setCurrentBlockRow(block.length);
	// 		} else {
	// 			setCurrentBlockRow(currentBlockRow - 1);
	// 		}
	// 		setTriggerPrevRow(false);
	// 	}
	// }, [block, currentBlockRow, triggerPrevRow]);

	return (
		<Grid
			container
			// onClick={() => console.log("block length:", block.length, "currentBlockRow:", currentBlockRow)}
			sx={{
				// border: "2px red solid",
				// width: "fit-content",
				// flexDirection: "row",
				// margin: "5px",
				// backgroundColor: "rgba(0, 0, 0, 0.5)",
				// mt: currentBlockRow * -1.5,
				// ml: (stitches.length - index) * 30,
				// ml: (index + 1) * 20 - stitches.length * 2.5,
				border: "2px solid red",
				width: stitches[0].length * 60,
				// width: "20%",
				// position: "absolute",
				// ml: index * 40,
				// pb: stitches.length * 3, // maybe dont have everything absolute and have height be 100% of the project area, then align the block in the center and add top and bottom padding to move things up and down?
				// width: stitches.length * 40,
				// left: stitches.length * -10,
			}}
		>
			<Grid
				container
				sx={{
					flexDirection: "column-reverse",
					// marginBottom: currentBlockRow * -6.4, // needs to change if font size changes
				}}
			>
				{/* {renderRows()} */}
				{/* block */}
				<Typography>highlighting row {rowToHighlight}</Typography>
				<Button onClick={() => console.log("stitches:", stitches)}>log stitches</Button>
				{stitches.map((row, i) => {
					return <Row key={i} row={row} i={i} rowToHighlight={rowToHighlight} />;
				})}
			</Grid>
		</Grid>
	);
};
