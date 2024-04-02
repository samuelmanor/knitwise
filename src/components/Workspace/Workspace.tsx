import { FC, useRef, useState } from "react";
import { Button, ClickAwayListener, Grid, IconButton, TextField, Typography, useTheme } from "@mui/material";
import { Project } from "../Project";
import { useDispatch, useSelector } from "react-redux";
import { nextRow, prevRow, resetProject } from "../../reducers/projectReducer.js";
import { setMode } from "../../reducers/workspaceReducer.js";
import { editProjectName } from "../../reducers/workspaceReducer.js";
import { CloseOutlined, EditOutlined, SaveOutlined } from "@mui/icons-material";
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

	if (currentMode === "chart") {
		return (
			<Grid container>
				<Grid
					container
					sx={{
						border: "2px solid transparent",
						minHeight: "calc(100vh - 72px)",
						minWidth: "fit-content",
						justifyContent: "center",
						alignItems: "end",
						backgroundImage:
							// "linear-gradient(to right, #f6f2df, #f5f1dc, #f5f0d9, #f4efd6, #f3eed3, #f2edd0, #f2ebce, #f1eacb, #f0e9c8, #efe8c5, #eee6c2, #ede5bf)",
							theme.palette.background.default,
					}}
				>
					<Grid container sx={{ justifyContent: "center" }}>
						<Project />
					</Grid>
				</Grid>
				<Grid container sx={{ position: "fixed", bottom: 0, width: "100%" }} ref={projectMenuRef}>
					<ProjectMenu />
				</Grid>
			</Grid>
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
