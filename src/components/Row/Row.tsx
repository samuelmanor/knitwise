import { Grid } from "@mui/material";
import { FC } from "react";
import { Stitch, StitchProps } from "../Stitch";
import { RowMarker } from "../RowMarker";

interface RowProps {
	row: StitchProps[];
	highlightRow?: boolean;
	rowIndex?: number;
	showLeftRowMarker?: boolean;
	showRightRowMarker?: boolean;
}

/**
 * A row of stitches.
 * @param row The stitches to be rendered.
 * @param highlightRow Whether or not to highlight the row to indicate that it's currently being worked.
 * @param rowIndex The index of the row.
 * @param showLeftRowMarker Whether or not to show the wrong side marker on the left side of the row.
 * @param showRightRowMarker Whether or not to show the right side marker on the right side of the row.
 */
export const Row: FC<RowProps> = ({ row, highlightRow, rowIndex, showLeftRowMarker, showRightRowMarker }) => {
	if (!row) {
		return null; // make error row ?
	}

	// figure something out about the width of stitches - flex-grow?
	return (
		<Grid
			container
			justifyContent="space-evenly"
			// border="2px solid purple"
			// sx={{ color: `${highlightRow ? "red" : "black"}` }}
			sx={{ backgroundColor: `${highlightRow ? "rgba(0,0,0,0.3)" : "transparent"}` }}
			data-testid={`row${rowIndex}`}
		>
			{highlightRow && showLeftRowMarker ? <RowMarker position="left" /> : null}
			{row.map((stitch, i) => {
				return (
					<Grid item display="inline">
						<Stitch key={i} index={i} {...stitch} />
					</Grid>
				);
			})}
			{highlightRow && showRightRowMarker ? <RowMarker position="right" /> : null}
		</Grid>
	);
};
