import { Grid } from "@mui/material";
import { FC } from "react";
import { Stitch, StitchProps } from "../Stitch";

interface RowProps {
	stitches?: JSX.Element[]; // takes an array of Stitch components
	row?: StitchProps[];
	currentRow?: number;
	i: number; // index of the row
}

/**
 * A row of stitches.
 * @param stitches The stitches to be rendered.
 */
export const Row: FC<RowProps> = ({ stitches, row, currentRow, i }) => {
	const renderStitches = () => {
		return row.map((stitch: StitchProps, i) => {
			return (
				<Grid item display="inline">
					<Stitch key={i} {...stitch} />
				</Grid>
			);
		});
	};

	// figure something out about the width of stitches - flex-grow?
	return (
		<Grid
			container
			// flexDirection="row"
			// width="fit-content"
			justifyContent="space-evenly"
			// border="2px solid purple"
			sx={{ color: `${currentRow === i + 1 ? "red" : "black"}` }}
		>
			{renderStitches()}
		</Grid>
	);
};
