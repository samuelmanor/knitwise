import { FC } from "react";
import { StitchTip } from "../StitchTip";
import { Grid, Tooltip, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

export interface StitchProps {
	name: string;
	abbreviation: string;
	symbol: string;
	description: string;
	width: number;
	index?: number;
	placement?: {
		blockIndex: number;
		rowIndex: number;
	};
	showInfo?: boolean;
	// selected?: boolean;
	// userGenerated?: boolean; -> future feature ?
}

export const Stitch: FC<StitchProps> = ({
	name,
	abbreviation,
	description,
	symbol,
	width,
	index,
	placement,
	showInfo,
}) => {
	const stitchDisplaySetting = useSelector((state: any) => state.workspace.settings.stitchDisplay);
	const mode = useSelector((state: any) => state.workspace.mode);

	const theme = useTheme();

	if (showInfo) {
		return (
			<Tooltip
				title={name}
				arrow
				componentsProps={{
					tooltip: {
						sx: {
							"color": theme.palette.primary.main,
							"zIndex": "100",
							"backgroundColor": theme.palette.background.paper,
							"& .MuiTooltip-arrow": {
								color: theme.palette.background.paper,
							},
						},
					},
				}}
			>
				<Grid
					container
					sx={{
						border: `2px solid ${theme.palette.primary.main}`,
						borderRadius: "5px",
						flexDirection: "column",
						alignItems: "center",
						padding: 1,
						cursor: "pointer",
					}}
				>
					<Typography>{symbol}</Typography>
				</Grid>
			</Tooltip>
		);
	}

	return (
		<StitchTip name={name} description={description}>
			<Grid
				item
				sx={{
					marginY: 0.5,
					paddingX: 0.5,
					display: "flex",
					justifyContent: "center",
					letterSpacing: symbol.length * 0.5,
					border: symbol.length > 1 ? `2px solid ${theme.palette.primary.main}` : null,
					borderRadius: "5px",
					color: theme.palette.text.primary,
					userSelect: "none",
				}}
			>
				<Typography>{stitchDisplaySetting === "symbol" ? symbol : abbreviation}</Typography>
			</Grid>
		</StitchTip>
	);
};
