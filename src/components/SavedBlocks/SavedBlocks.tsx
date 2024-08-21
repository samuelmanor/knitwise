import { Grid, Modal, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Block, BlockProps } from "../Block";
import { addBlock } from "../../reducers/projectReducer";

interface SavedBlocksProps {
	show: boolean;
	close: () => void;
}

/**
 * Displays a list of saved blocks that can be added to the project.
 * @param show Whether the modal is open.
 * @param close The function to close the modal.
 */
export const SavedBlocks: FC<SavedBlocksProps> = ({ show, close }) => {
	const blocks = useSelector((state: any) => state.workspace.savedBlocks);

	const theme = useTheme();
	const dispatch = useDispatch();

	/**
	 * Adds a new block to the project and scrolls to it.
	 */
	const handleAddBlock = (block: BlockProps) => {
		close();
		dispatch(addBlock(block));

		setTimeout(() => {
			window.scrollTo({ left: 100000, behavior: "smooth" });
		}, 10);
	};

	return (
		<Modal open={show} onClose={close}>
			<Grid
				container
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					backgroundColor: theme.palette.primary.dark,
					width: "fit-content",
					transform: "translate(-50%, -50%)",
					padding: 1,
					borderRadius: "5px",
				}}
			>
				<Typography variant="h3" sx={{ color: theme.palette.text.secondary }}>
					saved blocks
				</Typography>
				<Grid container sx={{ gap: 1, ml: 1 }}>
					{blocks.map((block: BlockProps, i: number) => (
						<Grid item onClick={() => handleAddBlock(block)} key={`savedBlock${i}`}>
							<Block
								index={block.index}
								currentBlockRow={null}
								blockName={block.blockName}
								stitches={block.stitches}
							/>
						</Grid>
					))}
				</Grid>
			</Grid>
		</Modal>
	);
};
