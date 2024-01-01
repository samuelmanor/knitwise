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

export const Stitch: FC<StitchProps> = ({ name, abbreviation, description, width }) => {
	return (
		<StitchTip name={name} abbreviation={abbreviation} description={description}>
			<Grid item>{abbreviation}</Grid>
		</StitchTip>
	);
};
