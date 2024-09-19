import { Button, Grid, Typography, useTheme } from "@mui/material";
import { FC } from "react";
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
	);
};
