import { Grid } from "@mui/material";
import { FC } from "react";
import { Stitch } from "../Stitch";

interface RowProps {
	stitches: JSX.Element[]; // takes an array of Stitch components
	currentRow?: number;
}

/**
 * A row of stitches.
 * @param stitches The stitches to be rendered.
 */
export const Row: FC<RowProps> = ({ stitches, currentRow }) => {
	// todo: write some kind of function that handles the width

	return (
		<Grid container flexDirection="row" onClick={() => console.log(stitches)}>
			{stitches.map((stitch, i) => {
				return (
					<Grid item sx={{ display: "flex", padding: 0.5 }}>
						<Stitch key={`${i}${stitch}`} {...stitch.props} />
					</Grid>
				);
			})}
		</Grid>
	);
};
