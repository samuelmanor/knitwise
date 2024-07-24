import { FC } from "react";
import { StitchTip } from "../StitchTip";
import { Grid, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";

interface StitchPlacement {
	blockIndex: number;
	rowIndex: number;
}

export interface StitchProps {
	name: string;
	abbreviation: string;
	symbol: string;
	description: string;
	width: number;
	index?: number;
	placement?: StitchPlacement;
	// userGenerated?: boolean; -> future feature ?
}

/**
 * Represents a stitch in a pattern.
 * @param name The name of the stitch.
 * @param abbreviation The abbreviation of the stitch.
 * @param symbol The symbol used to represent the stitch.
 * @param description An explanation of how to work the stitch.
 * @param width The number of stitches the stitch takes up.
 * @param index The index of the stitch.
 * @param placement The placement of the stitch in the pattern.
 */
export const Stitch: FC<StitchProps> = ({ name, abbreviation, description, symbol, width, index }) => {
	const stitchDisplaySetting = useSelector((state: any) => state.workspace.settings.stitchDisplay);

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
				data-testid={`stitch${index}${abbreviation}`}
			>
				<Typography>{stitchDisplaySetting === "symbol" ? symbol : abbreviation}</Typography>
			</Grid>
		</StitchTip>
	);
};
