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
import { resetRows } from "../../reducers/projectReducer.js";
import { SaveOutlined } from "@mui/icons-material";

interface SettingsMenuProps {
	closeSettingsMenu: () => void;
}

export const SettingsMenu: FC<SettingsMenuProps> = ({ closeSettingsMenu }) => {
	const userSettings = useSelector((state: any) => state.workspace.settings);

	const dispatch = useDispatch();
	const theme = useTheme();

	return (
		<Grid
			container
			sx={{
				backgroundColor: theme.palette.primary.main,
				color: theme.palette.text.secondary,
				p: 2,
				justifyContent: "center",
			}}
		>
			<Grid container sx={{ width: "60%" }}>
				<Typography variant="h2" sx={{ mb: 1 }}>
					settings
				</Typography>
				<Grid container flexDirection={"column"} paddingLeft="20px">
					<Grid item>
						<Typography variant="h3">theme</Typography>
						<FormControl>
							<RadioGroup
								row
								onChange={e => dispatch(changeSetting({ setting: "theme", value: e.target.value }))}
							>
								<FormControlLabel
									value="light"
									control={<Radio />}
									label="light"
									checked={userSettings.theme === "light"}
								/>
								<FormControlLabel
									value="dark"
									control={<Radio />}
									label="dark"
									checked={userSettings.theme === "dark"}
								/>
								<FormControlLabel
									value="system"
									control={<Radio />}
									label="system"
									checked={userSettings.theme === "system"}
								/>
							</RadioGroup>
						</FormControl>
					</Grid>
					<Grid item>
						<Typography variant="h3">stitch display</Typography>
						<Typography variant="h4">how stitches are displayed in the chart</Typography>
						<FormControl>
							<RadioGroup
								row
								onChange={e =>
									dispatch(changeSetting({ setting: "stitchDisplay", value: e.target.value }))
								}
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
						<Typography variant="h3">show stitch tips</Typography>
						<Typography variant="h4">how the stitch information popup is triggered</Typography>
						<FormControl>
							<RadioGroup
								row
								onChange={e =>
									dispatch(changeSetting({ setting: "stitchTipMode", value: e.target.value }))
								}
							>
								<FormControlLabel
									value="click"
									control={<Radio />}
									label="when clicked"
									checked={userSettings.stitchTipMode === "click"}
								/>
								<FormControlLabel
									value="hover"
									control={<Radio />}
									label="when hovered over"
									checked={userSettings.stitchTipMode === "hover"}
								/>
							</RadioGroup>
						</FormControl>
					</Grid>
					{/*  directions overlay on/off */}
					{/* directions overlay simple/detailed - simple: just stitch names, detailed: stitch directions */}
					<Grid item>
						{/* <Button onClick={() => dispatch(resetProject())}>reset project</Button> */}
						<Button
							sx={{
								"backgroundColor": theme.palette.text.secondary,
								"fontWeight": "bold",
								"letterSpacing": "1px",
								"border": "2px solid transparent",
								"&:hover": {
									border: `2px solid ${theme.palette.text.secondary}`,
									color: theme.palette.text.secondary,
								},
							}}
							onClick={() => dispatch(resetRows())}
						>
							reset row counts
						</Button>
					</Grid>
					{/* reset project, meaning delete all blocks and rows; optionally keeping saved blocks */}
					<IconButton
						onClick={closeSettingsMenu}
						sx={{ color: theme.palette.text.secondary, width: "fit-content", margin: "0 auto", p: 2 }}
					>
						<SaveOutlined sx={{ transform: "scale(1.5)" }} />
					</IconButton>
				</Grid>
			</Grid>
		</Grid>
	);
};
