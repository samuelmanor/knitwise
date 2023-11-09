import { Grid, Tooltip, Typography } from "@mui/material";
import { FC } from "react";

interface StitchTipProps {
	children: React.ReactNode;
	name: string;
	abbreviation: string;
	description: string;
}

export const StitchTip: FC<StitchTipProps> = ({ children, name, abbreviation, description }) => {
	const tooltipText = (
		<Grid container direction="column">
			<Typography variant="h6">{name}</Typography>
			<Typography variant="body1">{abbreviation}</Typography>
			<Typography variant="body2">{description}</Typography>
		</Grid>
	);

	return (
		<Tooltip title={tooltipText} arrow componentsProps={{ tooltip: { sx: { width: "200px" } } }}>
			<Grid container>{children}</Grid>
		</Tooltip>
	);
};
