import { FC, useState } from "react";
import { Drawer, Grid, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, SaveOutlined, SettingsOutlined, SwapHorizOutlined } from "@mui/icons-material";
import { SettingsMenu } from "../SettingsMenu/";
import { setMode } from "../../reducers/workspaceReducer";
import { editProjectName } from "../../reducers/projectReducer";
import { RowControls } from "../RowControls";
import { NameEditor } from "../NameEditor";
import { AddBlock } from "../AddBlock";

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

	/**
	 * Changes the mode between "chart" and "edit", and scrolls to the bottom of the page to show edit controls, if necessary.
	 */
	const changeMode = () => {
		dispatch(setMode(mode === "chart" ? "edit" : "chart"));
		setTimeout(() => {
			window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
		}, 10);
	};

	return (
		<Grid
			container
			sx={{
				backgroundColor: theme.palette.primary.main,
				paddingX: 2,
				flexWrap: "nowrap",
				justifyContent: { xs: "space-around", sm: "space-between" },
				alignItems: "center",
				minHeight: { xs: "72px", sm: "fit-content" },
			}}
		>
			<Grid
				item
				sx={{
					color: theme.palette.text.secondary,
					flexDirection: "row",
					alignItems: "center",
					gap: 1.5,
				}}
			>
				{mode === "edit" || mode === "dragBlocks" ? (
					<NameEditor name={projectName} onSave={name => dispatch(editProjectName(name))} type="project" />
				) : (
					<Typography variant="h2" sx={{ letterSpacing: "1px", whiteSpace: "nowrap" }}>
						{projectName}
					</Typography>
				)}
			</Grid>
			{mode === "chart" ? (
				<Grid item>
					<RowControls />
				</Grid>
			) : null}
			<Grid item sx={{ display: "flex", gap: 3, alignItems: "center" }}>
				<AddBlock />
				<Tooltip
					title="rearrange blocks"
					placement="top"
					componentsProps={{
						tooltip: {
							sx: {
								backgroundColor: theme.palette.primary.main,
								color: theme.palette.text.secondary,
								fontSize: "1.2rem",
								borderBottomLeftRadius: 0,
								borderBottomRightRadius: 0,
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
						sx={{
							backgroundColor: mode === "dragBlocks" ? theme.palette.primary.dark : "transparent",
							color: mode === "dragBlocks" ? theme.palette.text.secondary : theme.palette.text.secondary,
							display: mode === "edit" ? "flex" : "none",
						}}
						onClick={() => dispatch(setMode(mode === "edit" ? "dragBlocks" : "edit"))}
					>
						<SwapHorizOutlined fontSize="large" />
					</IconButton>
				</Tooltip>
				<Tooltip
					title={mode === "chart" ? "edit project" : "save project"}
					placement="top"
					componentsProps={{
						tooltip: {
							sx: {
								backgroundColor: theme.palette.primary.main,
								color: theme.palette.text.secondary,
								fontSize: "1.2rem",
								borderBottomLeftRadius: 0,
								borderBottomRightRadius: 0,
							},
						},
					}}
					PopperProps={{
						modifiers: [
							{
								name: "offset",
								options: {
									offset: [0, -9],
								},
							},
						],
					}}
				>
					<IconButton
						size="large"
						sx={{ color: theme.palette.text.secondary }}
						onClick={changeMode}
						disabled={mode === "editBlock"}
					>
						{mode === "chart" ? <EditOutlined fontSize="large" /> : <SaveOutlined fontSize="large" />}
					</IconButton>
				</Tooltip>
				<Tooltip
					title="settings"
					placement="top"
					componentsProps={{
						tooltip: {
							sx: {
								backgroundColor: theme.palette.primary.main,
								color: theme.palette.text.secondary,
								fontSize: "1.2rem",
								borderBottomLeftRadius: 0,
								borderBottomRightRadius: 0,
							},
						},
					}}
					PopperProps={{
						modifiers: [
							{
								name: "offset",
								options: {
									offset: [0, -9],
								},
							},
						],
					}}
				>
					<IconButton
						size="large"
						sx={{ color: theme.palette.text.secondary }}
						onClick={() => setOpenSettings(true)}
					>
						<SettingsOutlined fontSize="large" />
					</IconButton>
				</Tooltip>
			</Grid>
			<Drawer anchor="bottom" open={openSettings} onClose={() => setOpenSettings(false)}>
				<SettingsMenu closeSettingsMenu={() => setOpenSettings(false)} />
			</Drawer>
		</Grid>
	);
};
