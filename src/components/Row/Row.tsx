import {
	Box,
	Button,
	Checkbox,
	ClickAwayListener,
	Grid,
	IconButton,
	Tooltip,
	Typography,
	useTheme,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Stitch, StitchProps } from "../Stitch";
import { useDispatch, useSelector } from "react-redux";
import { DirectionsOverlay } from "../DirectionsOverlay";
import {
	AddOutlined,
	DeleteOutlined,
	EditOutlined,
	SaveOutlined,
	SwapHorizOutlined,
	SwapVertOutlined,
} from "@mui/icons-material";
import { removeBlockRow, updateRow, changeSetting } from "../../reducers/projectReducer";
import { SortableList } from "../Sortable/SortableList";
import { Warning } from "../Warning";

export interface RowProps {
	stitches: StitchProps[];
	highlightRow?: boolean;
	rowIndex: number;
	blockIndex: number;
	editingBlock: boolean;
	draftRow?: number | null;
	setDraftRow?: (row: number) => void;
	dragRowsEnabled?: boolean;
}

/**
 * A row of stitches.
 * @param stitches The stitches in the row.
 * @param highlightRow Whether the row is currently being worked in the chart.
 * @param rowIndex The index of the row.
 * @param blockIndex The index of the block the row belongs to.
 * @param editingBlock Whether the block is currently being edited.
 * @param draftRow The index of the row that is currently being edited.
 * @param setDraftRow A function to set the index of the row that is currently being edited.
 * @param dragRowsEnabled Whether the ability to reorder rows is enabled.
 */
export const Row: FC<RowProps> = ({
	stitches,
	highlightRow,
	rowIndex,
	blockIndex,
	editingBlock,
	draftRow,
	setDraftRow,
	dragRowsEnabled,
}) => {
	const stitchDatabase = require("../../utils/stitches").stitches;
	const mode = useSelector((state: any) => state.project.mode);
	const stitchDisplaySetting = useSelector((state: any) => state.project.settings.stitchDisplay);
	const showDeleteRowConfirmation = useSelector((state: any) => state.project.settings.showDeleteRowConfirmation);
	const autoCloseStitchMenu = useSelector((state: any) => state.project.settings.autoCloseStitchMenu);

	const [dragStitchesEnabled, setDragStitchesEnabled] = useState(false); // toggles the ability to reorder stitches
	const [showStitchMenu, setShowStitchMenu] = useState(false); // toggles the display of the stitch select menu
	const [selectedStitch, setSelectedStitch] = useState<number | null>(null); // the index of the stitch currently being edited
	const [warning, setWarning] = useState<string | null>(null);

	const theme = useTheme();
	const dispatch = useDispatch();

	useEffect(() => {
		// opens the stitch menu if the row is empty
		if (stitches.length === 0) {
			setShowStitchMenu(true);
		}
	}, [stitches, setShowStitchMenu]);

	if (!stitches) {
		return null; // TODO: make error row ?
	}

	/**
	 * Calculates the width of the row based on the sum of all stitches' widths.
	 */
	const calcWidth = (): number => {
		let total: number = 0;
		stitches.forEach(stitch => {
			total += stitch.width;
		});

		return stitchDisplaySetting === "symbol" ? total * 24 : total * 36; // abbreviations need more space than symbols
		// todo: make this more dynamic
	};

	/**
	 * Adds a stitch to the row.
	 * @param stitch The stitch to be added.
	 */
	const handleAddStitch = (stitch: StitchProps) => {
		dispatch(updateRow({ blockIndex, rowIndex, stitches: [...stitches, stitch] }));
		if (autoCloseStitchMenu) {
			setShowStitchMenu(false);
		}
	};

	/**
	 * Edits a stitch in the row.
	 * @param newStitch The new stitch to replace the old one.
	 * @param index The index of the stitch to be replaced.
	 */
	const handleEditStitch = (newStitch: StitchProps, index: number) => {
		const updatedRow = stitches.map((stitch, i) => {
			if (i === index) {
				return newStitch;
			} else {
				return stitch;
			}
		});
		dispatch(updateRow({ blockIndex, rowIndex, stitches: updatedRow }));
		setSelectedStitch(null);
		setShowStitchMenu(false);
	};

	/**
	 * Deletes a stitch from the row.
	 * @param index The index of the stitch to be deleted.
	 */
	const handleDeleteStitch = (index: number) => {
		const updatedRow = stitches.filter((stitch, i) => i !== index);
		dispatch(updateRow({ blockIndex, rowIndex, stitches: updatedRow }));
		setSelectedStitch(null);
	};

	/**
	 * Warns the user that the row will be deleted, or deletes the row if the warning was toggled off.
	 */
	const handleDeleteRow = () => {
		if (showDeleteRowConfirmation) {
			setWarning("this row will be deleted.");
		} else {
			dispatch(removeBlockRow({ blockIndex, rowIndex }));
			setDraftRow(null);
		}
	};

	/**
	 * Handles the selection of a specific stitch and toggles the display of the stitch select menu.
	 * @param i The index of the stitch.
	 */
	const handleSelectStitch = (i: number) => {
		if (selectedStitch === null || selectedStitch !== i) {
			setSelectedStitch(i);
		} else {
			setSelectedStitch(null);
		}

		setShowStitchMenu(false);
	};

	/**
	 * A static row of stitches.
	 */
	const row = (
		<Grid
			container
			sx={{
				backgroundColor:
					highlightRow && mode === "chart" ? theme.palette.primary.light : theme.palette.background.paper,
				borderRadius: highlightRow && mode === "chart" ? "none" : "5px",
				paddingX: 0.5,
				minWidth: calcWidth(),
				flexWrap: "nowrap",
				justifyContent: "space-between",
				height: "55px",
			}}
			data-testid={`row${rowIndex}`}
		>
			{stitches.length === 0 ? (
				<Grid container sx={{ width: "400px", justifyContent: "center", alignItems: "center" }}>
					<Typography variant="h4" sx={{ p: 0, textAlign: "center" }}>
						this row doesn't have stitches yet!
					</Typography>
				</Grid>
			) : (
				stitches.map((stitch, i) => {
					return (
						<Grid
							container
							sx={{
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
							}}
							key={`stitch${blockIndex}${rowIndex}${i}`}
						>
							<Tooltip
								componentsProps={{
									tooltip: {
										sx: {
											"zIndex": "100",
											"backgroundColor": theme.palette.background.paper,
											"& .MuiTooltip-arrow": {
												color: theme.palette.background.paper,
											},
										},
									},
								}}
								title={
									<Grid container>
										<Grid item>
											<IconButton
												onClick={() => setShowStitchMenu(true)}
												sx={{ color: theme.palette.primary.main }}
											>
												<EditOutlined />
											</IconButton>
										</Grid>

										<Grid item>
											<IconButton
												onClick={() => handleDeleteStitch(i)}
												sx={{ color: theme.palette.primary.main }}
												disabled={stitches.length === 1}
											>
												<DeleteOutlined />
											</IconButton>
										</Grid>
									</Grid>
								}
								arrow
								disableFocusListener
								disableHoverListener
								disableTouchListener
								open={selectedStitch === i && !showStitchMenu}
							>
								<Grid
									item
									display="inline"
									onClick={() =>
										draftRow === rowIndex && !showStitchMenu ? handleSelectStitch(i) : null
									}
									sx={{
										border:
											selectedStitch === i
												? `2px dashed ${theme.palette.primary.light}`
												: "2px solid transparent",
										borderRadius: "5px",
									}}
								>
									<Stitch
										key={i}
										index={i}
										{...stitch}
										placement={undefined}
										disableStitchTip={(mode === "chart" && !highlightRow) || dragRowsEnabled}
									/>
								</Grid>
							</Tooltip>
						</Grid>
					);
				})
			)}
		</Grid>
	);

	/**
	 * Displays all available stitches to be added to the row.
	 */
	const stitchMenu = (
		<Grid container data-testid={`stitchSelect${rowIndex}`} sx={{ flexDirection: "column", alignItems: "center" }}>
			<Typography variant="h4" sx={{ paddingY: 1 }}>
				{selectedStitch === null ? "add a stitch to this row:" : "replace this stitch with:"}
			</Typography>
			<Grid container sx={{ gap: 1.5, justifyContent: "space-between", width: "320px" }}>
				{Object.keys(stitchDatabase).map((stitch, i) => {
					return (
						<Grid
							item
							onClick={() =>
								selectedStitch === null
									? handleAddStitch(stitchDatabase[stitch])
									: handleEditStitch(stitchDatabase[stitch], selectedStitch)
							}
							key={i}
						>
							<Stitch {...stitchDatabase[stitch]} stitchSelectMenu />
						</Grid>
					);
				})}
			</Grid>
			<Grid container sx={{ justifyContent: "center", paddingX: 2, paddingY: 1, alignItems: "center" }}>
				<Grid
					item
					container
					sx={{ display: selectedStitch === null ? "" : "none", alignItems: "center", width: "fit-content" }}
				>
					<Checkbox
						checked={autoCloseStitchMenu}
						onChange={() =>
							dispatch(changeSetting({ setting: "autoCloseStitchMenu", value: !autoCloseStitchMenu }))
						}
						sx={{ color: theme.palette.primary.main }}
					/>
					<Typography variant="h4" sx={{ ml: -1.5, width: "180px" }}>
						auto-close this menu after adding a stitch
					</Typography>
				</Grid>
				<Grid item>
					<Button
						onClick={() => {
							setShowStitchMenu(false);
							setSelectedStitch(null);
						}}
						data-testid={`cancelBtn${rowIndex}`}
						sx={{
							"backgroundColor": theme.palette.primary.main,
							"color": theme.palette.text.secondary,
							"marginX": 2,
							"border": "2px solid transparent",
							"&:hover": {
								backgroundColor: "transparent",
								color: theme.palette.primary.main,
								border: `2px solid ${theme.palette.primary.main}`,
							},
						}}
					>
						close
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);

	// this row is being worked in the chart
	if (mode === "chart" && highlightRow) {
		return <DirectionsOverlay rowIndex={rowIndex} blockIndex={blockIndex} row={row} />;
	}

	// this row is being edited
	if (editingBlock && draftRow === rowIndex) {
		return (
			<Grid
				container
				sx={{
					backgroundColor: theme.palette.primary.light,
					p: 1,
					borderRadius: "5px",
					flexDirection: "column",
					flexWrap: "nowrap",
					alignItems: "center",
				}}
				data-testid={`editingRow${rowIndex}`}
			>
				<ClickAwayListener onClickAway={() => setSelectedStitch(null)}>
					<>
						<Grid
							container
							sx={{ gap: 1.5, flexWrap: "nowrap", alignItems: "center", justifyContent: "space-between" }}
						>
							<Grid item>
								{dragStitchesEnabled ? (
									<Grid
										container
										sx={{
											minWidth: calcWidth(),
											backgroundColor: theme.palette.background.paper,
											borderRadius: "5px",
											justifyContent: "space-between",
											border: `1rem solid ${theme.palette.primary.light}`,
											borderImage: `repeating-linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.primary.light} 5px, ${theme.palette.primary.main} 6px, ${theme.palette.primary.main} 15px, ${theme.palette.primary.light} 16px, ${theme.palette.primary.light} 20px) 20/1rem`,
											paddingX: 1,
											cursor: "grab",
										}}
									>
										<SortableList
											items={stitches.map((item, i) => ({
												id: i + 1,
												item: <Stitch {...item} placement={{ rowIndex, blockIndex }} />,
											}))}
											direction="horizontal"
										/>
									</Grid>
								) : (
									row
								)}
							</Grid>
							<Grid item container sx={{ mr: 1, gap: 1, width: "fit-content" }}>
								<Tooltip
									title={
										<Grid sx={{ textAlign: "center" }}>
											save
											<br />
											row
										</Grid>
									}
									placement="bottom"
									componentsProps={{
										tooltip: {
											sx: {
												color: theme.palette.text.secondary,
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
									<span>
										<IconButton
											onClick={() => {
												setDraftRow(null);
												setSelectedStitch(null);
												setDragStitchesEnabled(false);
											}}
											disabled={warning !== null || showStitchMenu}
											data-testid={`saveRow${rowIndex}`}
										>
											<SaveOutlined />
										</IconButton>
									</span>
								</Tooltip>
								<Tooltip
									title={
										<Grid sx={{ textAlign: "center" }}>
											delete
											<br />
											row
										</Grid>
									}
									placement="bottom"
									componentsProps={{
										tooltip: {
											sx: {
												color: theme.palette.text.secondary,
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
									<span>
										<IconButton
											onClick={handleDeleteRow}
											disabled={warning !== null || dragStitchesEnabled || showStitchMenu}
										>
											<DeleteOutlined />
										</IconButton>
									</span>
								</Tooltip>
							</Grid>
						</Grid>
						{warning === null ? null : (
							<Warning
								text={warning}
								action={() => {
									setWarning(null);
									setDraftRow(null);
									dispatch(removeBlockRow({ blockIndex, rowIndex }));
								}}
								close={() => setWarning(null)}
								setting={showDeleteRowConfirmation}
								updateSetting={() =>
									dispatch(changeSetting({ setting: "showDeleteRowConfirmation", value: false }))
								}
							/>
						)}
						<Typography display={draftRow !== null ? "none" : ""}>
							{dragStitchesEnabled
								? "click and drag stitches to reorder them!"
								: "click a stitch to edit or delete it!"}
						</Typography>
						{showStitchMenu ? (
							stitchMenu
						) : (
							<Grid
								container
								sx={{ width: "fit-content", display: warning !== null ? "none" : "", pt: 1 }}
							>
								<Tooltip
									title={"add a stitch"}
									placement="left"
									componentsProps={{
										tooltip: {
											sx: {
												color: theme.palette.text.secondary,
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
									<span>
										<IconButton
											onClick={() => setShowStitchMenu(true)}
											disabled={
												dragStitchesEnabled || selectedStitch !== null || warning !== null
											}
											data-testid={`addBtn${rowIndex}`}
										>
											<AddOutlined />
										</IconButton>
									</span>
								</Tooltip>
								<Tooltip
									title={"rearrange stitches"}
									placement="right"
									componentsProps={{
										tooltip: {
											sx: {
												color: theme.palette.text.secondary,
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
									<span>
										<IconButton
											onClick={() => {
												setDragStitchesEnabled(!dragStitchesEnabled);
												setSelectedStitch(null);
											}}
											disabled={
												selectedStitch !== null || stitches.length < 2 || warning !== null
											}
											sx={{
												backgroundColor: dragStitchesEnabled
													? theme.palette.primary.main
													: "transparent",
												color: dragStitchesEnabled ? theme.palette.primary.light : "default",
											}}
											disableRipple
										>
											<SwapHorizOutlined />
										</IconButton>
									</span>
								</Tooltip>
							</Grid>
						)}
					</>
				</ClickAwayListener>
			</Grid>
		);
	}

	// block is being edited, but this specific row is not
	if (editingBlock) {
		return (
			<Box
				sx={{
					border: warning !== null ? `2px solid ${theme.palette.primary.main}` : "none",
					backgroundColor: warning !== null ? theme.palette.primary.light : "transparent",
					borderRadius: "5px",
					width: "fit-content",
					p: 0.5,
					opacity: draftRow !== null ? 0.8 : 1,
				}}
			>
				<Grid
					container
					sx={{
						flexWrap: "nowrap",
						alignItems: "center",
						gap: 1.5,
					}}
				>
					{row}
					<Grid
						container
						display={draftRow !== null ? "none" : undefined}
						sx={{ gap: 0.5, flexWrap: "nowrap" }}
					>
						{dragRowsEnabled ? (
							<SwapVertOutlined sx={{ color: theme.palette.primary.main, cursor: "grab" }} />
						) : (
							<Tooltip
								title={`edit row ${rowIndex + 1}`}
								placement="right"
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
												offset: [0, -12],
											},
										},
									],
								}}
							>
								<IconButton
									sx={{ color: theme.palette.primary.main }}
									onClick={() => setDraftRow(rowIndex)}
									data-testid={`editBtn${rowIndex}`}
								>
									<EditOutlined fontSize="large" />
								</IconButton>
							</Tooltip>
						)}
					</Grid>
				</Grid>
			</Box>
		);
	}

	// this row is not being worked or edited
	return row;
};
