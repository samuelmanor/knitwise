import { Box, Button, Grid } from "@mui/material";
import { FC, useState } from "react";
import { Block } from "../Block";
import { useDispatch, useSelector } from "react-redux";
import { nextRow } from "../../reducers/projectReducer.js";

interface ProjectProps {
	project: Object[][];
}

/**
 * A project; made up of many blocks.
 * @param blocks The blocks to be rendered.
 */
export const Project: FC<ProjectProps> = ({ project }) => {
	// => to redux, as well as some kind of currentRow var to initialize block rows with
	// const [triggerNextRow, setTriggerNextRow] = useState(false);
	// const [triggerPrevRow, setTriggerPrevRow] = useState(false);

	const currentRow = useSelector((state: any) => state.projects.currentRow);
	const dispatch = useDispatch();

	const renderBlocks = () => {
		return project.map((block, i) => {
			return <Block key={i} block={block} />;
		});
	};

	return (
		<Grid
			container
			sx={{
				background: "green",
				border: "2px solid black",
				justifyContent: "center",
				alignItems: "flex-start",
				gap: 2,
				height: "70%",
				width: "70%",
				pt: 10,
				position: "absolute",
			}}
		>
			<Button onClick={() => dispatch(nextRow())}>next row</Button>
			<Box display={"flex"}>{renderBlocks()}</Box>
			<Box position={"absolute"} mt={21.5}>
				current row placement
			</Box>
			{/* <Button onClick={() => setTriggerPrevRow(true)}>prev row</Button> */}
		</Grid>
	);
};
