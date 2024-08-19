import { Button, Checkbox, Grid, Typography, useTheme } from "@mui/material";
import { FC, useState } from "react";

interface WarningProps {
	text: string;
	setting?: boolean;
	updateSetting?: () => void;
	action: () => void;
	close: () => void;
}

/**
 * A warning dialog that asks the user to confirm an action.
 * @param text The text to display in the warning.
 * @param setting Whether or not to show a checkbox to disable the warning in the future.
 * @param updateSetting The function to update the setting.
 * @param action The function to run if the user confirms the action.
 * @param close The function to run if the user cancels the action.
 */
export const Warning: FC<WarningProps> = ({ text, setting, updateSetting, action, close }) => {
	const [settingState, setSettingState] = useState(!setting);

	const theme = useTheme();

	/**
	 * Handles the confirmation of the warning.
	 */
	const handleConfirmation = () => {
		if (setting !== undefined && updateSetting && settingState === true) {
			updateSetting();
		}
		action();
	};

	return (
		<Grid
			container
			sx={{
				flexDirection: "column",
				alignItems: "center",
				width: "fit-content",
				gap: 0.5,
				pt: 2,
				color: theme.palette.text.primary,
			}}
		>
			<Typography variant="h4">{text}</Typography>
			<Typography variant="h4">are you sure you want to continue?</Typography>
			<Grid item container sx={{ pt: 0.5, justifyContent: "center", gap: 2 }}>
				<Button
					onClick={handleConfirmation}
					sx={{
						"color": theme.palette.text.primary,
						"border": `2px solid ${theme.palette.primary.main}`,
						"&:hover": {
							backgroundColor: theme.palette.primary.main,
							color: theme.palette.text.secondary,
						},
					}}
					size="small"
				>
					yes
				</Button>
				<Button
					onClick={close}
					sx={{
						"color": theme.palette.text.primary,
						"border": `2px solid ${theme.palette.primary.main}`,
						"&:hover": {
							backgroundColor: theme.palette.primary.main,
							color: theme.palette.text.secondary,
						},
					}}
					size="small"
				>
					no
				</Button>
			</Grid>
			{setting !== undefined && updateSetting ? (
				<Grid container sx={{ alignItems: "center", flexWrap: "nowrap", width: "fit-content" }}>
					<Checkbox
						checked={settingState}
						onChange={() => setSettingState(!settingState)}
						sx={{
							"& .MuiSvgIcon-root": {
								color: theme.palette.text.primary,
							},
						}}
					/>
					<Typography sx={{ fontSize: "0.8rem", ml: -0.5 }}>don't show this warning again</Typography>
				</Grid>
			) : null}
		</Grid>
	);
};
