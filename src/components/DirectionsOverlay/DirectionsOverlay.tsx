import { EastOutlined, WestOutlined } from "@mui/icons-material";
import { Grid, Tooltip, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { useSelector } from "react-redux";

interface DirectionsOverlayProps {
	rowIndex: number;
	blockIndex: number;
	row: React.ReactNode;
}

/**
 * An overlay that displays the directions for a row of stitches.
 * @param rowIndex The index of the row.
 * @param blockIndex The index of the block that the row is in.
 * @param row The row of stitches to be rendered.
 */
export const DirectionsOverlay: FC<DirectionsOverlayProps> = ({ rowIndex, blockIndex, row }) => {
	const project = useSelector((state: any) => state.projects.project);
	const blocksTotal = useSelector((state: any) => state.projects.project.blocks.length);
	const currentRow = useSelector((state: any) => state.projects.currentRow);
	const mode = useSelector((state: any) => state.workspace.settings.directionsOverlayMode);
	const show = useSelector((state: any) => state.workspace.mode === "chart");

	const showLeftRowMarker = blockIndex === 0 && currentRow % 2 === 0;
	const showRightRowMarker = blockIndex === blocksTotal - 1 && currentRow % 2 === 1;
	const rowMarkerLabel = (
		<Grid container sx={{ gap: 1, userSelect: "none", alignItems: "center" }}>
			<Grid item>{showLeftRowMarker ? <Typography variant="h3">ws</Typography> : <WestOutlined />}</Grid>
			<Grid item>{showLeftRowMarker ? <EastOutlined /> : <Typography variant="h3">rs</Typography>}</Grid>
		</Grid>
	);

	const theme = useTheme();

	// hide the overlay if the row is empty
	if (row === null || row === undefined || project.blocks[blockIndex].stitches[rowIndex].length === 0) return null;

	/**
	 * Calculates the width of the component based on the combined width of the stitches in the row.
	 */
	const getWidth = () => {
		return project.blocks[blockIndex].stitches[rowIndex]
			.map((stitch: any) => stitch.width)
			.reduce((a: number, b: number) => a + b, 0);
	};

	/**
	 * Generates a string of directions based on the stitches in the row.
	 * If the mode is set to "simple", just the name of the stitch is used.
	 * If the mode is set to "detailed", the full description of how to work the stitch is used.
	 */
	const getDirections = () => {
		const stitches = project.blocks[blockIndex].stitches[rowIndex];

		let directions = "";
		let count = 1;

		// This combines the stitches in the row into a single string.
		// If the current stitch is the same as the previous stitch, it's combined into a single instruction.
		// ex. "knit 2, purl 2, knit 2" instead of "k, k, p, p, k, k"
		for (let i = 1; i < stitches.length; i++) {
			const repeat = stitches[i].name === stitches[i - 1].name;
			if (repeat) {
				count++;
			} else {
				if (count > 1) {
					// This adds the repeated stitch to the directions string, along with the number of times it's repeated.
					directions += `${
						mode === "simple" ? stitches[i - 1].name : stitches[i - 1].description
					} ${count}, `;
				} else {
					// This adds the single stitch to the directions string.
					directions += `${mode === "simple" ? stitches[i - 1].name : stitches[i - 1].description}, `;
				}
				count = 1;
			}
		}
		// This adds the last stitch in the row to the directions string.
		directions += `${
			mode === "simple" ? stitches[stitches.length - 1].name : stitches[stitches.length - 1].description
		}`;
		return directions;
	};

	return (
		<Tooltip
			data-testid={`directionsOverlay${rowIndex}`}
			open={mode !== "none"}
			placement="top"
			disableFocusListener
			disableHoverListener
			disableTouchListener
			describeChild={false}
			title={
				<Grid container>
					<Grid item>
						<Typography variant="h3">row {rowIndex + 1}</Typography>
					</Grid>
					<Grid item>
						<Typography variant="h4">{getDirections()}</Typography>
					</Grid>
				</Grid>
			}
			componentsProps={{
				tooltip: {
					sx: {
						width: getWidth() * 15,
						backgroundColor: theme.palette.primary.main,
						color: theme.palette.text.secondary,
						p: 1.5,
						borderRadius: "5px",
						display: show ? "flex" : "none",
					},
				},
			}}
			PopperProps={{
				disablePortal: true,
				style: { zIndex: 0 },
				popperOptions: {
					modifiers: [
						{
							name: "preventOverflow",
							options: {
								altAxis: true,
								rootBoundary: "window",
							},
						},
					],
				},
			}}
		>
			<Tooltip
				title={rowMarkerLabel}
				open={showLeftRowMarker || showRightRowMarker}
				placement={showLeftRowMarker ? "left" : "right"}
				PopperProps={{
					disablePortal: true,
					popperOptions: {
						modifiers: [
							{
								name: "flip",
								enabled: false,
							},
						],
					},
					style: { zIndex: 0 },
				}}
				componentsProps={{
					tooltip: {
						sx: {
							// width: getWidth() * 15,
							// backgroundColor: theme.palette.primary.main,
							// color: theme.palette.text.secondary,
							// p: 1.5,
							// borderRadius: "5px",
							// display: show ? "flex" : "none",
							backgroundColor: theme.palette.primary.main,
							filter: "none",
							color: theme.palette.text.secondary,
						},
					},
				}}
			>
				<Grid container>{row}</Grid>
			</Tooltip>
		</Tooltip>
	);
};
