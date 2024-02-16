import { FC, useState } from "react";
import { Button, ClickAwayListener, Grid, IconButton, TextField, Typography } from "@mui/material";
import { Project } from "../Project";
import { useDispatch, useSelector } from "react-redux";
import { nextRow, prevRow, resetProject } from "../../reducers/projectReducer.js";
import { setMode } from "../../reducers/workspaceReducer.js";
// import { updateProjectName } from "../../reducers/projectReducer.js";
import { EditOutlined, SaveOutlined } from "@mui/icons-material";
import { editProjectName } from "../../reducers/workspaceReducer.js";

interface WorkspaceProps {
	// project: any;
}

/**
 * The workspace; where the project is rendered.
 */
export const Workspace: FC<WorkspaceProps> = () => {
	// const [currentView, setCurrentView] = useState("chart"); // chart, edit, text?
	const currentMode = useSelector((state: any) => state.workspace.mode);
	// const projects = useSelector((state: any) => state.workspace.projects);
	// const currentProjectId = useSelector((state: any) => state.workspace.currentProjectId);
	const currentProject = useSelector((state: any) => state.workspace.projects[state.workspace.currentProjectId]);
	const [showEditWarning, setShowEditWarning] = useState(false);
	const [showProjectNameEditor, setShowProjectNameEditor] = useState(false);
	const [projectNameDraft, setProjectNameDraft] = useState(currentProject.projectName);

	const dispatch = useDispatch();

	// make no project found component?
	// if (!project) return null;

	const chartView = (
		<Grid container>
			<Project />
			<Button onClick={() => dispatch(nextRow())} sx={{ backgroundColor: "white" }}>
				next row
			</Button>
			<Button onClick={() => dispatch(prevRow())} sx={{ backgroundColor: "white" }}>
				prev row
			</Button>
			<Button onClick={() => dispatch(resetProject())} sx={{ backgroundColor: "white" }}>
				reset project
			</Button>
		</Grid>
	);

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
	 * The view used to edit the project.
	 */
	const editView = // todo: flesh this out. or yknow make it useable
		(
			<Grid container>
				<Typography variant="h6">edit mode</Typography>
				<Button onClick={() => dispatch(setMode("chart"))}>finish editing</Button>
				<Project />
			</Grid>
		);

	/**
	 * Warns the user that switching to edit mode will reset any progress made.
	 */
	const editWarning = (
		<ClickAwayListener onClickAway={() => setShowEditWarning(false)}>
			<Grid container sx={{ backgroundColor: "red" }}>
				<Typography>
					Warning: switching to edit mode will reset all block rows to 1. Are you sure you want to continue?
				</Typography>
				<Button onClick={handleEdit}>yes</Button>
				<Button onClick={() => setShowEditWarning(false)}>no</Button>
			</Grid>
		</ClickAwayListener>
	);

	const projectNameEditor = showProjectNameEditor ? (
		<Grid container>
			<Grid item>
				<TextField value={projectNameDraft} onChange={e => setProjectNameDraft(e.target.value)} />
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
	);

	return (
		<Grid
			container
			// justifyContent={"center"}
			// height={"90%"}
			// width={"90%"}
			border={"2px solid black"}
			// overflow={"scroll"}
			// overflow={"scroll"}
		>
			{/* <Typography variant="h6">{projects[currentProjectId].projectName}</Typography>
			 */}
			{currentMode === "edit" ? (
				<Grid container>{projectNameEditor}</Grid>
			) : (
				<Typography variant="h4">{currentProject.projectName}</Typography>
			)}
			{currentMode === "chart" ? <Button onClick={() => setShowEditWarning(true)}>edit</Button> : null}
			{showEditWarning ? editWarning : null}
			{currentMode === "chart" ? chartView : null}
			{/* {currentMode === "select" ? selectView : null} */}
			{currentMode === "edit" ? editView : null}
		</Grid>
	);
};
