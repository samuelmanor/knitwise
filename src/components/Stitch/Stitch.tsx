import { Grid } from "@mui/material";
import { FC } from "react";
import { StitchTip } from "../StitchTip";

export interface StitchProps {
	name: string;
	abbreviation: string;
	description: string;
	icon: React.ReactNode;
	width: number;
	// userGenerated?: boolean; -> future feature
}

export const Stitch: FC<StitchProps> = ({ name, abbreviation, description, icon, width }) => {
	return (
		// <Grid container onClick={() => console.log(name)}>
		// 	{icon}
		// </Grid>
		<StitchTip name={name} abbreviation={abbreviation} description={description}>
			{icon}
		</StitchTip>
	);
};

// make a StitchTip component that's a reworking of the Tooltip component
