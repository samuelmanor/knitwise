import { Box, Button, Grid, IconButton, Tooltip, useTheme } from "@mui/material";
import { FC, ReactNode, useState } from "react";
import { Stitch, StitchProps } from "../Stitch";
import { useDispatch, useSelector } from "react-redux";
import { DirectionsOverlay } from "../DirectionsOverlay";
import {
	AddOutlined,
	DeleteOutlined,
	EditOutlined,
	SaveOutlined,
	SwapHorizOutlined,
	SwapHorizTwoTone,
	SwapVertOutlined,
} from "@mui/icons-material";
import { removeBlockRow, updateRow } from "../../reducers/projectReducer";
import { SortableList } from "../Sortable/SortableList";

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
 * @param stitches The stitches to be rendered.
 * @param highlightRow Whether or not to highlight the row to indicate that it's currently being worked.
 * @param rowIndex The index of the row.
 * @param blockIndex The index of the block that the row is in.
 * @param editingBlock Whether or not the block that contains the row is currently being edited.
 * @param draftRow The index of the row that is currently being edited.
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
	// all available stitches from the db
	const stitchDatabase = require("../../utils/stitches").stitches;
	const mode = useSelector((state: any) => state.workspace.mode);
	const stitchDisplaySetting = useSelector((state: any) => state.workspace.settings.stitchDisplay);

	// toggles the ability to reorder stitches
	const [dragStitchesEnabled, setDragStitchesEnabled] = useState(false);
	// toggles the display of the stitch select menu
	const [showStitchSelect, setShowStitchSelect] = useState(false);
	// the index of the currently selected stitch
	const [selectedStitch, setSelectedStitch] = useState<number | null>(null);

	const theme = useTheme();
	const dispatch = useDispatch();

	if (!stitches) {
		return null; // make error row ?
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
		setShowStitchSelect(false);
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
		setShowStitchSelect(false);
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
		>
			{stitches.map((stitch, i) => {
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
	const stitchSelect = (
		<Grid container>
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
					setShowStitchSelect(false);
					setSelectedStitch(null);
				}}
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

		setShowStitchSelect(false);
	};

	// this row is being worked in the chart
	if (mode === "chart" && highlightRow) {
		return <DirectionsOverlay rowIndex={rowIndex} blockIndex={blockIndex} row={row} />;
	}

	// this row is being edited
	if (mode === "editBlock" && editingBlock && draftRow === rowIndex) {
		return (
			<Grid container>
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
													setShowStitchSelect(true);
												}}
												disabled={showStitchSelect}
											>
												<EditOutlined />
											</IconButton>
											<IconButton
												sx={{ color: theme.palette.primary.main }}
												disabled={showStitchSelect}
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
					{showStitchSelect ? (
						stitchSelect
					) : (
						<>
							<IconButton
								sx={{ color: theme.palette.primary.main }}
								disabled={dragStitchesEnabled || selectedStitch !== null}
								onClick={() => {
									setShowStitchSelect(true);
									setSelectedStitch(null);
								}}
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
								disabled={selectedStitch !== null}
							>
								<SwapHorizOutlined />
							</IconButton>
							<IconButton sx={{ color: theme.palette.primary.main }} onClick={() => setDraftRow(null)}>
								<SaveOutlined />
							</IconButton>
						</>
					)}
				</Grid>
			</Grid>
		);
	}

	// block is being edited, but this specific row is not
	if (mode === "editBlock" && editingBlock) {
		return (
			<Grid container sx={{ flexWrap: "nowrap", alignItems: "center", gap: 1.5 }}>
				{row}
				<Grid container display={draftRow !== null ? "none" : undefined} sx={{ gap: 0.5, flexWrap: "nowrap" }}>
					<IconButton sx={{ color: theme.palette.primary.main }} onClick={() => setDraftRow(rowIndex)}>
						<EditOutlined />
					</IconButton>
					<IconButton sx={{ color: theme.palette.primary.main, cursor: "grab" }}>
						<SwapVertOutlined />
					</IconButton>
					<IconButton
						sx={{ color: theme.palette.primary.main }}
						onClick={() => dispatch(removeBlockRow({ blockIndex, rowIndex }))}
					>
						<DeleteOutlined />
					</IconButton>
				</Grid>
			</Grid>
		);
	}

	// base state; this row is not being worked or edited
	return row;
};
