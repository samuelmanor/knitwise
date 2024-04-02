import { FC, useState } from "react";
import { nextRow, prevRow, resetProject } from "../../reducers/projectReducer.js";
import { Drawer, Grid, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined, SettingsOutlined } from "@mui/icons-material";
import { SettingsMenu } from "../SettingsMenu/";

interface ProjectMenuProps {}

export const ProjectMenu: FC<ProjectMenuProps> = () => {
	const projectName = useSelector(
		(state: any) => state.workspace.projects[state.workspace.currentProjectId].projectName,
	);
	const currentRow = useSelector((state: any) => state.projects.currentRow);
	const [openSettings, setOpenSettings] = useState(false);

	/**
	 * Toggles opening/closing the settings menu.
	 * @param newState The new state of the settings menu visibility.
	 */
	const toggleSettingsDrawer = (newState: boolean) => {
		setOpenSettings(newState);
	};

	const dispatch = useDispatch();
	const theme = useTheme();

	/*
	add edit button to the left of settings button
	make row controls a separate component? or at least center it
	 */

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
				<Typography variant="h2" sx={{ letterSpacing: "1px" }}>
					{projectName}
				</Typography>
			</Grid>
			<Grid item sx={{ display: "flex", flexDirection: "row", alignItems: "baseline", gap: 2 }}>
				{currentRow !== 1 ? (
					<Tooltip
						title={<Typography variant="body1">previous row</Typography>}
						placement="top-end"
						slotProps={{ popper: { modifiers: [{ name: "offset", options: { offset: [0, -10] } }] } }}
						sx={{ fontSize: "15px" }}
					>
						<IconButton
							onClick={() => dispatch(prevRow())}
							sx={{ color: theme.palette.text.secondary }}
							size="large"
						>
							<ArrowBackIosNewOutlined />
						</IconButton>
					</Tooltip>
				) : (
					<IconButton disabled size="large">
						<ArrowBackIosNewOutlined />
					</IconButton>
				)}

				<Typography variant="h5" fontFamily={"Arial"}>
					{currentRow}
				</Typography>

				<Tooltip
					title={<Typography variant="body1">next row</Typography>}
					placement="top-start"
					slotProps={{ popper: { modifiers: [{ name: "offset", options: { offset: [0, -10] } }] } }}
					sx={{ fontSize: "15px" }}
				>
					<IconButton
						onClick={() => dispatch(nextRow())}
						sx={{ color: theme.palette.text.secondary }}
						size="large"
					>
						<ArrowForwardIosOutlined />
					</IconButton>
				</Tooltip>
			</Grid>
			<Grid item>
				<IconButton size="large" sx={{ color: theme.palette.text.secondary, transform: "scale(1.5)" }}>
					<SettingsOutlined onClick={() => toggleSettingsDrawer(true)} />
				</IconButton>
			</Grid>
			<Drawer anchor="bottom" open={openSettings} onClose={() => toggleSettingsDrawer(false)}>
				<SettingsMenu closeSettingsMenu={() => toggleSettingsDrawer(false)} />
			</Drawer>
		</Grid>
	);
};
