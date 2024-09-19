import { FC, useState } from "react";
import { Button, Grid, Typography, useTheme } from "@mui/material";
import { Project } from "../Project";
import { ProjectMenu } from "../ProjectMenu";
import { useDispatch, useSelector } from "react-redux";
import { saveState } from "../../utils/localStorage";
import { testProject } from "../../utils/testProject";
import { Tutorial } from "../Tutorial";
import { initializeProject } from "../../reducers/projectReducer";

interface WorkspaceProps {}

/**
 * The workspace; where the project is rendered.
 */
export const Workspace: FC<WorkspaceProps> = () => {
	const blocks = useSelector((state: any) => state.project.blocks);
	const showTutorial = useSelector((state: any) => state.project.settings.showTutorial);
	const showWelcome = useSelector((state: any) => state.project.settings.showWelcome);

	const theme = useTheme();
	const dispatch = useDispatch();

	// make no project found component?
	// if (!project) return null;

	// if (!project) return <Grid container>no project found! do tutorial // upload project</Grid>;

	// if no project, show tutorial
	// if (project.blocks.length === 0) return "this project is empty!";
	// else, show project

	const startTutorial = () => {
		dispatch(
			initializeProject({
				...testProject,
				settings: { ...testProject.settings, showTutorial: true, showWelcome: false },
			}),
		);
		// dispatch(changeSetting("showTutorial", true));
		// dispatch(changeSetting("showWelcome", false));
	};

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
				<Grid
					container
					sx={{
						backgroundColor: theme.palette.primary.main,
						height: "100vh",
						width: "100%",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Typography
						variant="h1"
						sx={{ fontSize: "7rem", color: theme.palette.text.secondary, userSelect: "none" }}
					>
						knitwise
					</Typography>
					<Typography variant="h3" sx={{ color: theme.palette.text.secondary }}>
						easily create and work cable knit patterns
					</Typography>
					<Grid item container sx={{ justifyContent: "center", width: "fit-content", mt: 4, gap: 5 }}>
						<Grid
							item
							sx={{
								width: "250px",
								display: "flex",
								alignItems: "center",
								flexDirection: "column",
								gap: 1,
							}}
						>
							<Typography
								sx={{
									textAlign: "center",
									p: 0,
									color: theme.palette.text.secondary,
									fontSize: "1rem",
								}}
								variant="h4"
							>
								already have a project file? <br />
								continue where you left off
							</Typography>
							<Button
								sx={{
									"backgroundColor": theme.palette.text.secondary,
									"color": theme.palette.primary.main,
									"border": "2px solid transparent",
									"fontSize": "1rem",
									"&:hover": {
										backgroundColor: theme.palette.primary.main,
										color: theme.palette.text.secondary,
										border: `2px solid ${theme.palette.text.secondary}`,
									},
								}}
							>
								upload project
							</Button>
						</Grid>
						<Grid item sx={{ display: "flex", alignItems: "center" }}>
							<Typography sx={{ color: theme.palette.text.secondary, fontSize: "1rem" }} variant="h4">
								or
							</Typography>
						</Grid>
						<Grid
							item
							sx={{
								width: "250px",
								display: "flex",
								alignItems: "center",
								flexDirection: "column",
								gap: 1,
							}}
						>
							<Typography
								sx={{
									textAlign: "center",
									p: 0,
									color: theme.palette.text.secondary,
									fontSize: "1rem",
								}}
								variant="h4"
							>
								new to knitwise? <br />
								learn how to use it
							</Typography>
							<Button
								sx={{
									"backgroundColor": theme.palette.text.secondary,
									"color": theme.palette.primary.main,
									"border": "2px solid transparent",
									"fontSize": "1rem",
									"&:hover": {
										backgroundColor: theme.palette.primary.main,
										color: theme.palette.text.secondary,
										border: `2px solid ${theme.palette.text.secondary}`,
									},
								}}
								onClick={startTutorial}
							>
								start tutorial
							</Button>
						</Grid>
					</Grid>
				</Grid>
			) : null}
			{showWelcome === false ? (
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
			) : null}
			{showTutorial ? <Tutorial /> : null}
		</Grid>
	);
};
