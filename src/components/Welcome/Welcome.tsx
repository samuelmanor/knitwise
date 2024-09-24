import { Grid, Typography, useTheme } from "@mui/material";
import { FC, useEffect } from "react";
import { initializeProject } from "../../reducers/projectReducer";
import { useDispatch } from "react-redux";
import { testProject } from "../../utils/testProject";

interface WelcomeProps {}

/**
 * The welcome screen; where the user can choose to upload a project or start a tutorial.
 */
export const Welcome: FC<WelcomeProps> = () => {
	const theme = useTheme();
	const dispatch = useDispatch();

	/**
	 * Starts the tutorial.
	 */
	const startTutorial = () => {
		dispatch(
			initializeProject({
				...testProject,
				settings: { ...testProject.settings, showTutorial: true, showWelcome: false },
			}),
		);
	};

	/**
	 * On file upload, reads the project file and initializes the project with it.
	 */
	useEffect(() => {
		const input = document.getElementById("project-file-upload") as HTMLInputElement;
		input.addEventListener("change", e => {
			// read the file
			const reader = new FileReader();
			reader.onload = function (e) {
				// turn the file into a JSON object
				const project = JSON.parse(e.target.result as string);

				dispatch(
					initializeProject({
						...project,
						settings: { ...project.settings, showWelcome: false, showTutorial: false },
					}),
				);
			};
			reader.readAsText((e.target as HTMLInputElement).files[0]);
		});
	}, []);

	return (
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
			<Typography variant="h1" sx={{ fontSize: "7rem", color: theme.palette.text.secondary, userSelect: "none" }}>
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
					<label htmlFor="project-file-upload">
						<Typography
							sx={{
								"p": 1,
								"cursor": "pointer",
								"backgroundColor": theme.palette.text.secondary,
								"color": theme.palette.primary.main,
								"border": "2px solid transparent",
								"borderRadius": "5px",
								"fontSize": "1rem",
								"fontWeight": "bold",
								"&:hover": {
									backgroundColor: theme.palette.primary.main,
									color: theme.palette.text.secondary,
									border: `2px solid ${theme.palette.text.secondary}`,
								},
							}}
						>
							upload project
						</Typography>
					</label>
					<input type="file" style={{ display: "none" }} id="project-file-upload" accept=".json" />
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
					<Typography
						onClick={startTutorial}
						sx={{
							"p": 1,
							"cursor": "pointer",
							"backgroundColor": theme.palette.text.secondary,
							"color": theme.palette.primary.main,
							"border": "2px solid transparent",
							"borderRadius": "5px",
							"fontSize": "1rem",
							"fontWeight": "bold",
							"&:hover": {
								backgroundColor: theme.palette.primary.main,
								color: theme.palette.text.secondary,
								border: `2px solid ${theme.palette.text.secondary}`,
							},
						}}
					>
						start tutorial
					</Typography>
				</Grid>
			</Grid>
		</Grid>
	);
};
