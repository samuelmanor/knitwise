import { Box, Grid, Tooltip, Typography, useTheme } from "@mui/material";
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

	const theme = useTheme();

	const getWidth = () => {
		return project.blocks[blockIndex].stitches[rowIndex]
			.map((stitch: any) => stitch.width)
			.reduce((a: number, b: number) => a + b, 0);
	};

	const getDirections = () => {
		// const stitches = project.blocks[blockIndex].stitches[rowIndex];
		// let directions = "";
		// let count = 1;
		// for (let i = 1; i < stitches.length; i++) {
		// 	if (
		// 		mode === "simple"
		// 			? stitches[i].name === stitches[i - 1].name
		// 			: stitches[i].description === stitches[i - 1].description
		// 	) {
		// 		count++;
		// 	} else {
		// 		const isKnitOrPurl = stitches[i - 1].name === "knit" || stitches[i - 1].name === "purl";
		// 		directions += `${mode === "simple" ? stitches[i - 1].name : stitches[i - 1].description}`;
		// 		if (count > 1 && isKnitOrPurl) {
		// 			directions += ` ${count}, `;
		// 		} else {
		// 			directions += `, `;
		// 		}
		// 		count = 1;
		// 	}
		// }
		// directions += `${
		// 	mode === "simple" ? stitches[stitches.length - 1].name : stitches[stitches.length - 1].description
		// } ${count}`;
		// return directions;

		// ----------------------------

		// const stitches = project.blocks[blockIndex].stitches[rowIndex];
		// const isKnitOrPurl = (stitch: any) => stitch.name === "knit" || stitch.name === "purl";

		// let directions = "";
		// let count = 1;
		// for (let i = 1; i < stitches.length; i++) {
		// 	if (
		// 		stitches[i].name === stitches[i - 1].name &&
		// 		isKnitOrPurl(stitches[i] && isKnitOrPurl(stitches[i - 1]))
		// 	) {
		// 		count++;
		// 	} else {
		// 		directions += `${stitches[i - 1].name}`;
		// 		if (count > 1 && isKnitOrPurl(stitches[i - 1])) {
		// 			directions += ` ${count}, `;
		// 		} else {
		// 			directions += `, `;
		// 		}
		// 		count = 1;
		// 	}
		// }
		// directions += `${stitches[stitches.length - 1].name} ${
		// 	!isKnitOrPurl(stitches[stitches.length - 1]) ? "" : count
		// }`;
		// return directions;

		return "test";
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
