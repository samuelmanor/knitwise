import {
	Button,
	FormControl,
	FormControlLabel,
	Grid,
	IconButton,
	Radio,
	RadioGroup,
	Typography,
	useTheme,
} from "@mui/material";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSetting } from "../../reducers/workspaceReducer";
import { resetProject } from "../../reducers/projectReducer.js";
import { CloseOutlined, SaveOutlined } from "@mui/icons-material";
import { getSystemTheme } from "../../reducers/workspaceReducer.js";

interface SettingsMenuProps {
	closeSettingsMenu: () => void;
}

export const SettingsMenu: FC<SettingsMenuProps> = ({ closeSettingsMenu }) => {
	const userSettings = useSelector((state: any) => state.workspace.settings);

	const dispatch = useDispatch();
	const theme = useTheme();

	return (
		<Grid container sx={{ backgroundColor: theme.palette.primary.main, color: theme.palette.text.secondary, p: 2 }}>
			<Typography variant="h2" onClick={() => console.log(userSettings)}>
				Settings
			</Typography>
			<Grid container flexDirection={"column"}>
				<Grid item>
					<Typography>theme</Typography>
					<FormControl>
						<RadioGroup
							row
							onChange={e => dispatch(changeSetting({ setting: "theme", value: e.target.value }))}
						>
							<FormControlLabel
								value="light"
								control={
									<Radio sx={{ "&, &.MuiRadio-root": { color: theme.palette.text.secondary } }} />
								}
								label="light"
								checked={userSettings.theme === "light"}
							/>
							<FormControlLabel
								value="dark"
								control={
									<Radio sx={{ "&, &.MuiRadio-root": { color: theme.palette.text.secondary } }} />
								}
								label="dark"
								checked={userSettings.theme === "dark"}
							/>
							<FormControlLabel
								value="system"
								control={
									<Radio sx={{ "&, &.MuiRadio-root": { color: theme.palette.text.secondary } }} />
								}
								label="system"
								checked={userSettings.theme === "system"}
							/>
						</RadioGroup>
					</FormControl>
				</Grid>
				<Grid item>
					<Typography>stitch display</Typography>
					<FormControl>
						<RadioGroup
							row
							onChange={e => dispatch(changeSetting({ setting: "stitchDisplay", value: e.target.value }))}
						>
							<FormControlLabel
								value="symbol"
								control={
									<Radio sx={{ "&, &.MuiRadio-root": { color: theme.palette.text.secondary } }} />
								}
								label="symbol"
								checked={userSettings.stitchDisplay === "symbol"}
							/>
							<FormControlLabel
								value="abbreviation"
								control={
									<Radio sx={{ "&, &.MuiRadio-root": { color: theme.palette.text.secondary } }} />
								}
								label="abbreviation"
								checked={userSettings.stitchDisplay === "abbreviation"}
							/>
						</RadioGroup>
					</FormControl>
				</Grid>
				{/*  directions overlay on/off */}
				<Grid item>
					<Button onClick={() => dispatch(resetProject())}>reset project</Button>
				</Grid>

				<IconButton
					onClick={closeSettingsMenu}
					sx={{ color: theme.palette.text.secondary, width: "fit-content", margin: "0 auto", p: 2 }}
				>
					<SaveOutlined sx={{ transform: "scale(1.5)" }} />
				</IconButton>
			</Grid>
		</Grid>
	);
};
