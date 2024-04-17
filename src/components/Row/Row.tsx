import { Grid, useTheme } from "@mui/material";
import { FC } from "react";
import { Stitch, StitchProps } from "../Stitch";
import { RowMarker } from "../RowMarker";
import { useSelector } from "react-redux";
import { DirectionsOverlay } from "../DirectionsOverlay";

export interface RowProps {
	stitches: StitchProps[];
	highlightRow: boolean;
	rowIndex: number;
	blockIndex: number;
	editingBlock: boolean;
	showLeftRowMarker?: boolean;
	showRightRowMarker?: boolean;
}

/**
 * A row of stitches.
 * @param stitches The stitches to be rendered.
 * @param highlightRow Whether or not to highlight the row to indicate that it's currently being worked.
 * @param rowIndex The index of the row.
 * @param blockIndex The index of the block that the row is in.
 * @param editingBlock Whether or not the block that contains the row is currently being edited.
 * @param showLeftRowMarker Whether or not to show the wrong side marker on the left side of the row.
 * @param showRightRowMarker Whether or not to show the right side marker on the right side of the row.
 */
export const Row: FC<RowProps> = ({
	stitches,
	highlightRow,
	rowIndex,
	blockIndex,
	editingBlock,
	showLeftRowMarker,
	showRightRowMarker,
}) => {
	const mode = useSelector((state: any) => state.workspace.mode);
	const stitchDisplaySetting = useSelector((state: any) => state.workspace.settings.stitchDisplay);

	const theme = useTheme();

	if (!stitches) {
		return null; // make error row ?
	}

	/**
	 * Calculates the width of the row based on the sum of all stitches' widths.
	 */
	const calcWidth = (): number => {
		let total: number = 0;
		stitches.forEach(stitch => {
			total += stitch.width;
		});

		return stitchDisplaySetting === "symbol" ? total * 18 : total * 30; // abbreviations need more space than symbols
	};

	const row = (
		<Grid
			container
			justifyContent="space-between"
			sx={{
				backgroundColor: `${highlightRow && mode === "chart" ? theme.palette.primary.light : "transparent"}`,
				pl: 0.5,
				pr: 0.5,
				width: calcWidth(),
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

	if (mode === "chart" && highlightRow) {
		return (
			<Grid container>
				<DirectionsOverlay rowIndex={rowIndex} blockIndex={blockIndex} row={row} />
				{/* {row} */}
			</Grid>
		);
	}

	if (mode === "edit" && editingBlock) {
		return (
			<Grid container sx={{ flexWrap: "nowrap" }}>
				<Grid item>{row}</Grid>
				<Grid item>edit</Grid>
			</Grid>
		);
	}

	return row;
};
