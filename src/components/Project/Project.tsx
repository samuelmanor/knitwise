import { Grid } from "@mui/material";
import { FC, useState } from "react";
import { Block, BlockProps } from "../Block";
import { useSelector } from "react-redux";
import { SortableList } from "../Sortable/SortableList";

// export interface ProjectProps {}

/**
 * The project; made up of many blocks.
 */
export const Project: FC<{}> = () => {
	const mode = useSelector((state: any) => state.workspace.mode);
	const blocks = useSelector((state: any) => state.projects.project.blocks);

	const [draftBlockIndex, setDraftBlockIndex] = useState<number | null>(null); // the index of the block that is being edited

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
	 * Renders a block.
	 * @param block The block to render.
	 * @param i The index of the block.
	 */
	const renderBlock = (block: BlockProps, i: number) => {
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
	};

	return (
		<Grid
			container
			sx={{
				width: "fit-content",
				height: "fit-content",
				mt: 2,
				mb: mode === "chart" ? 5 : 10,
				pl: mode === "chart" ? 12 : 8,
				pr: mode === "chart" ? 12 : 8,
				flexWrap: "nowrap",
				gap: 2,
				alignItems: "flex-end",
			}}
		>
			{mode === "dragBlocks" ? (
				<SortableList
					items={blocks.map((item, i) => ({
						id: `${i}`,
						item: renderBlock(item, i),
					}))}
					direction="horizontal"
				/>
			) : (
				blocks.map((block, i) => renderBlock(block, i))
			)}
		</Grid>
	);
};
