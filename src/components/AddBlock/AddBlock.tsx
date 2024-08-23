import {
	Box,
	Button,
	ClickAwayListener,
	Fade,
	Grid,
	IconButton,
	Modal,
	Popper,
	Tooltip,
	Typography,
	useTheme,
} from "@mui/material";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlockProps } from "../Block";
import { addBlock } from "../../reducers/projectReducer";
import { AddOutlined } from "@mui/icons-material";

interface SavedBlocksProps {}

export const AddBlock: FC<SavedBlocksProps> = () => {
	const mode = useSelector((state: any) => state.project.mode);
	const existingBlocks = useSelector((state: any) => state.project.blocks);
	const uniqueBlocks = existingBlocks.filter((block: BlockProps, i: number) => {
		return existingBlocks.findIndex((b: BlockProps) => b.blockName === block.blockName) === i;
	});

	const [showNewBlockDialog, setShowNewBlockDialog] = useState(false);
	const [showUniqueBlocks, setShowUniqueBlocks] = useState(false);
	const [dialogAnchor, setDialogAnchor] = useState<HTMLButtonElement | null>(null);

	const theme = useTheme();
	const dispatch = useDispatch();

	/**
	 * Adds a new block to the project and scrolls to it.
	 */
	const handleAddBlock = (block: BlockProps | null) => {
		setShowUniqueBlocks(false);
		setShowNewBlockDialog(false);
		dispatch(addBlock(block === null ? { blockName: "new block", stitches: [[]] } : block));

		setTimeout(() => {
			window.scrollTo({ left: 100000, behavior: "smooth" });
		}, 10);
	};

	/**
	 * Handles the click event for the add block button.
	 */
	const handleClick = event => {
		setDialogAnchor(event.currentTarget);
		setShowNewBlockDialog(!showNewBlockDialog);
	};

	return (
		<>
			<Modal open={showUniqueBlocks}>
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
						choose block to copy
					</Typography>
					<Grid container sx={{ gap: 1, ml: 1 }} onClick={() => console.log(uniqueBlocks)}>
						{uniqueBlocks.map((block, i) => (
							<Grid item onClick={() => handleAddBlock(block)} key={i}>
								{block.blockName}
							</Grid>
						))}
					</Grid>
					<Button
						onClick={() => {
							setShowUniqueBlocks(false);
							setShowUniqueBlocks(false);
						}}
					>
						cancel
					</Button>
				</Grid>
			</Modal>
			<Popper placement="top" open={showNewBlockDialog} anchorEl={dialogAnchor}>
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
								borderRadius: "5px",
							}}
						>
							<Button
								sx={{
									color: theme.palette.text.secondary,
									borderRadius: "5px",
									width: "40%",
								}}
								onClick={() => handleAddBlock(null)}
							>
								<Typography variant="h4">add empty block</Typography>
							</Button>
							<Button
								sx={{ color: theme.palette.text.secondary, borderRadius: "5px", width: "40%" }}
								onClick={() => setShowUniqueBlocks(true)}
							>
								<Typography variant="h4">copy existing block</Typography>
							</Button>
						</Grid>
					</Fade>
				</ClickAwayListener>
			</Popper>
			<Tooltip
				title={<div style={{ display: showNewBlockDialog ? "none" : "" }}>add block</div>}
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
				<span>
					<IconButton
						sx={{ display: mode === "edit" ? "flex" : "none", color: theme.palette.text.secondary }}
						onClick={e => handleClick(e)}
					>
						<AddOutlined fontSize="large" />
					</IconButton>
				</span>
			</Tooltip>
		</>
	);
};
