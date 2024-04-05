import { Box, Grid, Tooltip, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { useSelector } from "react-redux";

interface DirectionsOverlayProps {
	rowIndex: number;
	blockIndex: number;
}

export const DirectionsOverlay: FC<DirectionsOverlayProps> = ({ rowIndex, blockIndex }) => {
	const project = useSelector((state: any) => state.projects.project);
	const showOverlay = useSelector((state: any) => state.workspace.settings.showDirectionsOverlay);
	const mode = useSelector((state: any) => state.workspace.settings.directionsOverlayMode);

	const theme = useTheme();

	const getWidth = () => {
		return project.blocks[blockIndex].stitches[rowIndex]
			.map((stitch: any) => stitch.width)
			.reduce((a: number, b: number) => a + b, 0);
	};

	const getDirections = () => {
		const stitches = project.blocks[blockIndex].stitches[rowIndex];

		let directions = "";
		let count = 1;

		for (let i = 1; i < stitches.length; i++) {
			const checkName = stitches[i].name === stitches[i - 1].name;
			const checkDescription = stitches[i].description === stitches[i - 1].description;
			if (checkName && checkDescription) {
				count++;
			} else {
				if (count > 1) {
					directions += `${
						mode === "simple" ? stitches[i - 1].name : stitches[i - 1].description
					} ${count}, `;
				} else {
					directions += `${mode === "simple" ? stitches[i - 1].name : stitches[i - 1].description}, `;
				}
				count = 1;
			}
		}
		directions += `${
			mode === "simple" ? stitches[stitches.length - 1].name : stitches[stitches.length - 1].description
		}`;
		return directions;
	};

	return (
		<Grid
			container
			sx={{
				flexDirection: "column",
				position: "absolute",
				display: !showOverlay ? "none" : "block",
				background: theme.palette.primary.main,
				color: theme.palette.text.secondary,
				p: 1.5,
				zIndex: 200,
				borderRadius: "5px",
				width: getWidth() * 15,
				// bottom: 100,
			}}
		>
			<Grid item>
				<Typography variant="h3">row {rowIndex + 1}</Typography>
			</Grid>
			<Grid item>
				<Typography variant="h4" onClick={() => console.log(getDirections())}>
					{getDirections()}
				</Typography>
			</Grid>
		</Grid>
	);
};
