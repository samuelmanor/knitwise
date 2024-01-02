import { Grid } from "@mui/material";
import { FC } from "react";
import { Block } from "../Block";

interface ProjectProps {
	// blocks: JSX.Element[][][]; // takes an array of Block components
	project: Object[][];
}

/**
 * A project; made up of many blocks.
 * @param blocks The blocks to be rendered.
 */
export const Project: FC<ProjectProps> = ({ project }) => {
	const currentRow = 2; // => into redux state at some point

	// const blocks = project.forEach(block => {
	// 	return <div onClick={() => console.log(block)}>block</div>;
	// });

	const renderBlocks = () => {
		return project.map((block, i) => {
			return <Block key={i} block={block} />;
		});
	};

	return (
		// <Grid container onClick={() => console.log(blocks)} sx={{ backgroundColor: "green", width: "1000px" }}>
		// 	{blocks.map((block, i) => {
		// 		return <Block key={`${i}${block}`} rows={block} currentRow={currentRow} />;
		// 	})}
		// </Grid>
		<Grid container sx={{ background: "green", justifyContent: "center", gap: 2 }}>
			{renderBlocks()}
		</Grid>
	);
};
