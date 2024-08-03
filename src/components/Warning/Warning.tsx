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
			<Grid item container sx={{ pt: 0.5, justifyContent: "center", gap: 1 }}>
				<Button
					onClick={handleConfirmation}
					sx={{
						"color": theme.palette.text.primary,
						"&:hover": {
							backgroundColor: theme.palette.primary.main,
						},
						"&:active": {
							backgroundColor: theme.palette.primary.dark,
						},
					}}
				>
					yes
				</Button>
				<Button
					onClick={close}
					sx={{
						"color": theme.palette.text.primary,
						"&:hover": {
							backgroundColor: theme.palette.primary.main,
						},
						"&:active": {
							backgroundColor: theme.palette.primary.dark,
						},
					}}
				>
					no
				</Button>
			</Grid>
			{setting !== undefined && updateSetting ? (
				<Grid container sx={{ alignItems: "center" }}>
					<Checkbox
						checked={settingState}
						onChange={() => setSettingState(!settingState)}
						sx={{
							"& .MuiSvgIcon-root": {
								color: theme.palette.text.secondary,
							},
						}}
					/>
					<Typography variant="h4" ml={-1}>
						don't show this warning again
					</Typography>
				</Grid>
			) : null}
		</Grid>
	);
};
