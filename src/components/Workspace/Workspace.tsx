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
				}}
			>
				<Project />
			</Grid>
			<Grid container sx={{ position: "fixed", bottom: 0, width: "100%" }}>
				<ProjectMenu />
			</Grid>
		</>
	);
};
