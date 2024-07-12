import { Button, Grid } from "@mui/material";
import { FC } from "react";

interface WarningProps {
	text: string;
	setting?: string;
	updateSetting?: () => void;
	action: () => void;
	close: () => void;
}

export const Warning: FC<WarningProps> = ({ text, setting, updateSetting, action, close }) => {
	return (
		<Grid container>
			<Grid item>{text}</Grid>
			<Grid item>are you sure you want to continue?</Grid>
			<Button onClick={action}>yes</Button>
			<Button onClick={close}>no</Button>
		</Grid>
	);
};
