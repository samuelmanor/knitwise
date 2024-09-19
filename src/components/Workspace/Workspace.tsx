import { FC } from "react";
import { Grid, Typography, useTheme } from "@mui/material";
import { Project } from "../Project";
import { ProjectMenu } from "../ProjectMenu";
import { useSelector } from "react-redux";
import { saveState } from "../../utils/localStorage";
import { testProject } from "../../utils/testProject";
import { Tutorial } from "../Tutorial";
import { Welcome } from "../Welcome";

interface WorkspaceProps {}

/**
 * The workspace; where the project is rendered.
 */
export const Workspace: FC<WorkspaceProps> = () => {
	const blocks = useSelector((state: any) => state.project.blocks);
	const showTutorial = useSelector((state: any) => state.project.settings.showTutorial);
	const showWelcome = useSelector((state: any) => state.project.settings.showWelcome);

	const theme = useTheme();

	// make no project found component?
	// if (!project) return null;

	// if (!project) return <Grid container>no project found! do tutorial // upload project</Grid>;

	// if no project, show tutorial
	// if (project.blocks.length === 0) return "this project is empty!";
	// else, show project

	return (
		<Grid container>
			<Grid
				container
				sx={{
					position: "fixed",
					// backgroundColor: theme.palette.primary.main,
					width: "100%",
					left: 0,
					right: 0,
					margin: "0 auto",
					marginTop: "18px",
					flexDirection: "row",
					justifyContent: "center",
					backgroundColor: theme.palette.primary.main,
					// borderBottom: `2px solid ${theme.palette.primary.main}`,
					alignItems: "center",
					paddingX: 2,
					pb: 0.5,
					// pt: showWelcome ? 15 : 0,
					display: showWelcome ? "none" : "",
				}}
			>
				<Grid item>
					<Typography
						variant="h1"
						sx={{
							color: theme.palette.text.secondary,
							userSelect: "none",
							cursor: "default",
						}}
					>
						knitwise
					</Typography>
				</Grid>
			</Grid>

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
							showWelcome: false,
						},
						blocks: [],
					})
				}
			>
				set blank w/ tutorial
			</div>
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
							showTutorial: false,
							showWelcome: true,
						},
						blocks: [],
					})
				}
			>
				set blank w/ welcome
			</div>
			<div onClick={() => console.log(blocks, "showWelcome", showWelcome, "showTutorial", showTutorial)}>log</div>
			<div onClick={() => console.log(testProject)}>test</div>

			{showWelcome ? (
				<Welcome />
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
			{showTutorial ? <Tutorial /> : null}
		</Grid>
	);
};
