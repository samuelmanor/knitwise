import { Grid, Tooltip, Typography, useTheme } from "@mui/material";
import { FC } from "react";

interface StitchTipProps {
	children: React.ReactNode;
	name: string;
	description: string;
}

/**
 * A tooltip that displays the name, abbreviation, and description of a stitch.
 * @param children The content to be wrapped by the tooltip.
 * @param name The name of the stitch.
 * @param description A description of the stitch that describes how to work it.
 */
export const StitchTip: FC<StitchTipProps> = ({ children, name, description }) => {
	const theme = useTheme();

	const tooltipText = (
		<Grid container direction="column">
			<Typography
				variant="h6"
				sx={{
					fontWeight: "bold",
					width: "fit-content",
					mb: 1,
				}}
			>
				{name}
			</Typography>
			<Typography variant="body2">{description}</Typography>
		</Grid>
	);

	return (
		<Tooltip
			title={tooltipText}
			arrow
			componentsProps={{
				tooltip: {
					sx: {
						"fontSize": "15px",
						"maxWidth": "200px",
						"p": 1,
						"backgroundColor": theme.palette.primary.main,
						"letterSpacing": "1px",
						"& .MuiTooltip-arrow": {
							color: theme.palette.primary.main,
						},
					},
				},
			}}
		>
			<Grid container>{children}</Grid>
		</Tooltip>
	);
};
