import { FC, useState } from "react";
import { Button, Grid } from "@mui/material";
import { Project } from "../Project";
import { StitchProps } from "../Stitch";

export interface WorkspaceProps {
	project: StitchProps[][][];
}

/**
 * The workspace; where the project is rendered.
 * @param project The project to be rendered.
 */
export const Workspace: FC<WorkspaceProps> = ({ project }) => {
	const [knittingMode, toggleKnittingMode] = useState(false);

	if (!project) return null;

	const getPattern = () => {
		const pattern = "";
	};

	return (
		<Grid container>
			<Button>knitting mode {knittingMode ? "off" : "on"}</Button>
			<Project project={project} />
		</Grid>
	);
};
