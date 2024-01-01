import { Grid } from "@mui/material";
import { FC } from "react";
import { Block } from "../Block";

interface ProjectProps {
	blocks: JSX.Element[][][]; // takes an array of Block components
}

export const Project: FC<ProjectProps> = ({ blocks }) => {
	return (
		<Grid container onClick={() => console.log(blocks)} sx={{}}>
			{blocks.map((block, i) => {
				return <Block key={`${i}${block}`} rows={block} />;
			})}
		</Grid>
	);
};
