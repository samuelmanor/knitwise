import { FC, useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { Project, ProjectProps } from "../Project";
import { StitchProps } from "../Stitch";
import { useDispatch, useSelector } from "react-redux";
import { BlockProps } from "../Block";
import { nextRow, prevRow } from "../../reducers/projectReducer.js";

interface WorkspaceProps {
	project: any;
}

/**
 * The workspace; where the project is rendered.
 * @param project The project to be rendered.
 */
export const Workspace: FC<WorkspaceProps> = ({ project }) => {
	// const [knittingMode, toggleKnittingMode] = useState(false);
	// const projects = useSelector((state: any) => state.projects);

	const dispatch = useDispatch();

	// make no project found component?
	if (!project) return null;

	// where editing mode is handled ?

	return (
		<Grid
			container
			justifyContent={"center"}
			// height={"90%"}
			// width={"90%"}
			border={"2px solid black"}
			// overflow={"scroll"}
			overflow={"scroll"}
		>
			{/* <Button>knitting mode {knittingMode ? "off" : "on"}</Button> */}
			<Project blocks={project.blocks} />
			<Button onClick={() => dispatch(nextRow())} sx={{ backgroundColor: "white" }}>
				next row
			</Button>
			<Button onClick={() => dispatch(prevRow())} sx={{ backgroundColor: "white" }}>
				prev row
			</Button>
		</Grid>
	);
};
