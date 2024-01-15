import { Box, Button, Grid } from "@mui/material";
import { FC, useState } from "react";
import { Block } from "../Block";

interface ProjectProps {
	project: Object[][];
}

/**
 * A project; made up of many blocks.
 * @param blocks The blocks to be rendered.
 */
export const Project: FC<ProjectProps> = ({ project }) => {
	const [triggerNextRow, setTriggerNextRow] = useState(false);
	const [triggerPrevRow, setTriggerPrevRow] = useState(false);

	const renderBlocks = () => {
		return project.map((block, i) => {
			return (
				<Block
					key={i}
					block={block}
					triggerNextRow={triggerNextRow}
					setTriggerNextRow={setTriggerNextRow}
					triggerPrevRow={triggerPrevRow}
					setTriggerPrevRow={setTriggerPrevRow}
				/>
			);
		});
	};

	return (
		<Grid
			container
			sx={{
				background: "green",
				justifyContent: "center",
				alignItems: "center",
				gap: 2,
				height: "70%",
				width: "70%",
			}}
		>
			<Button onClick={() => setTriggerNextRow(true)}>next row</Button>
			<Box display={"flex"}>{renderBlocks()}</Box>
			<Button onClick={() => setTriggerPrevRow(true)}>prev row</Button>
		</Grid>
	);
};
