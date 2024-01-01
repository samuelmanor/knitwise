import { Grid } from "@mui/material";
import { FC } from "react";
import { Row } from "../Row";

interface BlockProps {
	rows: JSX.Element[][]; // takes an array of Row components
}

export const Block: FC<BlockProps> = ({ rows }) => {
	// todo: write some kind of function that handles the width

	return (
		<Grid
			container
			onClick={() => console.log(rows)}
			sx={{ border: "2px solid red", flex: `0 0 ${100 / rows.length}%`, width: `${rows.length * 27}px` }} // todo: fix width
		>
			{rows.map((row, i) => {
				return <Row key={`${i}${row}`} stitches={row} />;
			})}
		</Grid>
	);
};
