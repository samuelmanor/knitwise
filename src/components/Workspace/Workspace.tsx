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
		// maybe instead of each component mapping to the next, each component just does some css to
		// whatever its being passed and Project or Workspace maps everything in one go
		// so while thats happening, the "pattern" is being generated by appending to a string each
		// stitch.abbreviation <- since in this view here things are going to be displayed as ascii symbols
	};

	// const renderBlocks = block => {
	// 	return block.map((row, i: number) => {
	// 		return (
	// 			<Grid container onClick={() => console.log(row, i)}>
	// 				hi
	// 			</Grid>
	// 		);
	// 	});
	// };

	// const renderRows = row => {
	// 	return row.map((stitch, i: number) => {
	// 		return (
	// 			<Grid container onClick={() => console.log(stitch, i)}>
	// 				hi
	// 			</Grid>
	// 		);
	// 	});
	// };

	// const renderStitches = stitch => {
	// 	return stitch.map((stitch, i: number) => {
	// 		return (
	// 			<Grid container onClick={() => console.log(stitch, i)}>
	// 				hi
	// 			</Grid>
	// 		);
	// 	});
	// };

	// const mapProject = () => {
	// 	project.forEach((block, i) => {
	// 		console.log(`block ${i + 1}`);
	// 		block.forEach((row, i) => {
	// 			console.log(`row ${i + 1}`);
	// 			row.forEach(stitch => {
	// 				console.log(stitch.name);
	// 			});
	// 		});
	// 	});
	// };

	return (
		<Grid container>
			<Button>knitting mode {knittingMode ? "off" : "on"}</Button>
			<Project project={project} />
		</Grid>
	);
};
