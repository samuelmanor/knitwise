import { Grid, useTheme } from "@mui/material";
import { FC } from "react";
import { Stitch, StitchProps } from "../Stitch";
import { RowMarker } from "../RowMarker";
import { useSelector } from "react-redux";

export interface RowProps {
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
	const currentMode = useSelector((state: any) => state.workspace.mode);

	const theme = useTheme();

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
			sx={{
				backgroundColor: `${
					highlightRow && currentMode === "chart" ? theme.palette.primary.light : "transparent"
				}`,
			}}
			onClick={() => console.log()}
			data-testid={`row${rowIndex}`}
		>
			{/* {highlightRow && showLeftRowMarker && currentMode === "chart" ? <RowMarker position="left" /> : null} */}
			{row.map((stitch, i) => {
				return (
					<Grid item display="inline">
						<Stitch key={i} index={i} view={"chart"} {...stitch} />
					</Grid>
				);
			})}
			{/* {highlightRow && showRightRowMarker && currentMode === "chart" ? <RowMarker position="right" /> : null} */}
		</Grid>
	);
};
