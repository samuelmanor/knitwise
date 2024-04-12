import { FC, useState } from "react";
import { Button, Grid, IconButton, TextField, Typography, useTheme } from "@mui/material";
import { Project } from "../Project";
import { useDispatch, useSelector } from "react-redux";
import { setMode } from "../../reducers/workspaceReducer.js";
import { editProjectName } from "../../reducers/projectReducer.js";
import { EditOutlined, SaveOutlined } from "@mui/icons-material";
import { ProjectMenu } from "../ProjectMenu";

interface WorkspaceProps {}

/**
 * The workspace; where the project is rendered.
 */
export const Workspace: FC<WorkspaceProps> = () => {
	// const currentMode = useSelector((state: any) => state.workspace.mode);
	// const projectName = useSelector((state: any) => state.projects.name);

	// const [showProjectNameEditor, setShowProjectNameEditor] = useState(false);
	// const [projectNameDraft, setProjectNameDraft] = useState(projectName);

	// const dispatch = useDispatch();
	const theme = useTheme();

	// make no project found component?
	// if (!project) return null;

	// if (currentMode === "chart") {
	return (
		<>
			<Grid
				container
				sx={{
					border: "2px solid transparent",
					minHeight: "calc(100vh - 72px)",
					minWidth: "fit-content",
					justifyContent: "center",
					alignItems: "end",
					backgroundImage: theme.palette.background.default,
					overflowY: "scroll",
				}}
			>
				{/* <Grid container> */}
				<Project />
				{/* </Grid> */}
			</Grid>
			<Grid container sx={{ position: "fixed", bottom: 0, width: "100%" }}>
				<ProjectMenu />
			</Grid>
		</>
	);
	// }

	// if (currentMode === "edit") {
	// 	return (
	// 		// <Grid container>
	// 		// 	<Grid container>
	// 		// 		{showProjectNameEditor ? (
	// 		// 			<Grid container>
	// 		// 				<Grid item>
	// 		// 					<TextField
	// 		// 						value={projectNameDraft}
	// 		// 						onChange={e => setProjectNameDraft(e.target.value)}
	// 		// 					/>
	// 		// 				</Grid>
	// 		// 				<Grid item>
	// 		// 					<IconButton
	// 		// 						onClick={() => {
	// 		// 							dispatch(editProjectName(projectNameDraft));
	// 		// 							setShowProjectNameEditor(false);
	// 		// 						}}
	// 		// 					>
	// 		// 						<SaveOutlined />
	// 		// 					</IconButton>
	// 		// 				</Grid>
	// 		// 			</Grid>
	// 		// 		) : (
	// 		// 			<Grid container>
	// 		// 				<Grid item>
	// 		// 					<Typography>{projectName}</Typography>
	// 		// 				</Grid>
	// 		// 				<Grid item>
	// 		// 					<IconButton onClick={() => setShowProjectNameEditor(true)}>
	// 		// 						<EditOutlined />
	// 		// 					</IconButton>
	// 		// 				</Grid>
	// 		// 			</Grid>
	// 		// 		)}
	// 		// 	</Grid>
	// 		// 	<Grid container>
	// 		// 		<Typography variant="h6">edit mode</Typography>
	// 		// 		<Button onClick={() => dispatch(setMode("chart"))}>finish editing</Button>
	// 		// 		<Project />
	// 		// 	</Grid>
	// 		// </Grid>
	// 		// <Grid container>
	// 		// 	<Grid container>
	// 		// 		<Project />
	// 		// 	</Grid>
	// 		// 	<Grid container>
	// 		// 		<ProjectMenu />
	// 		// 	</Grid>
	// 		// </Grid>
	// 	);
	// }
};
