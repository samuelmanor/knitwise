import { FC, useState } from "react";
import { Drawer, Grid, IconButton, TextField, Tooltip, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, SaveOutlined, SettingsOutlined } from "@mui/icons-material";
import { SettingsMenu } from "../SettingsMenu/";
import { setMode } from "../../reducers/workspaceReducer";
import { editProjectName } from "../../reducers/projectReducer";
import { RowControls } from "../RowControls";

interface ProjectMenuProps {}

/**
 * The menu that displays the project name and provides access to project settings, editing, and row navigation.
 */
export const ProjectMenu: FC<ProjectMenuProps> = () => {
	const projectName = useSelector((state: any) => state.projects.name);
	const mode = useSelector((state: any) => state.workspace.mode);
	const [openSettings, setOpenSettings] = useState(false);
	const [showProjectNameEditor, setShowProjectNameEditor] = useState(false);
	const [projectNameDraft, setProjectNameDraft] = useState(projectName);

	const dispatch = useDispatch();
	const theme = useTheme();

	return (
		<Grid
			container
			sx={{
				backgroundColor: theme.palette.primary.main,
				justifyContent: "space-between",
				pl: 2,
				pr: 2,
				alignItems: "center",
			}}
		>
			<Grid
				item
				sx={{
					color: theme.palette.text.secondary,
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					gap: 1.5,
				}}
			>
				{!showProjectNameEditor ? (
					<>
						<Typography variant="h2" sx={{ letterSpacing: "1px" }}>
							{projectName}
						</Typography>
						{mode === "edit" ? (
							<IconButton
								size="large"
								sx={{
									transform: "scale(1.5)",
									color: theme.palette.text.secondary,
									height: "fit-content",
								}}
								onClick={() => setShowProjectNameEditor(true)}
							>
								<EditOutlined />
							</IconButton>
						) : null}
					</>
				) : null}
				{mode === "edit" && showProjectNameEditor ? (
					<TextField
						value={projectNameDraft}
						onChange={e => setProjectNameDraft(e.target.value)}
						variant="standard"
						autoFocus
						InputProps={{
							style: {
								fontSize: "40px",
								border: "none",
								borderBottom: `2px solid ${theme.palette.text.secondary}`,
							},
							disableUnderline: true,
							endAdornment: (
								<IconButton
									size="large"
									sx={{
										transform: "scale(1.5)",
										color: theme.palette.text.secondary,
										height: "fit-content",
									}}
									onClick={() => {
										dispatch(editProjectName(projectNameDraft));
										setShowProjectNameEditor(false);
									}}
								>
									<SaveOutlined />
								</IconButton>
							),
						}}
					/>
				) : null}
			</Grid>
			{mode === "chart" ? <RowControls /> : null}
			<Grid item sx={{ display: "flex", gap: 3 }}>
				<Tooltip
					title={mode === "chart" ? "edit project" : "save project"}
					placement="top"
					arrow
					componentsProps={{
						tooltip: {
							sx: {
								"fontSize": "15px",
								"p": 1,
								"letterSpacing": "1px",
								"backgroundColor": theme.palette.primary.main,
								"color": theme.palette.text.secondary,
								"fontWeight": "bold",
								"& .MuiTooltip-arrow": {
									color: theme.palette.primary.main,
								},
							},
						},
					}}
				>
					<IconButton
						size="large"
						sx={{ color: theme.palette.text.secondary, transform: "scale(1.5)" }}
						onClick={() => dispatch(setMode(mode === "chart" ? "edit" : "chart"))}
						disabled={mode === "editBlock"}
					>
						{mode === "chart" ? <EditOutlined /> : <SaveOutlined />}
					</IconButton>
				</Tooltip>
				<Tooltip
					title="settings"
					placement="top"
					arrow
					componentsProps={{
						tooltip: {
							sx: {
								"fontSize": "15px",
								"p": 1,
								"letterSpacing": "1px",
								"backgroundColor": theme.palette.primary.main,
								"color": theme.palette.text.secondary,
								"fontWeight": "bold",
								"& .MuiTooltip-arrow": {
									color: theme.palette.primary.main,
								},
							},
						},
					}}
				>
					<IconButton size="large" sx={{ color: theme.palette.text.secondary, transform: "scale(1.5)" }}>
						<SettingsOutlined onClick={() => setOpenSettings(true)} />
					</IconButton>
				</Tooltip>
			</Grid>
			<Drawer anchor="bottom" open={openSettings} onClose={() => setOpenSettings(false)}>
				<SettingsMenu closeSettingsMenu={() => setOpenSettings(false)} />
			</Drawer>
		</Grid>
	);
};
