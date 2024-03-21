import { FC, useRef, useState } from "react";
import { Button, ClickAwayListener, Grid, IconButton, TextField, Typography, useTheme } from "@mui/material";
import { Project } from "../Project";
import { useDispatch, useSelector } from "react-redux";
import { nextRow, prevRow, resetProject } from "../../reducers/projectReducer.js";
import { setMode } from "../../reducers/workspaceReducer.js";
import { editProjectName } from "../../reducers/workspaceReducer.js";
import { CloseOutlined, EditOutlined, SaveOutlined } from "@mui/icons-material";
import { SettingsMenu } from "../Settings";
import { ProjectMenu } from "../ProjectMenu";

interface WorkspaceProps {}

/**
 * The workspace; where the project is rendered.
 */
export const Workspace: FC<WorkspaceProps> = () => {
	const currentMode = useSelector((state: any) => state.workspace.mode);
	const currentProject = useSelector((state: any) => state.workspace.projects[state.workspace.currentProjectId]);
	const [showEditWarning, setShowEditWarning] = useState(false);
	// const [showSettingsMenu, setShowSettingsMenu] = useState(false);
	const [showProjectNameEditor, setShowProjectNameEditor] = useState(false);
	const [projectNameDraft, setProjectNameDraft] = useState(currentProject.projectName);
	const projectMenuRef = useRef<HTMLDivElement>(null);

	const dispatch = useDispatch();
	const theme = useTheme();

	// make no project found component?
	// if (!project) return null;

	// const selectView = ( // for selecting which project to work on?
	// 	<Grid container>
	// 		available projects:
	// 		<Grid item>
	// 			{projects.map((project: any) => {
	// 				return (
	// 					<Grid item>
	// 						<Button onClick={() => dispatch(setMode("chart"))}>{project.projectName}</Button>
	// 					</Grid>
	// 				);
	// 			})}
	// 		</Grid>
	// 	</Grid>
	// );

	/**
	 * Handles the edit button click; sets the mode to "edit", resets the project, and dismisses the warning.
	 */
	const handleEdit = () => {
		dispatch(setMode("edit"));
		dispatch(resetProject());
		setShowEditWarning(false);
	};

	/**
	 * Warns the user that switching to edit mode will reset any progress made.
	 */
	const editWarning = (
		<ClickAwayListener onClickAway={() => setShowEditWarning(false)}>
			<Grid
				container
				sx={{
					// backgroundColor: theme.palette.background.default,
					// border: `2px solid ${theme.palette.error.main}`,
					backgroundColor: theme.palette.error.main,
					border: "2px solid transparent",
					borderRadius: "5px",
					width: "50%",
					position: "absolute",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					userSelect: "none",
				}}
			>
				<Typography
					sx={{ color: theme.palette.background.default, fontSize: "35px", textDecoration: "underline" }}
				>
					edit warning
				</Typography>
				<Typography>switching to edit mode will reset all block rows to 1.</Typography>
				<Typography>are you sure you want to continue?</Typography>
				<Grid container>
					<Button onClick={handleEdit}>yes</Button>
					<Button onClick={() => setShowEditWarning(false)}>no</Button>
				</Grid>
				<IconButton
					onClick={() => setShowEditWarning(false)}
					sx={{
						color: theme.palette.background.default,
						position: "absolute",
						right: 0,
						top: 0,
					}}
				>
					<CloseOutlined />
				</IconButton>
			</Grid>
		</ClickAwayListener>
	);

	if (currentMode === "chart") {
		return (
			<Grid
				container
				sx={{
					border: "5px solid red",
					overflowX: "hidden",
					// display: "flex",
					// flexDirection: "column",
					// justifyContent: "space-between",
					justifyContent: "center",
					// alignItems: "center",
					width: "100%",
					backgroundImage:
						"linear-gradient(to right, #f6f2df, #f5f1dc, #f5f0d9, #f4efd6, #f3eed3, #f2edd0, #f2ebce, #f1eacb, #f0e9c8, #efe8c5, #eee6c2, #ede5bf)",
				}}
			>
				{showEditWarning ? editWarning : null}
				{/* {showSettingsMenu ? (
					<Grid container>
						<SettingsMenu />
						<Button onClick={() => setShowSettingsMenu(false)}>close settings</Button>
					</Grid>
				) : null} */}
				{/* <Grid
					container
					// sx={{
					// 	border: "2px solid blue",
					// 	overflow: "scroll",
					// 	width: "100%",
					// 	display: "flex",
					// 	justifyContent: "center",
					// }}
				>
					<Project />
				</Grid>
				<ProjectMenu /> */}
				{/* <Grid container sx={{ display: "flex", flexDirection: "column" }}> */}
				<Grid
					item
					sx={{
						border: "2px solid blue",
						width: "100%",
						height: `calc(100% - ${projectMenuRef.current?.offsetHeight + 10}px)`,
						minHeight: `calc(100vh - ${projectMenuRef.current?.offsetHeight + 10}px)`,
						// overflowX: "scroll",
						// width: "100%",
						mb: `${projectMenuRef.current?.clientHeight}px`,
						overflowX: "scroll",
					}}
				>
					<Project />
				</Grid>
				<Grid
					item
					sx={{ border: "2px solid green", position: "fixed", bottom: 0, width: "100%" }}
					ref={projectMenuRef}
					onClick={() => console.log(projectMenuRef.current?.clientHeight)}
				>
					<ProjectMenu />
				</Grid>
			</Grid>
			// </Grid>
		);
	}

	if (currentMode === "edit") {
		return (
			<Grid container>
				<Grid container>
					{showProjectNameEditor ? (
						<Grid container>
							<Grid item>
								<TextField
									value={projectNameDraft}
									onChange={e => setProjectNameDraft(e.target.value)}
								/>
							</Grid>
							<Grid item>
								<IconButton
									onClick={() => {
										dispatch(editProjectName({ projectName: projectNameDraft }));
										setShowProjectNameEditor(false);
									}}
								>
									<SaveOutlined />
								</IconButton>
							</Grid>
						</Grid>
					) : (
						<Grid container>
							<Grid item>
								<Typography variant="h4">{currentProject.projectName}</Typography>
							</Grid>
							<Grid item>
								<IconButton onClick={() => setShowProjectNameEditor(true)}>
									<EditOutlined />
								</IconButton>
							</Grid>
						</Grid>
					)}
				</Grid>
				<Grid container>
					<Typography variant="h6">edit mode</Typography>
					<Button onClick={() => dispatch(setMode("chart"))}>finish editing</Button>
					<Project />
				</Grid>
			</Grid>
		);
	}
};
