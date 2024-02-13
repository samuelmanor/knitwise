import { Button, IconButton, Grid, Typography, TextField } from "@mui/material";
import { FC, useState } from "react";
import { Row } from "../Row";
import { StitchProps } from "../Stitch";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined, SaveOutlined } from "@mui/icons-material";
import { BlockEditor } from "../BlockEditor";
import { updateBlockName } from "../../reducers/projectReducer";

export interface BlockProps {
	blockName: string;
	stitches: StitchProps[][];
	index?: number;
	tallestBlockIndex?: number;
}

/**
 * A block of the pattern; made up of many rows.
 * @param stitches The rows of stitches to be rendered.
 * @param index The index of the block.
 * @param tallestBlockIndex The index of the tallest block in the project - used to calculate padding for individual blocks.
 */
export const Block: FC<BlockProps> = ({ blockName, stitches, index, tallestBlockIndex }) => {
	const currentRow = useSelector((state: any) => state.projects.currentRow);
	const numOfBlocks = useSelector((state: any) => state.projects.project.blocks.length);
	const currentBlockRow = useSelector((state: any) => state.projects.project.blocks[index].currentBlockRow);
	const tallestBlock = useSelector((state: any) => state.projects.project.blocks[tallestBlockIndex]);
	const currentMode = useSelector((state: any) => state.workspace.mode);
	const [showNameEditor, setShowNameEditor] = useState(false);
	const [blockNameDraft, setBlockNameDraft] = useState(blockName);

	const dispatch = useDispatch();

	/**
	 * Calculates the padding for the block.
	 */
	const handlePadding = () => {
		const firstRow = currentRow === 1 && currentBlockRow === 1;
		if (index === tallestBlockIndex || firstRow) {
			// on the first row, all blocks are aligned
			return "50px";
		} else {
			// a block's position is relative to the current row of both the tallest block and the current block
			const tallestBlockPosition = tallestBlock.currentBlockRow * 43;
			const currentBlockPosition = currentBlockRow * 43;
			return `${tallestBlockPosition - currentBlockPosition + 50}px`;
		}
	};

	const nameField = showNameEditor ? (
		<Grid container>
			<Grid item>
				<TextField value={blockNameDraft} onChange={e => setBlockNameDraft(e.target.value)} />
			</Grid>
			<Grid item>
				<IconButton
					onClick={() => {
						setShowNameEditor(false);
						dispatch(updateBlockName({ blockIndex: index, blockName: blockNameDraft }));
					}}
				>
					<SaveOutlined />
				</IconButton>
			</Grid>
		</Grid>
	) : (
		<Grid container>
			<Grid item>
				<Typography>{blockName}</Typography>
			</Grid>
			<Grid item>
				<IconButton onClick={() => setShowNameEditor(true)}>
					<EditOutlined />
				</IconButton>
			</Grid>
		</Grid>
	);

	if (!stitches) {
		return null; // make error block ?
	}

	return (
		<Grid
			container
			sx={{
				// border: "2px solid red",
				backgroundColor: "rgba(0,0,0,0.3)",
				maxHeight: "100%",
				mb: handlePadding(),
			}}
			data-testid={`block${index}`} // todo: change this to use the block's name
			// onClick={() => console.log(currentBlockRow)}
		>
			<Grid
				container
				sx={{
					flexDirection: "column-reverse",
				}}
			>
				<Typography>{currentMode === "chart" ? `current row: ${currentRow}` : null}</Typography>
				{/* <Typography onClick={() => console.log(stitches)}>{blockName}</Typography> */}
				{currentMode === "edit" ? (
					// <Grid container>{blockName}</Grid>
					<Grid container>{nameField}</Grid>
				) : (
					<Typography onClick={() => console.log(stitches)}>{blockName}</Typography>
				)}
				{stitches.map((row, i) => {
					return (
						<Row
							key={`row${i}`}
							row={row}
							highlightRow={currentBlockRow - 1 === i}
							rowIndex={i}
							showLeftRowMarker={index === 0 && currentRow % 2 === 0}
							showRightRowMarker={index === numOfBlocks - 1 && currentRow % 2 === 1}
						/>
					);
				})}
			</Grid>
		</Grid>
	);
};
