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

	// make no project found component?
	if (!project) return null;

	const getPattern = () => {
		const pattern = "";
	};

	return (
		<Grid container justifyContent={"center"} height={"100%"} width={"100%"} mt={"10%"}>
			{/* <Button>knitting mode {knittingMode ? "off" : "on"}</Button> */}
			<Project project={project} />
		</Grid>
	);
};
