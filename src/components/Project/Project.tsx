import { Grid, IconButton, Tooltip, useTheme } from "@mui/material";
import { FC, useState } from "react";
import { Block, BlockProps } from "../Block";
import { useDispatch, useSelector } from "react-redux";
import { SortableList } from "../Sortable/SortableList";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { deleteBlock } from "../../reducers/projectReducer";

// export interface ProjectProps {}

/**
 * The project; made up of many blocks.
 */
export const Project: FC<{}> = () => {
	// const currentRow = useSelector((state: any) => state.projects.currentRow);
	const mode = useSelector((state: any) => state.workspace.mode);
	const blocks = useSelector((state: any) => state.projects.project.blocks);

	// const [items, setItems] = useState(blocks);

	// useEffect(() => {
	// 	setItems(blocks);
	// }, [blocks]);

	const [draftBlockIndex, setDraftBlockIndex] = useState<number | null>(null); // the index of the block that is being edited
	const [dragBlocksEnabled, setDragBlocksEnabled] = useState(false);

	const dispatch = useDispatch();
	const theme = useTheme();

	if (!blocks) return <div>no blocks found</div>;

	/**
	 * Finds the tallest block in the project-- used to calculate the position for individual blocks when working rows.
	 * @returns The index of the tallest block.
	 */
	const getTallestBlock = () => {
		// move to block component?
		let tallestBlock = 0;
		let index = 0;
		blocks.forEach((block, i) => {
			if (block.stitches.length > tallestBlock) {
				tallestBlock = block.stitches.length;
				index = i;
			}
		});
		return index;
	};

	/**
	 * Opens the block editor.
	 */
	// const handleEdit = (blockIndex: number) => {
	// 	setShowBlockEditor(true);
	// 	setCurrentDraftBlock(blockIndex);
	// };

	/**
	 * Adds a new block to the project at either the beginning or end of the project. //=> todo: add feat to add block between already existing blocks
	 * @param blockName The name of the block to be added.
	 * @param stitches The stitches for the block to be added.
	 */
	// const handleAddNewBlock = (blockName: string, stitches: BlockProps | [[]]) => {
	// 	dispatch(
	// 		addBlock({
	// 			blockName,
	// 			stitches,
	// 			blockIndex: currentDraftBlock === 0 ? 0 : blocks.length,
	// 		}),
	// 	);

	// 	setShowBlockMenu(false);
	// 	setShowBlockEditor(!showBlockSearch);
	// 	setShowBlockSearch(false);
	// };

	const project = blocks.map((block: BlockProps, i: number) => {
		// when a specific block is being edited, only show that block
		if (mode === "editBlock" && draftBlockIndex !== null && draftBlockIndex !== i) return null;

		return (
			<Block
				index={i}
				currentBlockRow={block.currentBlockRow}
				blockName={block.blockName}
				stitches={block.stitches}
				tallestBlockIndex={getTallestBlock()}
				draftBlockIndex={draftBlockIndex}
				setDraftBlockIndex={setDraftBlockIndex}
			/>
		);
	});

	return (
		<Grid
			container
			sx={{
				width: "fit-content",
				height: "fit-content",
				mt: 2,
				mb: mode === "chart" ? 5 : 10,
				pl: 5,
				pr: 5,
				flexWrap: "nowrap",
				gap: 2,
				border: "2px solid green",
				alignItems: "flex-end",
			}}
		>
			{mode === "edit" ? (
				<SortableList
					items={blocks.map((item, i) => ({
						id: `${i}`,
						item: (
							<Block
								index={i}
								currentBlockRow={item.currentBlockRow}
								blockName={item.blockName}
								stitches={item.stitches}
								tallestBlockIndex={getTallestBlock()}
								draftBlockIndex={draftBlockIndex}
								setDraftBlockIndex={setDraftBlockIndex}
							/>
						),
					}))}
					direction="horizontal"
				/>
			) : (
				project
			)}
		</Grid>
	);
};
