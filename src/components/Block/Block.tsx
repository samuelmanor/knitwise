import { Grid } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Row } from "../Row";
import { StitchProps } from "../Stitch";
import { useSelector } from "react-redux";

export interface BlockProps {
	// block?: object[];
	currentRow: number;
	stitches: StitchProps[][];
	// triggerNextRow?: boolean;
	// setTriggerNextRow?: React.Dispatch<React.SetStateAction<boolean>>;
	// triggerPrevRow?: boolean;
	// setTriggerPrevRow?: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * A block of the pattern; made up of many rows.
 * @param rows The rows to be rendered.
 */
export const Block: FC<BlockProps> = (
	{
		// block,
		// triggerNextRow,
		// setTriggerNextRow,
		// triggerPrevRow,
		// setTriggerPrevRow,
	},
) => {
	const currentRow = useSelector((state: any) => state.projects.currentRow);

	/**
	 * Keeps track of the current row number as it pertains to the individual block itself.
	 * ex. row 4 of a project might be row 1 of a block.
	 */
	const [currentBlockRow, setCurrentBlockRow] = useState(currentRow); // => reconfigure ; % ?

	/**
	 * Renders the rows of the block.
	 */
	// const renderRows = () => {
	// 	return block.map((row, i) => {
	// 		return <Row key={i} row={row as StitchProps[]} i={i} totalRowNum={block.length} />;
	// 	});
	// };

	/**
	 * Handles the block repeat when going to the next row.
	 */
	// useEffect(() => {
	// 	if (triggerNextRow) {
	// 		if (currentBlockRow === block.length) {
	// 			setCurrentBlockRow(1);
	// 		} else {
	// 			setCurrentBlockRow(currentBlockRow + 1);
	// 		}
	// 		setTriggerNextRow(false);
	// 	}
	// }, [block, currentBlockRow, triggerNextRow]);

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

	// useEffect(() => {
	// 	console.log("currentRow:", currentRow);
	// 	console.log("currentBlockRow:", currentBlockRow);
	// }, [currentRow]);

	return (
		<Grid
			container
			// onClick={() => console.log("block length:", block.length, "currentBlockRow:", currentBlockRow)}
			sx={{
				// border: "2px red solid",
				width: "fit-content",
				flexDirection: "row",
				margin: "5px",
				// backgroundColor: "rgba(0, 0, 0, 0.5)",
				// mt: currentBlockRow * -1.5,
			}}
		>
			<Grid
				container
				sx={{
					flexDirection: "column-reverse",
					marginBottom: currentBlockRow * -6.4, // needs to change if font size changes
				}}
			>
				{/* {renderRows()} */}
			</Grid>
		</Grid>
	);
};
