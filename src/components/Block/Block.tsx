import { Button, Grid, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Row } from "../Row";
import { StitchProps } from "../Stitch";
import { useDispatch, useSelector } from "react-redux";
import { updateBlockRow } from "../../reducers/projectReducer.js";

export interface BlockProps {
	// block?: object;
	// currentBlockRow?: number;
	stitches?: StitchProps[][];
	index?: number;
	// tallestBlock?: number;
	// index: number;
	// block: {
	// 	currentBlockRow: number;
	// 	stitches: StitchProps[][];
	// };
}

/**
 * A block of the pattern; made up of many rows.
 * @param rows The rows to be rendered.
 */
export const Block: FC<BlockProps> = ({ stitches, index }) => {
	// const currentRow = useSelector((state: any) => state.projects.currentRow);
	// const [rowToHighlight, setRowToHighlight] = useState(currentBlockRow);

	const currentRow = useSelector((state: any) => state.projects.currentRow);
	const currentBlockRow = useSelector((state: any) => state.projects.project.blocks[index].currentBlockRow);

	// const dispatch = useDispatch();

	// const highlightRow = (current: number, max: number) => {
	// 	if (currentRow <= max) {
	// 		return currentRow;
	// 	} else if (currentRow === max + 1 || current === max) {
	// 		return 1;
	// 	} else if (current < max) {
	// 		return current + 1;
	// 	}
	// };

	// const getNextBlockRow = () => {
	// 	if (block.currentBlockRow <= block.stitches.length) {
	// 		dispatch(updateBlockRow({ index, newPosition: block.currentBlockRow + 1 }));
	// 	}
	// };

	useEffect(() => {
		// if (currentRow <= stitches.length) {
		// 	setRowToHighlight(currentRow);
		// } else if (currentRow === stitches.length + 1 || rowToHighlight === stitches.length) {
		// 	setRowToHighlight(1);
		// } else if (rowToHighlight < stitches.length) {
		// 	setRowToHighlight(rowToHighlight + 1);
		// }
		// setRowToHighlight(highlightRow(rowToHighlight, block.stitches.length));
		// dispatch(updateBlockRow({ blockIndex: index, row: rowToHighlight }));
		// console.log(`currentBlockRow for block ${index} is ${currentBlockRow}`);
		// call updateBlockRow at the end when saving progress
		// getNextBlockRow();
	}, [currentRow]);

	// const handlePadding = () => {
	// 	const numberOfRepeats = Math.floor(currentRow / (tallestBlock + 1));
	// 	const tallestBlockRowNum = currentRow % tallestBlock; // get this from redux instead
	// 	// stitches.length === tallestBlock && rowToHighlight === 1
	// 	const firstRow = currentRow === 1 && currentBlockRow === 1;

	// 	let testRepeatsCounter = 0;
	// 	let tallestHasRepeated = stitches.length === tallestBlock && rowToHighlight === 1 && numberOfRepeats > 0;

	// 	if (tallestHasRepeated) {
	// 		testRepeatsCounter++;
	// 		console.log(testRepeatsCounter);
	// 	}
	// 	// console.log(currentRow, "repeats", numberOfRepeats);

	// 	if (stitches.length === tallestBlock || firstRow) {
	// 		// console.log(
	// 		// 	"tallest block position:",
	// 		// 	tallestBlockRowNum,
	// 		// 	"or",
	// 		// 	highlightRow(rowToHighlight, tallestBlock),
	// 		// );
	// 		return `0 0 ${50}px 0`;
	// 		// } else if (numberOfRepeats > 0 && tallestBlockRowNum === tallestBlock && stitches.length !== tallestBlock) {
	// 		// 	console.log(index + 1, "first else if");
	// 		// 	return 0;
	// 		// 	// return `0 0 ${tallestBlockRowNum * 49 - rowToHighlight * 49}px 0`;
	// 	} else if (tallestBlockRowNum + numberOfRepeats === 1) {
	// 		// console.log("sadjklhflkasdhjf");
	// 		return 0;
	// 	} else {
	// 		// return `0 0 ${
	// 		// 	tallestBlockRowNum * 49 -
	// 		// 	rowToHighlight * 49 +
	// 		// 	(tallestBlockRowNum !== 1 ? numberOfRepeats * 49 : 0) +
	// 		// 	50
	// 		// }px 0`;
	// 		// console.log(index + 1, "last else block ");
	// 		const tallestBlockPosition = (tallestBlockRowNum + numberOfRepeats) * 49;
	// 		const currentBlockPosition = rowToHighlight * 49;
	// 		const repeatPosition = numberOfRepeats * 49;
	// 		// const staticSpace = numberOfRepeats > 0 ? 0 : 50;
	// 		return `0 0 ${tallestBlockPosition - currentBlockPosition + 50}px 0`;
	// 		return 0;
	// 	}
	// };

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

	// if (!block) {
	// 	return <div>no block found</div>;
	// }

	return (
		<Grid
			container
			// onClick={() => console.log(currentBlockRow)}
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
				// width: stitches[0].length * 40,
				maxHeight: "100%",
				// width: "20%",
				// position: "absolute",
				// ml: index * 40,
				// pb: stitches.length * 3, // maybe dont have everything absolute and have height be 100% of the project area, then align the block in the center and add top and bottom padding to move things up and down?
				// width: block.stitches[0].length * 30,
				// left: stitches.length * -10,
				// m: handlePadding(),
				// pb: ()
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
				<Typography>{currentBlockRow}</Typography>
				{/* <Button onClick={() => console.log("stitches:", stitches)}>log stitches</Button> */}
				{stitches.map((row, i) => {
					return <Row key={`row${i}`} row={row} i={i} rowToHighlight={currentBlockRow - 1 === i} />;
				})}
			</Grid>
		</Grid>
	);
};
