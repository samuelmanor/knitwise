import { FC, useState } from "react";
import { Drawer, Grid, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, SaveOutlined, SettingsOutlined } from "@mui/icons-material";
import { SettingsMenu } from "../SettingsMenu/";
import { setMode } from "../../reducers/workspaceReducer";
import { editProjectName } from "../../reducers/projectReducer";
import { RowControls } from "../RowControls";
import { NameEditor } from "../NameEditor";

interface ProjectMenuProps {}

/**
 * The menu that displays the project name and provides access to project settings, editing, and row navigation.
 */
export const ProjectMenu: FC<ProjectMenuProps> = () => {
	const projectName = useSelector((state: any) => state.projects.name);
	const mode = useSelector((state: any) => state.workspace.mode);
	const [openSettings, setOpenSettings] = useState(false);

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
				{mode === "edit" ? (
					<NameEditor name={projectName} onSave={name => dispatch(editProjectName(name))} type="project" />
				) : (
					<Typography variant="h2" sx={{ letterSpacing: "1px" }}>
						{projectName}
					</Typography>
				)}
			</Grid>
			{mode === "chart" ? <RowControls /> : null}
			<Grid item sx={{ display: "flex", gap: 3 }}>
				<Tooltip
					title={mode === "chart" ? "edit project" : "save project"}
					placement="top"
					componentsProps={{
						tooltip: {
							sx: {
								color: theme.palette.primary.main,
								fontSize: "1.2rem",
							},
						},
					}}
					PopperProps={{
						modifiers: [
							{
								name: "offset",
								options: {
									offset: [0, -8],
								},
							},
						],
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
					componentsProps={{
						tooltip: {
							sx: {
								color: theme.palette.primary.main,
								// fontWeight: "bold",
								fontSize: "1.2rem",
							},
						},
					}}
					PopperProps={{
						modifiers: [
							{
								name: "offset",
								options: {
									offset: [0, -8],
								},
							},
						],
					}}
				>
					<IconButton
						size="large"
						sx={{ color: theme.palette.text.secondary, transform: "scale(1.5)" }}
						disabled={mode === "editBlock"} // tempfix; row edit buttons in block editor show over settings menu
					>
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
