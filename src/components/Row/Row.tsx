import { Grid } from "@mui/material";
import { FC } from "react";
import { Stitch } from "../Stitch";

interface RowProps {
	stitches: string[];
}

export const Row: FC<RowProps> = ({ stitches }) => {
	// todo: write some kind of function that handles the width

	return (
		<Grid container flexDirection="row">
			{stitches.map((stitch, i) => {
				return (
					<Grid item>
						<Stitch key={`${i}${stitch}`} name={stitch} />
					</Grid>
				);
			})}
		</Grid>
	);
};
