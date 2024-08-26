import {
	Button,
	ClickAwayListener,
	Fade,
	Grid,
	IconButton,
	Link,
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
import { testProject } from "../../utils/testProject";

interface SavedBlocksProps {}

/**
 * The button/popper/modal that allows the user to add a new block to the project.
 */
export const AddBlock: FC<SavedBlocksProps> = () => {
	const mode = useSelector((state: any) => state.project.mode);
	const userBlocks = useSelector((state: any) => state.project.blocks);

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

	/**
	 * Closes all open dialogs.
	 */
	const closeAll = () => {
		setShowNewBlockDialog(false);
		setShowUniqueBlocks(false);
	};

	/**
	 * Filters out duplicate blocks.
	 */
	const renderUniqueBlocks = (blocks: BlockProps[]) => {
		const uniqueBlocks = blocks.filter((block: BlockProps, i: number) => {
			return blocks.findIndex((b: BlockProps) => b.blockName === block.blockName) === i;
		});

		return (
			<Grid
				container
				sx={{
					gap: 1,
					justifyContent: "space-evenly",
					mb: 1.5,
				}}
			>
				{uniqueBlocks.map((block, i) => (
					<Grid
						item
						onClick={() => handleAddBlock(block)}
						key={i}
						sx={{
							backgroundColor: theme.palette.background.paper,
							p: 1,
							borderRadius: "5px",
							cursor: "pointer",
						}}
					>
						{block.blockName}
					</Grid>
				))}
			</Grid>
		);
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
						padding: 2,
						borderRadius: "5px",
						flexDirection: "column",
						justifyContent: "center",
					}}
				>
					<Typography variant="h3" sx={{ color: theme.palette.text.secondary, mb: 1.5 }}>
						choose block to copy
					</Typography>
					<Typography variant="h3" sx={{ fontSize: "1rem", color: theme.palette.text.secondary }}>
						your blocks
					</Typography>
					{renderUniqueBlocks(userBlocks)}
					<Typography variant="h3" sx={{ fontSize: "1rem", color: theme.palette.text.secondary, mt: 1 }}>
						example blocks
					</Typography>
					<Grid container sx={{ flexWrap: "nowrap", color: theme.palette.text.secondary }}>
						<Typography sx={{ fontSize: "0.8rem", ml: 1, mb: 0.5 }}>panels from</Typography>
						<Link href="https://www.ravelry.com/patterns/library/the-handsome-chris-pullover">
							<Typography
								sx={{
									fontSize: "0.8rem",
									ml: 0.5,
									color: theme.palette.text.secondary,
									textDecoration: "underline",
								}}
							>
								caryn s.'s "handsome chris pullover"
							</Typography>
						</Link>
					</Grid>
					{renderUniqueBlocks(testProject.blocks)}
					<Button
						onClick={closeAll}
						sx={{
							"color": theme.palette.text.secondary,
							"border": `2px solid ${theme.palette.text.secondary}`,
							"&:hover": {
								backgroundColor: theme.palette.text.secondary,
								color: theme.palette.primary.dark,
							},
							"left": "50%",
							"transform": "translateX(-50%)",
							"width": "fit-content",
							"mt": 1,
						}}
					>
						cancel
					</Button>
				</Grid>
			</Modal>
			<Popper placement="top" open={showNewBlockDialog && !showUniqueBlocks} anchorEl={dialogAnchor}>
				<ClickAwayListener onClickAway={closeAll}>
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
