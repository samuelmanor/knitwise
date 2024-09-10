import { IconButton, Grid, Typography, Box, useTheme, Tooltip } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import { Row } from "../Row";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined, SaveOutlined, AddOutlined, SwapVertOutlined } from "@mui/icons-material";
import {
	deleteBlock,
	setMode,
	addBlockRow,
	editBlockName,
	changeSetting,
	removeEmptyBlockRows,
} from "../../reducers/projectReducer";
import { StitchProps } from "../Stitch";
import { SortableList } from "../Sortable/SortableList";
import { NameEditor } from "../NameEditor";
import { Warning } from "../Warning";

export interface BlockProps {
	index?: number;
	currentBlockRow?: number;
	stitches: StitchProps[][];
	blockName: string;
	tallestBlockIndex?: number;
	draftBlockIndex?: number | null;
	setDraftBlockIndex?: (index: number) => void;
}

/**
 * A block of the pattern; made up of many rows.
 * @param index The index of the block.
 * @param currentBlockRow The current row of the block.
 * @param stitches The stitches for the block.
 * @param blockName The name of the block.
 * @param tallestBlockIndex The index of the tallest block in the project - used to calculate padding for individual blocks.
 * @param draftBlockIndex The index of the block that is currently being edited.
 * @param setDraftBlockIndex A function to set the index of the block that is currently being edited.
 */
export const Block: FC<BlockProps> = ({
	index,
	currentBlockRow,
	stitches,
	blockName,
	tallestBlockIndex,
	draftBlockIndex,
	setDraftBlockIndex,
}) => {
	const project = useSelector((state: any) => state.project);
	const projectRow = useSelector((state: any) => state.currentProjectRow);
	const mode = useSelector((state: any) => state.project.mode);
	const showDeleteBlockConfirmation = useSelector((state: any) => state.project.settings.showDeleteBlockConfirmation);

	const [draftRow, setDraftRow] = useState<number | null>(null);
	const [dragRowsEnabled, setDragRowsEnabled] = useState(false);
	const [warning, setWarning] = useState<string | null>(null);

	const baseRowRef = useRef<HTMLDivElement>(null);

	const dispatch = useDispatch();
	const theme = useTheme();

	/**
	 * Scrollsm to the center of the selected block.
	 */
	const scrollToBlock = () => {
		if (baseRowRef) {
			setTimeout(() => {
				window.scrollTo({
					top: document.body.scrollHeight,
				});
				window.scrollTo({
					left: baseRowRef.current.offsetLeft - window.innerWidth / 2 + baseRowRef.current.clientWidth / 2,
					behavior: "smooth",
				});
			}, 10);
		}
	};

	/**
	 * Calculates the padding for the block.
	 */
	const moveBlock = () => {
		const firstRow = projectRow === 1 && currentBlockRow === 1;

		if (index === tallestBlockIndex || firstRow || baseRowRef.current === null) {
			// on the first row, all blocks are aligned
			return 0;
		} else {
			// a block's position is relative to the current row of both the tallest block and the current block
			const tallestBlockPosition =
				project.blocks[tallestBlockIndex].currentBlockRow * baseRowRef.current.offsetHeight;
			const currentBlockPosition = currentBlockRow * baseRowRef.current.offsetHeight;

			return `${tallestBlockPosition - currentBlockPosition}px`;
		}
	};

	useEffect(() => {
		if (mode === "chart") {
			const block = document.getElementById(`block${index}`);
			block?.setAttribute("style", `margin-bottom: ${moveBlock()}`);
		}
	}, [project.currentProjectRow, mode, index, moveBlock]);

	/**
	 * Adds a new row to the block.
	 */
	const handleAddRow = (rowIndex: number) => {
		dispatch(addBlockRow({ blockIndex: index, rowIndex }));
	};

	/**
	 * Opens or closes the block editor.
	 */
	const handleEditBlock = (i: number | null) => {
		setDraftBlockIndex(i);

		if (i === null) {
			dispatch(setMode("edit"));
			scrollToBlock();
		} else {
			dispatch(setMode("editBlock"));
		}
	};

	/**
	 * Displays a warning if enabled, otherwise deletes the block.
	 */
	const handleDeleteBlock = () => {
		if (showDeleteBlockConfirmation) {
			setWarning("this block will be deleted.");
			scrollToBlock();
		} else {
			dispatch(deleteBlock({ blockIndex: index }));
		}
	};

	/**
	 * Checks the rows of the block for empty rows or width errors, and sets a warning if necessary.
	 */
	const checkRows = () => {
		const firstRowWidth = stitches[0].reduce((a, b) => a + b.width, 0);
		let errorRows = [];

		stitches.forEach((row, i) => {
			// skip empty rows; removeEmptyBlockRows will handle these
			if (row.length === 0) {
				return;
			}
			// check for rows with a number of stitches that is different from the first row
			let currentRowWidth = 0;
			row.forEach(stitch => {
				currentRowWidth += stitch.width;
			});
			if (currentRowWidth !== firstRowWidth && i !== 0) {
				errorRows.push(i + 1);
			}
		});

		if (errorRows.length > 0) {
			if (errorRows.length > 1) {
				setWarning(`rows ${errorRows.join(", ")} have a different number of stitches than the first row.`);
			} else {
				setWarning(`row ${errorRows.join("")} has a different number of stitches than the first row.`);
			}
		} else {
			handleEditBlock(null);
		}
	};

	/**
	 * Removes empty rows from the block and checks the rows for errors.
	 */
	const handleSaveBlock = () => {
		setDragRowsEnabled(false);
		dispatch(removeEmptyBlockRows({ blockIndex: index }));
		checkRows();
	};

	/**
	 * Renders the rows of the block.
	 */
	const rows = stitches.map((row, i) => {
		return (
			<Box ref={i === 0 ? baseRowRef : null} key={`row${index}${i}container`}>
				<Row
					stitches={row}
					highlightRow={currentBlockRow - 1 === i}
					editingBlock={draftBlockIndex === index}
					rowIndex={i}
					blockIndex={index}
				/>
			</Box>
		);
	});

	/**
	 * Standard container for blocks.
	 */
	const BlockContainer = ({ children }) => {
		return (
			<Grid
				container
				sx={{
					flexDirection: "column-reverse",
					backgroundColor: theme.palette.background.paper,
					border: `2px solid ${theme.palette.primary.main}`,
					p: 0.5,
					borderTopRightRadius: "10px",
					borderTopLeftRadius: "10px",
					maxHeight: "100%",
					// mb: baseRowRef.current && mode !== "edit" ? moveBlock() : "5px",
					width: "fit-content",
				}}
				id={`block${index}`}
			>
				{children}
			</Grid>
		);
	};

	// a preview of the block; used in the add block menu
	if (currentBlockRow === null || currentBlockRow === undefined) {
		return (
			<Grid
				container
				sx={{
					"backgroundColor": theme.palette.text.secondary,
					"width": "fit-content",
					"p": 1,
					"borderRadius": "5px",
					"cursor": "pointer",
					"border": "2px solid transparent",
					"justifyContent": "center",
					"&:hover": {
						backgroundColor: theme.palette.primary.dark,
						color: theme.palette.text.secondary,
						border: `2px solid ${theme.palette.text.secondary}`,
					},
				}}
			>
				<Typography variant="h4" sx={{ p: 0 }}>
					{blockName}
				</Typography>
			</Grid>
		);
	}

	// chart mode
	if (mode === "chart") {
		return (
			<BlockContainer>
				<Grid container sx={{ justifyContent: "center", paddingX: 2, whiteSpace: "nowrap", height: "35px" }}>
					<Typography variant="h5" sx={{ color: theme.palette.text.primary }}>
						{blockName}
					</Typography>
				</Grid>
				{rows}
			</BlockContainer>
		);
	}

	// this block is being edited
	if (mode === "editBlock" && draftBlockIndex === index) {
		return (
			<Grid container sx={{ flexDirection: "column", pb: 4 }} data-testid={`block${index}EditBlock`}>
				<NameEditor
					name={blockName}
					onSave={name => dispatch(editBlockName({ blockName: name, blockIndex: index }))}
					disabled={warning !== null || dragRowsEnabled}
				/>
				<Grid
					item
					sx={{
						display: "flex",
						flexDirection: "column-reverse",
						gap: 1,
						p: 1,
						border: dragRowsEnabled ? `1rem solid ${theme.palette.primary.light}` : "none",
						borderImage: dragRowsEnabled
							? `repeating-linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.primary.light} 5px, ${theme.palette.primary.main} 6px, ${theme.palette.primary.main} 15px, ${theme.palette.primary.light} 16px, ${theme.palette.primary.light} 20px) 20/1rem`
							: "none",
					}}
				>
					{dragRowsEnabled ? (
						<SortableList
							items={stitches.map((item, i) => ({
								id: i + 1,
								item: (
									<Row
										key={`row${index}${i}`}
										stitches={item}
										editingBlock={true}
										rowIndex={i}
										blockIndex={index}
										draftRow={draftRow}
										setDraftRow={setDraftRow}
										dragRowsEnabled={dragRowsEnabled}
									/>
								),
							}))}
							direction="vertical"
						/>
					) : (
						stitches.map((row, i) => {
							return (
								<Row
									key={`row${index}${i}`}
									stitches={stitches[i]}
									editingBlock={true}
									rowIndex={i}
									blockIndex={index}
									draftRow={draftRow}
									setDraftRow={setDraftRow}
								/>
							);
						})
					)}
				</Grid>
				{dragRowsEnabled ? (
					<Grid container sx={{ justifyContent: "center", pt: 1 }}>
						<Typography variant="h4">click and drag rows to reorder them!</Typography>
					</Grid>
				) : null}
				<Grid
					container
					sx={{
						justifyContent: "center",
						gap: 3,
						mt: 2,
						display: warning !== null ? "none" : "",
					}}
				>
					<Tooltip
						title="add row"
						placement="bottom"
						componentsProps={{
							tooltip: {
								sx: {
									color: theme.palette.primary.main,
								},
							},
						}}
						PopperProps={{
							modifiers: [
								{
									name: "offset",
									options: {
										offset: [0, -10],
									},
								},
							],
						}}
					>
						<IconButton
							onClick={() => handleAddRow(stitches.length + 1)}
							disabled={draftRow !== null || dragRowsEnabled || warning !== null}
							data-testid={`block${index}AddRowBtn`}
							sx={{ color: theme.palette.primary.main }}
						>
							<AddOutlined fontSize="large" />
						</IconButton>
					</Tooltip>
					<Tooltip
						title={dragRowsEnabled ? "finish reordering" : "reorder rows"}
						placement="bottom"
						componentsProps={{
							tooltip: {
								sx: {
									color: theme.palette.primary.main,
								},
							},
						}}
						PopperProps={{
							modifiers: [
								{
									name: "offset",
									options: {
										offset: [0, -10],
									},
								},
							],
						}}
					>
						<IconButton
							onClick={() => setDragRowsEnabled(!dragRowsEnabled)}
							sx={{
								backgroundColor: dragRowsEnabled ? theme.palette.primary.main : "default",
								color: dragRowsEnabled ? theme.palette.text.secondary : theme.palette.primary.main,
							}}
							disableRipple
							disabled={draftRow !== null || warning !== null || stitches.length < 2}
						>
							<SwapVertOutlined fontSize="large" />
						</IconButton>
					</Tooltip>
					<Tooltip
						title="save block"
						placement="bottom"
						componentsProps={{
							tooltip: {
								sx: {
									color: theme.palette.primary.main,
								},
							},
						}}
						PopperProps={{
							modifiers: [
								{
									name: "offset",
									options: {
										offset: [0, -10],
									},
								},
							],
						}}
					>
						<IconButton
							onClick={handleSaveBlock}
							disabled={draftRow !== null || warning !== null}
							data-testid={`block${index}SaveBtn`}
							sx={{ color: theme.palette.primary.main }}
						>
							<SaveOutlined fontSize="large" />
						</IconButton>
					</Tooltip>
				</Grid>
				<Grid container sx={{ justifyContent: "center" }}>
					{warning !== null ? (
						<Warning
							text={warning}
							action={() => {
								handleEditBlock(null);
								setWarning(null);
							}}
							close={() => setWarning(null)}
						/>
					) : null}
				</Grid>
			</Grid>
		);
	}

	// edit mode, but no block is being edited
	if (mode === "edit" || mode === "dragBlocks") {
		return (
			<Grid
				container
				sx={{
					flexDirection: "column",
					alignItems: "center",
					border: warning !== null ? `1rem solid ${theme.palette.primary.light}` : "none",
					borderImage:
						warning !== null
							? `repeating-linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.primary.light} 5px, ${theme.palette.primary.main} 6px, ${theme.palette.primary.main} 15px, ${theme.palette.primary.light} 16px, ${theme.palette.primary.light} 20px) 20/1rem`
							: "none",
					p: warning !== null ? 1 : 0,
					mb: warning !== null ? 7 : 0,
				}}
			>
				<BlockContainer>
					<Grid container sx={{ justifyContent: "center" }}>
						<Typography
							variant="h5"
							sx={{ color: theme.palette.text.primary, whiteSpace: "nowrap", paddingX: 2 }}
						>
							{blockName}
						</Typography>
					</Grid>
					{rows}
				</BlockContainer>
				<Grid container sx={{ justifyContent: "center", gap: 3, width: "fit-content", flexWrap: "nowrap" }}>
					<Grid item display={mode === "dragBlocks" ? "none" : ""}>
						<Tooltip
							title="edit block"
							placement="bottom"
							componentsProps={{
								tooltip: {
									sx: {
										color: theme.palette.primary.main,
									},
								},
							}}
							PopperProps={{
								modifiers: [
									{
										name: "offset",
										options: {
											offset: [0, -15],
										},
									},
								],
							}}
						>
							<IconButton
								sx={{
									color: theme.palette.primary.main,
									display: warning !== null ? "none" : "",
								}}
								onClick={() => handleEditBlock(index)}
								data-testid={`block${index}EditBtn`}
							>
								<EditOutlined fontSize="large" />
							</IconButton>
						</Tooltip>
					</Grid>
					<Grid item display={mode === "dragBlocks" ? "none" : ""}>
						<Tooltip
							title="delete block"
							placement="bottom"
							componentsProps={{
								tooltip: {
									sx: {
										color: theme.palette.primary.main,
									},
								},
							}}
							PopperProps={{
								modifiers: [
									{
										name: "offset",
										options: {
											offset: [0, -15],
										},
									},
								],
							}}
						>
							<IconButton
								sx={{
									color: theme.palette.primary.main,
									display: warning !== null ? "none" : "",
								}}
								onClick={handleDeleteBlock}
								disabled={project.blocks.length === 1}
								data-testid={`block${index}DeleteBtn`}
							>
								<DeleteOutlined fontSize="large" />
							</IconButton>
						</Tooltip>
					</Grid>
				</Grid>
				{warning !== null ? (
					<Warning
						text={warning}
						action={() => {
							dispatch(deleteBlock({ blockIndex: index }));
							setWarning(null);
						}}
						close={() => {
							setWarning(null);
						}}
						setting={showDeleteBlockConfirmation}
						updateSetting={() =>
							dispatch(changeSetting({ setting: "showDeleteBlockConfirmation", value: false }))
						}
					/>
				) : null}
			</Grid>
		);
	}
};
