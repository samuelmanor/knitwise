import { FC } from "react";
import { StitchTip } from "../StitchTip";
import { Grid } from "@mui/material";

export interface StitchProps {
	name?: string;
	abbreviation?: string;
	symbol?: string;
	description?: string;
	width?: number;
	index?: number;
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
export const Stitch: FC<StitchProps> = ({ name, abbreviation, description, symbol, width, index }) => {
	return (
		<StitchTip name={name} description={description}>
			<Grid
				item
				fontSize={30}
				sx={{ cursor: "pointer", mt: 0.5, mb: 0.5, border: "1px solid red" }}
				data-testId={`stitch${index}${name}`}
			>
				{symbol}
			</Grid>
		</StitchTip>
		// <Grid item>{abbreviation}</Grid>
	);
};
