import { Grid } from "@mui/material";
import { FC } from "react";
import { Stitch, StitchProps } from "../Stitch";

interface RowProps {
	stitches?: JSX.Element[]; // takes an array of Stitch components
	row?: object[];
	currentRow?: number;
	i: number; // index of the row
}

/**
 * A row of stitches.
 * @param stitches The stitches to be rendered.
 */
export const Row: FC<RowProps> = ({ stitches, row, currentRow, i }) => {
	// from redux, if "knitting mode" is on, and if i is odd (the row is ws), reverse the stitches via flex-direction: row-reverse (?)
	// todo: write some kind of function that handles the width

	const renderStitches = () => {
		return row.map((stitch: StitchProps, i) => {
			return <Stitch key={i} {...stitch} />;
		});
	};

	return (
		<Grid container flexDirection="row" onClick={() => console.log(stitches)}>
			{renderStitches()}
		</Grid>
	);
};
