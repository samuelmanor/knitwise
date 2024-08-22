import { Grid, IconButton, Modal, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Block, BlockProps } from "../Block";
import { addBlock } from "../../reducers/projectReducer";
import { AddOutlined } from "@mui/icons-material";

interface SavedBlocksProps {
	// show: boolean;
	// close: () => void;
}

/**
 * Displays a list of saved blocks that can be added to the project.
 * @param show Whether the modal is open.
 * @param close The function to close the modal.
 */
export const AddBlock: FC<SavedBlocksProps> = ({}) => {
	const existingBlocks = useSelector((state: any) => state.projects.project.blocks);
	const uniqueBlocks = existingBlocks.filter((block: BlockProps, i: number) => {
		return existingBlocks.findIndex((b: BlockProps) => b.blockName === block.blockName) === i;
	});

	const theme = useTheme();
	const dispatch = useDispatch();

	/**
	 * Adds a new block to the project and scrolls to it.
	 */
	const handleAddBlock = (block: BlockProps) => {
		// close();
		// dispatch(addBlock(block));
		// setTimeout(() => {
		// 	window.scrollTo({ left: 100000, behavior: "smooth" });
		// }, 10);
	};

	return (
		// <Modal open={show} onClose={close}>
		// 	<Grid
		// 		container
		// 		sx={{
		// 			position: "absolute",
		// 			top: "50%",
		// 			left: "50%",
		// 			backgroundColor: theme.palette.primary.dark,
		// 			width: "fit-content",
		// 			transform: "translate(-50%, -50%)",
		// 			padding: 1,
		// 			borderRadius: "5px",
		// 		}}
		// 	>
		// 		<Typography variant="h3" sx={{ color: theme.palette.text.secondary }}>
		// 			choose block to copy
		// 		</Typography>
		// 		<Grid container sx={{ gap: 1, ml: 1 }} onClick={() => console.log(uniqueBlocks)}>
		// 			{uniqueBlocks.map((block, i) => (
		// 				<Grid item onClick={() => handleAddBlock(block)} key={i}>
		// 					{block.blockName}
		// 				</Grid>
		// 			))}
		// 		</Grid>
		// 	</Grid>
		// </Modal>
		<IconButton
			aria-describedby="newBlockDialog"
			// onClick={e => {
			// 	setShowNewBlockDialog(true);
			// 	setDialogAnchor(e.currentTarget);
			// }}
			// sx={{ color: theme.palette.text.secondary, display: mode === "edit" ? "flex" : "none" }}
		>
			<AddOutlined fontSize="large" />
		</IconButton>
	);
};

{
	/* <Tooltip
					title={<div style={{ display: showNewBlockDialog ? "none" : "inherit" }}>add block</div>}
					componentsProps={{
						tooltip: {
							sx: {
								backgroundColor: theme.palette.primary.main,
								color: theme.palette.text.secondary,
								fontSize: "1.2rem",
								borderBottomLeftRadius: 0,
								borderBottomRightRadius: 0,
							},
						},
					}}
					PopperProps={{
						modifiers: [
							{
								name: "offset",
								options: {
									offset: [0, showNewBlockDialog ? -20 : -8],
								},
							},
						],
					}}
				>
					<IconButton
						aria-describedby="newBlockDialog"
						onClick={e => {
							setShowNewBlockDialog(true);
							setDialogAnchor(e.currentTarget);
						}}
						sx={{ color: theme.palette.text.secondary, display: mode === "edit" ? "flex" : "none" }}
					>
						<AddOutlined fontSize="large" />
					</IconButton>
				</Tooltip>
				<Popper id="newBlockDialog" open={showNewBlockDialog} anchorEl={dialogAnchor}>
					<ClickAwayListener onClickAway={() => setShowNewBlockDialog(false)}>
						<Fade in={showNewBlockDialog}>
							<Grid
								container
								sx={{
									backgroundColor: theme.palette.primary.main,
									paddingY: 2,
									flexDirection: "row",
									color: theme.palette.text.secondary,
									justifyContent: "center",
									borderTopLeftRadius: "5px",
									borderTopRightRadius: "5px",
								}}
							>
								<Button
									sx={{
										color: theme.palette.text.secondary,
										borderRadius: "5px",
										width: "40%",
									}}
									onClick={handleAddBlock}
								>
									<Typography variant="h4">add empty block</Typography>
								</Button>
								<Button
									sx={{ color: theme.palette.text.secondary, borderRadius: "5px", width: "40%" }}
									onClick={() => {
										setShowNewBlockDialog(false);
										setShowSavedBlocks(true);
									}}
								>
									<Typography variant="h4">copy existing block</Typography>
								</Button>
							</Grid>
						</Fade>
					</ClickAwayListener>
				</Popper> */
}
