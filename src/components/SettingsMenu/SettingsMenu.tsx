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
import { setMode } from "../../reducers/workspaceReducer.js";

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
				theme light/dark/system directions overlay on/off
				<Grid item>
					<Button onClick={() => dispatch(resetProject())}>reset project</Button>
				</Grid>
				{/* <Button onClick={() => dispatch(setMode("edit"))}>edit project</Button>  --> move to project menu, to the left of settings button*/}
				{/* <IconButton onClick={closeSettingsMenu} sx={{ position: "absolute", color: "red", right: 5, top: 5 }}>
					<CloseOutlined />
				</IconButton> */}
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
