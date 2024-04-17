import { Button, Grid, IconButton, Tooltip, useTheme } from "@mui/material";
import { FC } from "react";
import { Stitch, StitchProps } from "../Stitch";
import { useSelector } from "react-redux";
import { DirectionsOverlay } from "../DirectionsOverlay";
import { EditOutlined } from "@mui/icons-material";

export interface RowProps {
	stitches: StitchProps[];
	highlightRow: boolean;
	rowIndex: number;
	blockIndex: number;
	editingBlock: boolean;
	draftRow: number | null;
	setDraftRow?: (row: number) => void;
	// showLeftRowMarker?: boolean;
	// showRightRowMarker?: boolean;
}

/**
 * A row of stitches.
 * @param stitches The stitches to be rendered.
 * @param highlightRow Whether or not to highlight the row to indicate that it's currently being worked.
 * @param rowIndex The index of the row.
 * @param blockIndex The index of the block that the row is in.
 * @param editingBlock Whether or not the block that contains the row is currently being edited.
 * @param draftRow The index of the row that is currently being edited.
 * @param showLeftRowMarker Whether or not to show the wrong side marker on the left side of the row.
 * @param showRightRowMarker Whether or not to show the right side marker on the right side of the row.
 */
export const Row: FC<RowProps> = ({
	stitches,
	highlightRow,
	rowIndex,
	blockIndex,
	editingBlock,
	draftRow,
	setDraftRow,
	// showLeftRowMarker,
	// showRightRowMarker,
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
				backgroundColor: `${
					(highlightRow && mode === "chart") || (draftRow === rowIndex && mode === "editBlock")
						? theme.palette.primary.light
						: "transparent"
				}`,
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
			</Grid>
		);
	}

	if (mode === "editBlock" && editingBlock) {
		return (
			<Grid container sx={{ flexWrap: "nowrap" }}>
				<Tooltip
					title={
						<IconButton onClick={() => setDraftRow(rowIndex)}>
							<EditOutlined />
						</IconButton>
					}
					placement="right"
					open={draftRow === null}
					componentsProps={{
						tooltip: {
							sx: {
								backgroundColor: "transparent",
							},
						},
					}}
					slotProps={{ popper: { modifiers: [{ name: "offset", options: { offset: [0, -10] } }] } }}
				>
					<Grid item>{row}</Grid>
				</Tooltip>
			</Grid>
		);
	}

	return row;
};
