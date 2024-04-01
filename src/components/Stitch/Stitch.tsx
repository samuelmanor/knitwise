import { FC } from "react";
import { StitchTip } from "../StitchTip";
import { Grid, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

export interface StitchProps {
	name?: string;
	abbreviation?: string;
	symbol?: string;
	description?: string;
	width?: number;
	index?: number;
	view?: "chart" | "search" | "edit";
	// userGenerated?: boolean; -> future feature ?
}

/**
 * An individual stitch.
 * @param name The name of the stitch.
 * @param abbreviation The knitting pattern-style abbreviation of the stitch.
 * @param symbol The symbol used to represent the stitch in the chart.
 * @param description A description of the stitch that describes how to work it.
 * @param width The width of the stitch in regards to grid columns.
 */
export const Stitch: FC<StitchProps> = ({ name, abbreviation, description, symbol, width, index, view }) => {
	const stitchDisplaySetting = useSelector((state: any) => state.workspace.settings.stitchDisplay);

	const theme = useTheme();

	if (view === "chart" || view === undefined) {
		return (
			<StitchTip name={name} description={description}>
				<Grid
					item
					fontSize={30}
					sx={{
						// cursor: "pointer",
						mt: 0.5,
						mb: 0.5,
						pl: "2px",
						pr: "2px",
						// border: "1px solid red",
						// width: symbol.length * 15,
						// width:
						// 	stitchDisplaySetting === "symbol" ? symbol.length * 15 : width * 21 + abbreviation.length,
						// width: "fit-content",
						display: "flex",
						justifyContent: "center",
						letterSpacing: symbol.length * 0.5,
						border: symbol.length > 1 ? `2px solid ${theme.palette.primary.main}` : "none",
						borderRadius: "5px",
						color: theme.palette.text.primary,
						cursor: "pointer",
					}}
					data-testid={`stitch${index}${name}`}
				>
					{stitchDisplaySetting === "symbol" ? (
						<Typography sx={{ fontSize: "28px", letterSpacing: "1px" }}>{symbol}</Typography>
					) : (
						<Typography sx={{ fontSize: "20px" }}>{abbreviation}</Typography>
					)}
				</Grid>
			</StitchTip>
		);
	}

	if (view === "edit") {
		return (
			<Grid
				container
				sx={{ border: "2px solid red", flexDirection: "column", alignItems: "center", cursor: "pointer" }}
			>
				<Grid item>{symbol}</Grid>
				<Grid item>{abbreviation}</Grid>
			</Grid>
		);
	}

	if (view === "search") {
		return (
			// backgroundColor: theme.palette.background.paper,
			// filter: `drop-shadow(5px 5px 0px ${theme.palette.primary.main})`,
			// border: `2px solid ${theme.palette.primary.main}`,
			// p: 0.5,
			// borderTopRightRadius: "10px",
			// borderTopLeftRadius: "10px",
			// maxHeight: "100%",
			// mb: baseRowRef.current ? handlePadding() : "50px",
			// width: getBlockWidth(),
			// <Grid
			// 	container
			// 	sx={{ border: "2px solid red", flexDirection: "column", alignItems: "center", cursor: "pointer" }}
			// >
			// 	{/* <Grid item>{symbol}</Grid> */}
			// 	<Grid item>{name}</Grid>
			// </Grid>
			<Grid
				container
				sx={
					{
						// flexDirection: "column",
						// backgroundColor: theme.palette.background.paper,
						// filter: `drop-shadow(5px 5px 0px ${theme.palette.primary.main})`,
						// border: `2px solid ${theme.palette.primary.main}`,
						// p: 0.5,
						// borderRadius: "5px",
						// width: "fit-content",
						// alignItems: "center",
						// cursor: "pointer",
						// userSelect: "none",
					}
				}
			>
				<Grid item>
					<Typography>{stitchDisplaySetting === "symbol" ? symbol : abbreviation}</Typography>
				</Grid>
				<Grid item>
					<Typography>{stitchDisplaySetting === "symbol" ? abbreviation : symbol}</Typography>
				</Grid>
				<Grid item>{name}</Grid>
			</Grid>
		);
	}
};
