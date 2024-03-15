import { Button, IconButton, Grid, Typography, TextField, Box, useTheme } from "@mui/material";
import { FC, useRef, useState } from "react";
import { Row } from "../Row";
import { StitchProps } from "../Stitch";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined, SaveOutlined } from "@mui/icons-material";
import { BlockEditor } from "../BlockEditor";
import { editBlockName } from "../../reducers/projectReducer";

export interface BlockProps {
	blockName: string;
	stitches: StitchProps[][];
	index?: number;
	tallestBlockIndex?: number;
}

/**
 * A block of the pattern; made up of many rows.
 * @param blockName The name of the block.
 * @param stitches The rows of stitches to be rendered.
 * @param index The index of the block.
 * @param tallestBlockIndex The index of the tallest block in the project - used to calculate padding for individual blocks.
 */
export const Block: FC<BlockProps> = ({ blockName, stitches, index, tallestBlockIndex }) => {
	const currentProject = useSelector((state: any) => state.projects.project);
	const currentRow = useSelector((state: any) => state.projects.currentRow);
	const currentBlockRow = useSelector((state: any) => state.projects.project.blocks[index].currentBlockRow);
	const mode = useSelector((state: any) => state.workspace.mode);

	const [showNameEditor, setShowNameEditor] = useState(false);
	const [blockNameDraft, setBlockNameDraft] = useState(blockName);

	const baseRowRef = useRef<HTMLDivElement>(null);

	const dispatch = useDispatch();
	const theme = useTheme();

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
			const tallestBlockPosition =
				currentProject.blocks[tallestBlockIndex].currentBlockRow * baseRowRef.current.clientHeight;
			const currentBlockPosition = currentBlockRow * baseRowRef.current.clientHeight;

			return `${tallestBlockPosition - currentBlockPosition + 50}px`;
		}
	};

	const nameField = showNameEditor ? ( // on save, should it update the block's name in the createdBlocks array?
		<Grid container>
			<Grid item>
				<TextField value={blockNameDraft} onChange={e => setBlockNameDraft(e.target.value)} />
			</Grid>
			<Grid item>
				<IconButton
					onClick={() => {
						setShowNameEditor(false);
						dispatch(editBlockName({ blockIndex: index, blockName: blockNameDraft }));
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

	/**
	 * Calculates the width of the block based on the sum of all stitches' widths.
	 */
	const getBlockWidth = (): number => {
		let total: number = 0;
		stitches[0].forEach(stitch => (total += stitch.width));
		return total * 17;
	};

	if (!stitches) {
		return null; // make error block ?
	}

	return (
		<Grid
			container
			sx={{
				// border: "2px solid red",
				backgroundColor: theme.palette.background.paper,
				p: 1,
				borderTopRightRadius: "10px",
				borderTopLeftRadius: "10px",
				maxHeight: "100%",
				mb: baseRowRef.current ? handlePadding() : "50px",
				width: getBlockWidth(),
			}}
			data-testid={`block${blockName}${index}`}
		>
			<Grid
				container
				sx={{
					flexDirection: "column-reverse",
				}}
			>
				<Typography onClick={() => console.log(getBlockWidth())}>
					{mode === "chart" ? `current row: ${currentRow}` : null}
				</Typography>
				{/* <Typography onClick={() => console.log(stitches)}>{blockName}</Typography> */}
				{mode === "edit" ? (
					// <Grid container>{blockName}</Grid>
					<Grid container>{nameField}</Grid>
				) : (
					<Typography onClick={() => console.log(baseRowRef.current.offsetHeight)}>{blockName}</Typography>
				)}
				{stitches.map((row, i) => {
					return (
						<Box ref={i === 0 ? baseRowRef : null}>
							<Row
								key={`row${blockName}${i}`}
								row={row}
								highlightRow={currentBlockRow - 1 === i}
								rowIndex={i}
								showLeftRowMarker={index === 0 && currentRow % 2 === 0}
								showRightRowMarker={index === currentProject.blocks.length - 1 && currentRow % 2 === 1}
							/>
						</Box>
					);
				})}
			</Grid>
		</Grid>
	);
};
