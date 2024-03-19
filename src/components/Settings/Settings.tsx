import { Button, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSetting } from "../../reducers/workspaceReducer";
import { resetProject } from "../../reducers/projectReducer.js";

interface SettingsMenuProps {}

export const SettingsMenu: FC<SettingsMenuProps> = () => {
	const userSettings = useSelector((state: any) => state.workspace.settings);

	const dispatch = useDispatch();

	return (
		<Grid container>
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
								control={<Radio />}
								label="symbol"
								checked={userSettings.stitchDisplay === "symbol"}
							/>
							<FormControlLabel
								value="abbreviation"
								control={<Radio />}
								label="abbreviation"
								checked={userSettings.stitchDisplay === "abbreviation"}
							/>
						</RadioGroup>
					</FormControl>
				</Grid>
				<Grid item>
					<Button onClick={() => dispatch(resetProject())}>reset project</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};
