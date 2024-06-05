import { Box, Grid, IconButton, Tooltip, useTheme } from "@mui/material";
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
import { removeBlockRow } from "../../reducers/projectReducer";
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

	const [selectedStitch, setSelectedStitch] = useState<number | null>(null);

	// // whether or not a stitch is currently being edited
	// const currentlyEditing = selectedStitch !== null || draftStitch !== null || showStitchSelect === true;

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
						<Grid item>
							<Stitch {...stitchDatabase[stitch]} placement={undefined} />
						</Grid>
					);
				})}
			</Grid>
		</Grid>
	);

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
						backgroundColor: highlightRow && mode === "chart" ? theme.palette.primary.light : "transparent",
						paddingX: 0.5,
						flexWrap: "nowrap",
						justifyContent: "space-between",
						minWidth: calcWidth(),
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
								// backgroundColor:
								// 	highlightRow && mode === "chart"
								// 		? theme.palette.primary.light
								// 		: theme.palette.background.paper,
								border: `4px solid ${theme.palette.background.paper}`,
								borderRadius: highlightRow && mode === "chart" ? "none" : "5px",
								paddingX: 0.5,
								flexWrap: "nowrap",
								// justifyContent: "space-between",
							}}
						>
							{stitches.map((stitch, i) => {
								return (
									<Grid
										container
										display="inline"
										sx={{
											flexDirection: "column",
											// cursor: selectedStitch === null && dragStitchesEnabled ? "grab" : "pointer", <- not working
											backgroundColor:
												selectedStitch === i ? theme.palette.primary.light : "transparent",
										}}
									>
										<Grid
											item
											onClick={() =>
												selectedStitch === null || selectedStitch !== i
													? setSelectedStitch(i)
													: setSelectedStitch(null)
											}
											sx={{ border: "2px solid red", display: "flex", justifyContent: "center" }}
										>
											<Stitch key={i} index={i} {...stitch} placement={undefined} />
										</Grid>
										<Grid
											item
											container
											sx={{ display: selectedStitch === i ? "" : "none", flexWrap: "nowrap" }}
										>
											<EditOutlined /> <DeleteOutlined />
										</Grid>
									</Grid>
								);
							})}
						</Grid>
					)}
				</Grid>
				<Grid>
					<IconButton
						sx={{ color: theme.palette.primary.main }}
						disabled={dragStitchesEnabled || selectedStitch !== null}
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
