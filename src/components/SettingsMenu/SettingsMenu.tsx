import {
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	Grid,
	IconButton,
	Link,
	Radio,
	RadioGroup,
	Tooltip,
	Typography,
	useTheme,
} from "@mui/material";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetRows, changeSetting, resetProject } from "../../reducers/projectReducer";
import { ArrowOutwardOutlined, SaveOutlined } from "@mui/icons-material";

interface SettingsMenuProps {
	closeSettingsMenu: () => void;
}

/**
 * The menu that allows the user to change various settings for the project.
 * @param closeSettingsMenu A function to close the settings menu.
 */
export const SettingsMenu: FC<SettingsMenuProps> = ({ closeSettingsMenu }) => {
	const userSettings = useSelector((state: any) => state.project.settings);
	const [showResetRowCountWarning, setShowResetRowCountWarning] = useState(false);
	const [showResetProjectWarning, setShowResetProjectWarning] = useState(false);

	const disableSettings = showResetProjectWarning || showResetRowCountWarning;

	const dispatch = useDispatch();
	const theme = useTheme();

	const handleResetRowCount = () => {
		dispatch(resetRows());
		setShowResetRowCountWarning(false);
		closeSettingsMenu();
	};

	const handleResetProject = () => {
		dispatch(resetProject());
		setShowResetProjectWarning(false);
		closeSettingsMenu();
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
					? "this will reset the row counter for the project and all its blocks."
					: "this will reset the project, deleting all the current blocks and their rows."}
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
				pb: 1.5,
				justifyContent: "center",
				flexWrap: "nowrap",
				gap: 2,
			}}
			data-testid="settings-menu"
		>
			<Grid container sx={{ width: "600px" }}>
				<Grid container sx={{ display: "flex", alignItems: "center" }}>
					<Typography variant="h2" sx={{ mb: 1 }}>
						settings
					</Typography>
					<Tooltip title="save" placement="right">
						<IconButton
							onClick={closeSettingsMenu}
							sx={{
								color: theme.palette.text.secondary,
								ml: 2,
							}}
						>
							<SaveOutlined fontSize="large" />
						</IconButton>
					</Tooltip>
				</Grid>
				{disableSettings ? resetWarning : null}
				<Grid container flexDirection={"column"} paddingLeft="20px">
					<Grid item>
						<Typography variant="h3">theme</Typography>
						<FormControl disabled={disableSettings}>
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
						<FormControl disabled={disableSettings}>
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
						<Typography variant="h3">stitch info</Typography>
						<Typography variant="h4">how the stitch details pop-up is triggered</Typography>
						<FormControl disabled={disableSettings}>
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
					<Grid item>
						<Typography variant="h3">directions overlay</Typography>
						<Typography variant="h4">
							display stitch names or directions in the chart, or not at all
						</Typography>
						<FormControl disabled={disableSettings}>
							<RadioGroup
								row
								onChange={e =>
									dispatch(changeSetting({ setting: "directionsOverlayMode", value: e.target.value }))
								}
							>
								<FormControlLabel
									value="simple"
									control={<Radio />}
									label="just names"
									checked={userSettings.directionsOverlayMode === "simple"}
								/>
								<FormControlLabel
									value="detailed"
									control={<Radio />}
									label="full directions"
									checked={userSettings.directionsOverlayMode === "detailed"}
								/>
								<FormControlLabel
									value="none"
									control={<Radio />}
									label="don't show"
									checked={userSettings.directionsOverlayMode === "none"}
								/>
							</RadioGroup>
						</FormControl>
					</Grid>
					<Grid item>
						<Typography variant="h3">destructive action warnings</Typography>
						<Typography variant="h4">show warning pop-ups when:</Typography>
						<FormControlLabel
							control={
								<Checkbox
									checked={userSettings.showDeleteRowConfirmation}
									onChange={() =>
										dispatch(
											changeSetting({
												setting: "showDeleteRowConfirmation",
												value: !userSettings.showDeleteRowConfirmation,
											}),
										)
									}
									sx={{
										"& .MuiSvgIcon-root": {
											color: theme.palette.text.secondary,
										},
										"ml": 1,
									}}
								/>
							}
							label="deleting a row"
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={userSettings.showDeleteBlockConfirmation}
									onChange={() =>
										dispatch(
											changeSetting({
												setting: "showDeleteBlockConfirmation",
												value: !userSettings.showDeleteBlockConfirmation,
											}),
										)
									}
									sx={{
										"& .MuiSvgIcon-root": {
											color: theme.palette.text.secondary,
										},
									}}
								/>
							}
							label="deleting a block"
						/>
					</Grid>
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
								disabled={showResetRowCountWarning || showResetProjectWarning}
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
								disabled={showResetProjectWarning || showResetRowCountWarning}
							>
								reset project
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid
				container
				sx={{
					width: "fit-content",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					gap: 5,
					paddingX: 1,
				}}
			>
				<Grid
					container
					sx={{
						alignItems: "center",
						gap: 0.5,
						width: "fit-content",
					}}
				>
					<Typography variant="h4" sx={{ color: theme.palette.text.secondary }}>
						check out
					</Typography>
					<Typography
						variant="h4"
						sx={{
							backgroundColor: theme.palette.text.secondary,
							color: theme.palette.primary.dark,
							paddingY: 0.5,
							paddingX: 1,
							borderRadius: "5px",
							alignItems: "center",
							display: "flex",
							cursor: "pointer",
						}}
					>
						<Link href="https://github.com/samuelmanor">my github</Link>
						<ArrowOutwardOutlined fontSize="small" />
					</Typography>
				</Grid>
				{/* <Grid container sx={{ flexDirection: "column", alignItems: "center", gap: 1 }}>
					<Typography variant="h4" sx={{ textAlign: "center", width: "200px", p: 0 }}>
						if you enjoy knitwise, please consider buying me a coffee:
					</Typography>
					<Typography
						variant="h4"
						sx={{
							backgroundColor: theme.palette.text.secondary,
							color: theme.palette.primary.dark,
							paddingY: 0.5,
							paddingX: 1,
							borderRadius: "5px",
							alignItems: "center",
							display: "flex",
							cursor: "pointer",
							width: "fit-content",
						}}
					>
						ko.fi
					</Typography>
				</Grid> */}
			</Grid>
		</Grid>
	);
};
