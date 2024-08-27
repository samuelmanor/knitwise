import { FC } from "react";
import { Button, Grid, Typography, useTheme } from "@mui/material";
import { Project } from "../Project";
import { ProjectMenu } from "../ProjectMenu";
import { useSelector } from "react-redux";
import { saveState } from "../../utils/localStorage";
import { testProject } from "../../utils/testProject";
import { Tutorial } from "../Tutorial";

interface WorkspaceProps {}

/**
 * The workspace; where the project is rendered.
 */
export const Workspace: FC<WorkspaceProps> = () => {
	const blocks = useSelector((state: any) => state.project.blocks);
	const showTutorial = useSelector((state: any) => state.project.settings.showTutorial);

	const theme = useTheme();

	// make no project found component?
	// if (!project) return null;

	// if (!project) return <Grid container>no project found! do tutorial // upload project</Grid>;

	// if no project, show tutorial
	// if (project.blocks.length === 0) return "this project is empty!";
	// else, show project

	return (
		<Grid container>
			{/* <Grid
				container
				sx={{
					position: "fixed",
					backgroundColor: theme.palette.primary.main,
					width: { xs: "80%", sm: "70%" },
					left: 0,
					right: 0,
					margin: "0 auto",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Grid item>knitwise</Grid>
			</Grid> */}
			<div onClick={() => saveState(testProject)}>set example</div>
			<div
				onClick={() =>
					saveState({
						projectName: "test project 1",
						currentProjectRow: 1,
						mode: "chart",
						settings: {
							theme: "system",
							stitchDisplay: "symbol",
							stitchTipMode: "hover",
							directionsOverlayMode: "simple",
							showDeleteRowConfirmation: true,
							showDeleteBlockConfirmation: true,
							autoCloseStitchMenu: true,
							showTutorial: true,
						},
						blocks: [],
					})
				}
			>
				set blank w/ tutorial
			</div>
			<div onClick={() => console.log(blocks)}>log</div>

			{showTutorial && blocks.length === 0 ? (
				<Tutorial />
			) : (
				<>
					<Grid
						container
						sx={{
							pt: 2,
							minWidth: "fit-content",
							justifyContent: "center",
							alignItems: "end",
							backgroundImage: theme.palette.background.default,
							minHeight: "calc(100vh - 72px)",
						}}
					>
						<Project />
					</Grid>
					<Grid container sx={{ position: "fixed", bottom: 0, width: "100%" }}>
						<ProjectMenu />
					</Grid>
				</>
			)}
			<Grid container id="tutorialtest">
				tutorial
			</Grid>
		</Grid>
	);
};
