import { Grid, useTheme } from "@mui/material";
import { FC } from "react";
import { Stitch, StitchProps } from "../Stitch";
import { RowMarker } from "../RowMarker";
import { useSelector } from "react-redux";
import { DirectionsOverlay } from "../DirectionsOverlay";

export interface RowProps {
	stitches: StitchProps[];
	highlightRow?: boolean;
	rowIndex?: number;
	blockIndex?: number;
	showLeftRowMarker?: boolean;
	showRightRowMarker?: boolean;
}

/**
 * A row of stitches.
 * @param stitches The stitches to be rendered.
 * @param highlightRow Whether or not to highlight the row to indicate that it's currently being worked.
 * @param rowIndex The index of the row.
 * @param blockIndex The index of the block that the row is in.
 * @param showLeftRowMarker Whether or not to show the wrong side marker on the left side of the row.
 * @param showRightRowMarker Whether or not to show the right side marker on the right side of the row.
 */
export const Row: FC<RowProps> = ({
	stitches,
	highlightRow,
	rowIndex,
	blockIndex,
	showLeftRowMarker,
	showRightRowMarker,
}) => {
	const currentMode = useSelector((state: any) => state.workspace.mode);

	const theme = useTheme();

	if (!stitches) {
		return null; // make error row ?
	}

	const row = (
		<Grid
			container
			justifyContent="space-between"
			sx={{
				backgroundColor: `${
					highlightRow && currentMode === "chart" ? theme.palette.primary.light : "transparent"
				}`,
				pl: 0.5,
				pr: 0.5,
			}}
			data-testid={`row${rowIndex}`}
		>
			{/* {highlightRow && showLeftRowMarker && currentMode === "chart" ? <RowMarker position="left" /> : null} */}
			{stitches.map((stitch, i) => {
				return (
					<Grid item display="inline">
						<Stitch key={i} index={i} view={"chart"} {...stitch} />
					</Grid>
				);
			})}
			{/* {highlightRow && showRightRowMarker && currentMode === "chart" ? <RowMarker position="right" /> : null} */}
		</Grid>
	);

	// return (
	// 	// <Grid
	// 	// 	container
	// 	// 	justifyContent="space-between"
	// 	// 	sx={{
	// 	// 		backgroundColor: `${
	// 	// 			highlightRow && currentMode === "chart" ? theme.palette.primary.light : "transparent"
	// 	// 		}`,
	// 	// 		pl: 0.5,
	// 	// 		pr: 0.5,
	// 	// 	}}
	// 	// 	data-testid={`row${rowIndex}`}
	// 	// >
	// 	// 	{/* {highlightRow && showLeftRowMarker && currentMode === "chart" ? <RowMarker position="left" /> : null} */}
	// 	// 	{stitches.map((stitch, i) => {
	// 	// 		return (
	// 	// 			<Grid item display="inline">
	// 	// 				<Stitch key={i} index={i} view={"chart"} {...stitch} />
	// 	// 			</Grid>
	// 	// 		);
	// 	// 	})}
	// 	// 	{/* {highlightRow && showRightRowMarker && currentMode === "chart" ? <RowMarker position="right" /> : null} */}
	// 	// </Grid>

	// );

	if (highlightRow) {
		return (
			// <Grid container>
			// 	<DirectionsOverlay rowIndex={rowIndex} blockIndex={blockIndex} />
			// 	{row}
			// </Grid>
			<DirectionsOverlay rowIndex={rowIndex} blockIndex={blockIndex} children={row} />
		);
	} else {
		return row;
	}
};
