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
						// border: "1px solid red",
						width: symbol.length * 15,
						display: "flex",
						justifyContent: "center",
						letterSpacing: symbol.length * 0.5,
						border: symbol.length > 1 ? "1px solid black" : "none",
						color: theme.palette.text.primary,
						cursor: "pointer",
					}}
					data-testid={`stitch${index}${name}`}
				>
					{stitchDisplaySetting === "symbol" ? symbol : <Typography>{abbreviation}</Typography>}
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
			<Grid
				container
				sx={{ border: "2px solid red", flexDirection: "column", alignItems: "center", cursor: "pointer" }}
			>
				{/* <Grid item>{symbol}</Grid> */}
				<Grid item>{name}</Grid>
			</Grid>
		);
	}
};
