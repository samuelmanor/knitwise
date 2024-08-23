import { Grid, useTheme } from "@mui/material";
import { FC, useState } from "react";
import { Block, BlockProps } from "../Block";
import { useSelector } from "react-redux";
import { SortableList } from "../Sortable/SortableList";

// export interface ProjectProps {}

/**
 * The project; made up of many blocks.
 */
export const Project: FC<{}> = () => {
	const mode = useSelector((state: any) => state.project.mode);
	const blocks = useSelector((state: any) => state.project.blocks);

	const [draftBlockIndex, setDraftBlockIndex] = useState<number | null>(null); // the index of the block that is being edited

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
	 * Renders a block.
	 * @param block The block to render.
	 * @param i The index of the block.
	 */
	const renderBlock = (block: BlockProps, i: number, key: string) => {
		// when a specific block is being edited, only show that block
		if (mode === "editBlock" && draftBlockIndex !== null && draftBlockIndex !== i) return null;

		return (
			<Block
				key={key}
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
				mb: mode === "edit" ? 14 : 10,
				flexWrap: "nowrap",
				gap: 2,
				alignItems: "flex-end",
				paddingX: mode === "chart" ? 12 : 2,
				paddingY: mode === "dragBlocks" ? 1 : 0,
				border: mode === "dragBlocks" ? `1rem solid ${theme.palette.primary.light}` : "none",
				borderImage:
					mode === "dragBlocks"
						? `repeating-linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.primary.light} 5px, ${theme.palette.primary.main} 6px, ${theme.palette.primary.main} 15px, ${theme.palette.primary.light} 16px, ${theme.palette.primary.light} 20px) 20/1rem`
						: "none",
			}}
		>
			{mode === "dragBlocks" ? (
				<SortableList
					items={blocks.map((item, i) => ({
						id: `${i}`,
						item: renderBlock(item, i, `block${i}`),
						key: i,
					}))}
					direction="horizontal"
				/>
			) : (
				blocks.map((block, i) => renderBlock(block, i, `block${i}`))
			)}
		</Grid>
	);
};
