import { FC } from "react";
import { Grid, useTheme } from "@mui/material";
import { Project } from "../Project";
import { ProjectMenu } from "../ProjectMenu";

interface WorkspaceProps {}

/**
 * The workspace; where the project is rendered.
 */
export const Workspace: FC<WorkspaceProps> = () => {
	const theme = useTheme();

	// make no project found component?
	// if (!project) return null;

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
			<Grid
				container
				sx={{
					pt: 2,
					minHeight: "calc(100vh - 72px)",
					minWidth: "fit-content",
					justifyContent: "center",
					alignItems: "end",
					backgroundImage: theme.palette.background.default,
				}}
			>
				<Project />
			</Grid>
			<Grid container sx={{ position: "fixed", bottom: 0, width: "100%" }}>
				<ProjectMenu />
			</Grid>
		</Grid>
	);
};
