import { Button, Grid, IconButton, useTheme } from "@mui/material";
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
import { removeBlockRow, updateRow } from "../../reducers/projectReducer";
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
}

/**
 * A row of stitches.
 * @param stitches The stitches in the row.
 * @param highlightRow Whether the row should be highlighted to show it is being worked.
 * @param rowIndex The index of the row.
 * @param blockIndex The index of the block the row is in.
 * @param editingBlock Whether the block is being edited.
 * @param draftRow The index of the row being edited, if any.
 * @param setDraftRow A function to set the row being edited.
 */
export const Row: FC<RowProps> = ({
	stitches,
	highlightRow,
	rowIndex,
	blockIndex,
	editingBlock,
	draftRow,
	setDraftRow,
}) => {
	const stitchDatabase = require("../../utils/stitches").stitches;
	const mode = useSelector((state: any) => state.workspace.mode);
	const stitchDisplaySetting = useSelector((state: any) => state.workspace.settings.stitchDisplay);

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

		return stitchDisplaySetting === "symbol" ? total * 20 : total * 32; // abbreviations need more space than symbols
	};

	/**
	 * Adds a stitch to the row.
	 * @param stitch The stitch to be added.
	 */
	const handleAddStitch = (stitch: StitchProps) => {
		dispatch(updateRow({ blockIndex, rowIndex, stitches: [...stitches, stitch] }));
		setShowStitchMenu(false);
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

	const handleDeleteRow = () => {
		// dispatch(removeBlockRow({ blockIndex, rowIndex }));
		setWarning("this row will be permanently deleted.");
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
			}}
			data-testid={`row${rowIndex}`}
		>
			{/* {stitches.map((stitch, i) => {
				return (
					<Grid item display="inline">
						<Stitch key={i} index={i} {...stitch} placement={undefined} />
					</Grid>
				);
			})} */}
			{stitches.length === 0
				? "this row doesn't have stitches yet!"
				: stitches.map((stitch, i) => {
						return (
							<Grid item display="inline">
								<Stitch key={i} index={i} {...stitch} placement={undefined} />
							</Grid>
						);
				  })}
		</Grid>
	);

	/**
	 * Displays all available stitches to be added to the row.
	 */
	const stitchMenu = (
		<Grid container data-testid={`stitchSelect${rowIndex}`}>
			available stitches:
			<Grid container>
				{Object.keys(stitchDatabase).map((stitch, i) => {
					return (
						<Grid
							item
							onClick={() =>
								selectedStitch === null
									? handleAddStitch(stitchDatabase[stitch])
									: handleEditStitch(stitchDatabase[stitch], selectedStitch)
							}
						>
							<Stitch {...stitchDatabase[stitch]} placement={undefined} />
						</Grid>
					);
				})}
			</Grid>
			<Button
				onClick={() => {
					setShowStitchMenu(false);
					setSelectedStitch(null);
				}}
				data-testid={`cancelBtn${rowIndex}`}
			>
				cancel
			</Button>
		</Grid>
	);

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

	// this row is being worked in the chart
	if (mode === "chart" && highlightRow) {
		return <DirectionsOverlay rowIndex={rowIndex} blockIndex={blockIndex} row={row} />;
	}

	// this row is being edited
	if (editingBlock && draftRow === rowIndex) {
		return (
			<Grid container data-testid={`editingRow${rowIndex}`}>
				<Grid
					container
					sx={{
						minWidth: calcWidth(),
						backgroundColor: theme.palette.primary.light,
						borderRadius: "5px",
						justifyContent: "space-between",
					}}
				>
					{dragStitchesEnabled ? (
						<SortableList
							items={stitches.map((item, i) => ({
								id: i + 1,
								item: <Stitch {...item} placement={{ rowIndex, blockIndex }} />,
							}))}
							direction="horizontal"
						/>
					) : (
						<Grid
							container
							sx={{
								flexWrap: "nowrap",
							}}
						>
							{stitches.map((stitch, i) => {
								return (
									<Grid
										container
										display="inline"
										sx={{
											flexDirection: "column",
											border:
												selectedStitch === i
													? `2px solid ${theme.palette.primary.main}`
													: "none",
											borderRadius: "5px",
											// backgroundColor:
											// selectedStitch === i ? theme.palette.primary.main : "transparent",
										}}
									>
										<Grid
											item
											container
											onClick={() => handleSelectStitch(i)}
											sx={{
												justifyContent: "center",
												cursor: !dragStitchesEnabled ? "pointer" : "",
											}}
										>
											<Grid item>
												<Stitch key={i} index={i} {...stitch} placement={undefined} />
											</Grid>
										</Grid>
										<Grid
											item
											container
											sx={{ display: selectedStitch === i ? "" : "none", flexWrap: "nowrap" }}
										>
											<IconButton
												sx={{ color: theme.palette.primary.main }}
												onClick={() => {
													setShowStitchMenu(true);
												}}
												disabled={showStitchMenu}
											>
												<EditOutlined />
											</IconButton>
											<IconButton
												sx={{ color: theme.palette.primary.main }}
												disabled={showStitchMenu}
												onClick={() => handleDeleteStitch(i)}
											>
												<DeleteOutlined />
											</IconButton>
										</Grid>
									</Grid>
								);
							})}
						</Grid>
					)}
				</Grid>
				<Grid>
					{showStitchMenu ? (
						stitchMenu
					) : (
						<>
							<IconButton
								sx={{ color: theme.palette.primary.main }}
								disabled={dragStitchesEnabled || selectedStitch !== null}
								onClick={() => {
									setShowStitchMenu(true);
									setSelectedStitch(null);
								}}
								data-testid={`addBtn${rowIndex}`}
							>
								<AddOutlined />
							</IconButton>
							<IconButton
								sx={{
									color: theme.palette.primary.main,
									backgroundColor: dragStitchesEnabled ? theme.palette.primary.light : "transparent",
								}}
								onClick={() => {
									setDragStitchesEnabled(!dragStitchesEnabled);
									setSelectedStitch(null);
								}}
								disabled={selectedStitch !== null || stitches.length < 2}
							>
								<SwapHorizOutlined />
							</IconButton>
							<IconButton
								sx={{ color: theme.palette.primary.main }}
								onClick={() => setDraftRow(null)}
								data-testid={`saveRow${rowIndex}`}
							>
								<SaveOutlined />
							</IconButton>
						</>
					)}
				</Grid>
			</Grid>
		);
	}

	// block is being edited, but this specific row is not
	if (editingBlock) {
		return (
			<Grid container sx={{ flexWrap: "nowrap", alignItems: "center", gap: 1.5 }}>
				{row}
				<Grid container display={draftRow !== null ? "none" : undefined} sx={{ gap: 0.5, flexWrap: "nowrap" }}>
					<IconButton
						sx={{ color: theme.palette.primary.main }}
						onClick={() => setDraftRow(rowIndex)}
						data-testid={`editBtn${rowIndex}`}
					>
						<EditOutlined />
					</IconButton>
					<IconButton
						sx={{ color: theme.palette.primary.main, cursor: "grab" }}
						data-testid={`sortBtn${rowIndex}`}
					>
						<SwapVertOutlined />
					</IconButton>
					<IconButton
						sx={{ color: theme.palette.primary.main }}
						onClick={() => handleDeleteRow()}
						data-testid={`delBtn${rowIndex}`}
						disabled={warning !== null}
					>
						<DeleteOutlined />
					</IconButton>
					{warning !== null ? (
						<Warning
							text={warning}
							action={() => dispatch(removeBlockRow({ blockIndex, rowIndex }))}
							close={() => setWarning(null)}
						/>
					) : null}
				</Grid>
			</Grid>
		);
	}

	// base state; this row is not being worked or edited
	return row;
};
