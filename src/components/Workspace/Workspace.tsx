import { FC } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Project } from "../Project";
import { useDispatch, useSelector } from "react-redux";
import { nextRow, prevRow } from "../../reducers/projectReducer.js";
import { setMode } from "../../reducers/workspaceReducer.js";

interface WorkspaceProps {
	// project: any;
}

/**
 * The workspace; where the project is rendered.
 */
export const Workspace: FC<WorkspaceProps> = ({}) => {
	// const [currentView, setCurrentView] = useState("chart"); // chart, edit, text?
	const currentMode = useSelector((state: any) => state.workspace.mode);
	const projects = useSelector((state: any) => state.workspace.projects);
	const currentProjectId = useSelector((state: any) => state.workspace.currentProjectId);

	const dispatch = useDispatch();

	// make no project found component?
	// if (!project) return null;

	// where editing mode is handled ?

	const chartView = (
		<Grid container>
			<Project blocks={projects[currentProjectId].blocks} />
			<Button onClick={() => dispatch(nextRow())} sx={{ backgroundColor: "white" }}>
				next row
			</Button>
			<Button onClick={() => dispatch(prevRow())} sx={{ backgroundColor: "white" }}>
				prev row
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

	const editView = // for editing an individual project
		(
			<Grid container>
				<Typography variant="h6">edit mode</Typography>
				<Button onClick={() => dispatch(setMode("chart"))}>finish editing</Button>
				<Project blocks={projects[currentProjectId].blocks} />
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
			<Typography variant="h6">{projects[currentProjectId].projectName}</Typography>
			{currentMode === "chart" ? <Button onClick={() => dispatch(setMode("edit"))}>edit</Button> : null}
			{currentMode === "chart" ? chartView : null}
			{/* {currentMode === "select" ? selectView : null} */}
			{currentMode === "edit" ? editView : null}
		</Grid>
	);
};
