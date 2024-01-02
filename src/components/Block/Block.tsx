import { Grid } from "@mui/material";
import { FC } from "react";
import { Row } from "../Row";
import { StitchProps } from "../Stitch";

interface BlockProps {
	block?: object[];
	currentRow?: number;
}

/**
 * A block of the pattern; made up of many rows.
 * @param rows The rows to be rendered.
 */
export const Block: FC<BlockProps> = ({ block, currentRow }) => {
	// todo: write some kind of function that handles the width

	const renderRows = () => {
		return block.map((row, i) => {
			return <Row key={i} row={row as StitchProps[]} i={i} />;
		});
	};
	return (
		// <Grid
		// 	container
		// 	onClick={() => console.log(rows)}
		// 	sx={{ border: "2px solid red", flex: `0 0 ${100 / rows.length}%` }} // todo: fix width
		// >
		// 	{/* {rows.map((row, i) => {
		// 		return <Row key={`${i}${row}`} stitches={row} currentRow={currentRow} i={i} />;
		// 	})} */}
		// 	block
		// </Grid>
		<Grid container onClick={() => console.log(block)} sx={{ border: "2px red solid", width: "fit-content" }}>
			{renderRows()}
		</Grid>
	);
};
