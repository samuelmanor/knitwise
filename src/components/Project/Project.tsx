import { Box, Button, Grid } from "@mui/material";
import { FC, ReactElement, useEffect, useState } from "react";
import { Block, BlockProps } from "../Block";
import { useDispatch, useSelector } from "react-redux";
import { nextRow } from "../../reducers/projectReducer.js";

export interface ProjectProps {
	projectRow: number;
	blocks: {
		block1?: BlockProps;
		block2?: BlockProps;
		block3?: BlockProps;
		block4?: BlockProps;
		block5?: BlockProps;
	};
}

/**
 * A project; made up of many blocks.
 * @param blocks The blocks to be rendered.
 */
export const Project: FC<ProjectProps> = ({ projectRow, blocks }) => {
	// => to redux, as well as some kind of currentRow var to initialize block rows with
	// const [triggerNextRow, setTriggerNextRow] = useState(false);
	// const [triggerPrevRow, setTriggerPrevRow] = useState(false);
	// const [blocks, setBlocks] = useState<ReactElement[]>([]);

	const currentRow = useSelector((state: any) => state.projects.currentRow);
	const dispatch = useDispatch();

	// const renderBlocks = () => {
	// 	return project.map((block, i) => {
	// 		return <Block key={i} block={block} />;
	// 	});
	// };

	/*

	hypothetical:
	limit blocks to 5 per project
	make placeholder slots inside project, then map each block into them
	each placeholder block is positioned absolutely
	use that to shift the blocks up and down depending on current row

	*/

	const BlockContainer = ({ block }) => {
		return (
			<Grid container>
				<Block currentRow={block.currentRow} stitches={block.stitches} />
			</Grid>
		);
	};

	return (
		<Grid
			container
			sx={{
				background: "green",
				border: "2px solid black",
				// justifyContent: "center",
				// alignItems: "flex-start",
				// gap: 2,
				// height: "70%",
				// width: "70%",
				// pt: 10,
				// position: "absolute",
			}}
		>
			{/* <Button onClick={() => dispatch(nextRow())}>next row</Button> */}
			{/* <Box display={"flex"}>{renderBlocks()}</Box>
			<Box position={"absolute"} mt={21.5}>
				current row placement
			</Box> */}
			{/* <Button onClick={() => setTriggerPrevRow(true)}>prev row</Button> */}
			<BlockContainer block={blocks.block1} />
			<BlockContainer block={blocks.block2} />
			<BlockContainer block={blocks.block3} />
			<BlockContainer block={blocks.block4} />
			<BlockContainer block={blocks.block5} />
		</Grid>
	); // blocks will be positioned absolutely
};
