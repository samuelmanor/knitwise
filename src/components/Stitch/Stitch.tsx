import { FC } from "react";
import { StitchTip } from "../StitchTip";
import { Grid, Typography, useTheme } from "@mui/material";
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
	// selected?: boolean;
	// userGenerated?: boolean; -> future feature ?
}

export const Stitch: FC<StitchProps> = ({ name, abbreviation, description, symbol, width, index, placement }) => {
	const stitchDisplaySetting = useSelector((state: any) => state.workspace.settings.stitchDisplay);
	const mode = useSelector((state: any) => state.workspace.mode);

	const theme = useTheme();

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
