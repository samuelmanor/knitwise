import { FC } from "react";
import { StitchTip } from "../StitchTip";
import { Grid } from "@mui/material";

export interface StitchProps {
	name: string;
	abbreviation: string;
	description: string;
	width: number;
	// userGenerated?: boolean; -> future feature
}

/**
 * An individual stitch.
 * @param name The name of the stitch.
 * @param abbreviation The abbreviation of the stitch.
 * @param description The description of the stitch.
 * @param width The width of the stitch in regards to grid columns.
 */
export const Stitch: FC<StitchProps> = ({ name, abbreviation, description, width }) => {
	return (
		<StitchTip name={name} abbreviation={abbreviation} description={description}>
			<Grid item>{abbreviation}</Grid>
		</StitchTip>
	);
};
