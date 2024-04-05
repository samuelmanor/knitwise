import { Grid, Tooltip, Typography, useTheme } from "@mui/material";
import { FC, useState } from "react";
import { useSelector } from "react-redux";

interface StitchTipProps {
	children: React.ReactNode;
	name: string;
	description: string;
}

/**
 * A tooltip that displays the name, abbreviation, and description of a stitch.
 * @param children The content to be wrapped by the tooltip.
 * @param name The name of the stitch.
 * @param description An explanation of how to work the stitch.
 */
export const StitchTip: FC<StitchTipProps> = ({ children, name, description }) => {
	const theme = useTheme();
	const [open, setOpen] = useState(false);

	const stitchTipMode = useSelector((state: any) => state.workspace.settings.stitchTipMode);

	const tooltipText = (
		<Grid container direction="column" padding="4px" color={theme.palette.text.secondary}>
			<Typography
				variant="h3"
				sx={{
					fontWeight: "bold",
					width: "fit-content",
				}}
			>
				{name}
			</Typography>
			<Typography variant="h4">{description}</Typography>
		</Grid>
	);

	return (
		<Tooltip
			title={tooltipText}
			arrow
			open={open}
			disableFocusListener={stitchTipMode === "click"}
			disableHoverListener={stitchTipMode === "click"}
			disableTouchListener={stitchTipMode === "click"}
			onClose={stitchTipMode === "hover" ? () => setOpen(false) : undefined}
			onOpen={stitchTipMode === "hover" ? () => setOpen(true) : undefined}
			componentsProps={{
				tooltip: {
					sx: {
						"fontSize": "15px",
						"maxWidth": "200px",
						"backgroundColor": theme.palette.primary.main,
						"letterSpacing": "1px",
						"& .MuiTooltip-arrow": {
							color: theme.palette.primary.main,
						},
						"zIndex": "100",
						// add border
					},
				},
			}}
		>
			<Grid container onClick={() => stitchTipMode === "click" ?? setOpen(!open)}>
				{children}
			</Grid>
		</Tooltip>
	);
};
