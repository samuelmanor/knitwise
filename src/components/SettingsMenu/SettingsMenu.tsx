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
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSetting } from "../../reducers/workspaceReducer";
import { resetRows } from "../../reducers/projectReducer.js";
import { SaveOutlined } from "@mui/icons-material";

interface SettingsMenuProps {
	closeSettingsMenu: () => void;
}

export const SettingsMenu: FC<SettingsMenuProps> = ({ closeSettingsMenu }) => {
	const userSettings = useSelector((state: any) => state.workspace.settings);
	const [showResetRowCountWarning, setShowResetRowCountWarning] = useState(false);
	const [showResetProjectWarning, setShowResetProjectWarning] = useState(false);

	const dispatch = useDispatch();
	const theme = useTheme();

	const handleResetRowCount = () => {
		dispatch(resetRows());
		setShowResetRowCountWarning(false);
	};

	const handleResetProject = () => {
		// dispatch(resetProject());
		setShowResetProjectWarning(false);
	};

	/**
	 * Warns the user that some parts of the project will be reset.
	 */
	const resetWarning = (
		<Grid
			container
			sx={{
				position: "absolute",
				flexDirection: "column",
				width: "fit-content",
				maxWidth: "35%",
				p: 2,
				borderRadius: "5px",
				zIndex: 100,
				left: "50%",
				top: "50%",
				transform: "translate(-50%, -50%)",
				backgroundColor: theme.palette.error.main,
			}}
		>
			<Typography variant="h3">warning</Typography>
			<Typography variant="h4">are you sure?</Typography>
			<Typography variant="h4">
				{showResetRowCountWarning
					? "this will reset the row count for the project and all its blocks."
					: "this will reset the project, deleting all blocks and rows, except for those saved in the editor."}
			</Typography>
			<Grid item sx={{ pt: 2, display: "flex", gap: 4, justifyContent: "center" }}>
				<Button
					onClick={() => (showResetRowCountWarning ? handleResetRowCount() : handleResetProject())}
					sx={{ color: theme.palette.text.secondary, border: `2px solid ${theme.palette.text.secondary}` }}
				>
					yes, reset
				</Button>
				<Button
					onClick={() =>
						showResetRowCountWarning
							? setShowResetRowCountWarning(false)
							: setShowResetProjectWarning(false)
					}
					sx={{ color: theme.palette.text.secondary, border: `2px solid ${theme.palette.text.secondary}` }}
				>
					no, cancel
				</Button>
			</Grid>
		</Grid>
	);

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
				{showResetRowCountWarning || showResetProjectWarning ? resetWarning : null}
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
						<Typography variant="h3">stitch info display</Typography>
						<Typography variant="h4">how the stitch details popup is triggered</Typography>
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
					<Grid container sx={{ display: "flex", gap: 4 }}>
						<Grid item>
							<Button
								sx={{
									"backgroundColor": theme.palette.text.secondary,
									"border": "2px solid transparent",
									"&:hover": {
										border: `2px solid ${theme.palette.text.secondary}`,
										color: theme.palette.text.secondary,
									},
									"fontSize": "18px",
								}}
								onClick={() => setShowResetRowCountWarning(true)}
								disabled={showResetRowCountWarning}
							>
								reset row count
							</Button>
						</Grid>
						<Grid item>
							<Button
								sx={{
									"backgroundColor": theme.palette.text.secondary,
									"border": "2px solid transparent",
									"&:hover": {
										border: `2px solid ${theme.palette.text.secondary}`,
										color: theme.palette.text.secondary,
									},
									"fontSize": "18px",
								}}
								onClick={() => setShowResetProjectWarning(true)}
								disabled={showResetProjectWarning}
							>
								reset project
							</Button>
						</Grid>
					</Grid>
					<IconButton
						onClick={closeSettingsMenu}
						// should also save user settings to cookies
						sx={{ color: theme.palette.text.secondary, p: 2, width: "fit-content" }}
					>
						<SaveOutlined sx={{ transform: "scale(2)" }} />
					</IconButton>
				</Grid>
			</Grid>
		</Grid>
	);
};
