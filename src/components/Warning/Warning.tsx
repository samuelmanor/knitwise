import { Button, Checkbox, Grid, Typography, useTheme } from "@mui/material";
import { FC, useState } from "react";

interface WarningProps {
	text: string;
	setting?: boolean;
	updateSetting?: () => void;
	action: () => void;
	close: () => void;
}

export const Warning: FC<WarningProps> = ({ text, setting, updateSetting, action, close }) => {
	const [settingState, setSettingState] = useState(!setting);

	const theme = useTheme();

	const handleConfirmation = () => {
		if (setting !== undefined && updateSetting && settingState === true) {
			updateSetting();
		}
		action();
	};
	return (
		<Grid container sx={{ flexDirection: "column", alignItems: "center", width: "fit-content", gap: 0.5, pt: 1 }}>
			<Grid item>{text}</Grid>
			<Grid item>are you sure you want to continue?</Grid>
			<Grid item sx={{ pt: 0.5 }}>
				<Button
					onClick={handleConfirmation}
					// sx={{ border: `2px solid ${theme.palette.primary.main}`, color: theme.palette.primary.main }}
				>
					yes
				</Button>
				<Button onClick={close}>no</Button>
			</Grid>
			{setting !== undefined && updateSetting ? (
				<Grid container sx={{ alignItems: "center" }}>
					<Checkbox checked={settingState} onChange={() => setSettingState(!settingState)} />
					<Typography>don't show this warning again</Typography>
				</Grid>
			) : null}
		</Grid>
	);
};
