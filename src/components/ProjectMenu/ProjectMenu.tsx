import { FC, useState } from "react";
import { Drawer, Grid, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, SettingsOutlined } from "@mui/icons-material";
import { SettingsMenu } from "../SettingsMenu/";
import { setMode } from "../../reducers/workspaceReducer";
import { RowControls } from "../RowControls";

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
			<Grid item sx={{ color: theme.palette.text.secondary }}>
				{mode === "chart" ? (
					<Typography variant="h2" sx={{ letterSpacing: "1px" }}>
						{projectName}
					</Typography>
				) : (
					<Grid container>editable text</Grid>
				)}
			</Grid>
			<RowControls />
			<Grid item sx={{ display: "flex", gap: 3 }}>
				<Tooltip
					title="edit project"
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
						onClick={() => dispatch(setMode("edit"))}
					>
						<EditOutlined />
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
