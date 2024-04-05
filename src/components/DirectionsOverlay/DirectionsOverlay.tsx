import { Box, Grid, Tooltip, Typography } from "@mui/material";
import { FC } from "react";
import { useSelector } from "react-redux";

interface DirectionsOverlayProps {
	children: React.ReactNode;
	rowIndex: number;
	blockIndex: number;
}

export const DirectionsOverlay: FC<DirectionsOverlayProps> = ({ children, rowIndex, blockIndex }) => {
	const project = useSelector((state: any) => state.projects.project);
	const showOverlay = useSelector((state: any) => state.workspace.settings.showDirectionsOverlay);
	const mode = useSelector((state: any) => state.workspace.settings.directionsOverlayMode);

	const overlayText = (
		<Grid container sx={{ flexDirection: "column" }}>
			<Grid item>
				<Typography>row {rowIndex + 1}</Typography>
			</Grid>
			<Grid item>
				<Typography>
					{project.blocks[blockIndex].stitches[rowIndex]
						.map((stitch: any) => (mode === "simple" ? stitch.name : stitch.description))
						.join(", ")}
				</Typography>
			</Grid>
		</Grid>
	);

	return (
		<Tooltip
			title={overlayText}
			placement="top"
			open={showOverlay}
			disableFocusListener
			disableHoverListener
			disableTouchListener
		>
			<Box>{children}</Box>
		</Tooltip>
	);
};
