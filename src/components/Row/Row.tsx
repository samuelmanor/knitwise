import { Grid, IconButton, Tooltip, useTheme } from "@mui/material";
import { FC, ReactNode } from "react";
import { Stitch, StitchProps } from "../Stitch";
import { useDispatch, useSelector } from "react-redux";
import { DirectionsOverlay } from "../DirectionsOverlay";
import { AddOutlined, DeleteOutlined, EditOutlined, SaveOutlined, SwapVertOutlined } from "@mui/icons-material";
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
	// showLeftRowMarker?: boolean;
	// showRightRowMarker?: boolean;
}

/**
 * A row of stitches.
 * @param stitches The stitches to be rendered.
 * @param highlightRow Whether or not to highlight the row to indicate that it's currently being worked.
 * @param rowIndex The index of the row.
 * @param blockIndex The index of the block that the row is in.
 * @param editingBlock Whether or not the block that contains the row is currently being edited.
 * @param draftRow The index of the row that is currently being edited.
 * @param showLeftRowMarker Whether or not to show the wrong side marker on the left side of the row.
 * @param showRightRowMarker Whether or not to show the right side marker on the right side of the row.
 */
export const Row: FC<RowProps> = ({
	stitches,
	highlightRow,
	rowIndex,
	blockIndex,
	editingBlock,
	draftRow,
	setDraftRow,
	// showLeftRowMarker,
	// showRightRowMarker,
}) => {
	const mode = useSelector((state: any) => state.workspace.mode);
	const stitchDisplaySetting = useSelector((state: any) => state.workspace.settings.stitchDisplay);

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

		return stitchDisplaySetting === "symbol" ? total * 18 : total * 30; // abbreviations need more space than symbols
	};

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

	// this row is being worked in the chart
	if (mode === "chart" && highlightRow) {
		return <DirectionsOverlay rowIndex={rowIndex} blockIndex={blockIndex} row={row} />;
	}

	// this row is being edited
	if (mode === "editBlock" && editingBlock && draftRow === rowIndex) {
		return (
			<Grid container sx={{ border: "2px solid red" }}>
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
					<SortableList
						items={stitches.map((item, i) => ({
							id: i,
							item: <Stitch {...item} placement={{ rowIndex, blockIndex }} />,
						}))}
						direction="horizontal"
					/>
				</Grid>
				<Grid>
					<IconButton sx={{ color: theme.palette.primary.main }}>
						<AddOutlined />
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

/*

	const row = (
		<Grid
			container
			justifyContent="space-between"
			sx={{
				backgroundColor: `${highlightRow && mode === "chart" ? theme.palette.primary.light : "transparent"}`,
				pl: 0.5,
				pr: 0.5,
				minWidth: calcWidth(),
				flexWrap: "nowrap",
				// border: "2px solid red",
			}}
			data-testid={`row${rowIndex}`}
		>

			{stitches.map((stitch, i) => {
				return (
					<Grid item display="inline">
						<Stitch
							key={i}
							index={i}
							view={mode === "editBlock" && editingBlock && draftRow === rowIndex ? "edit" : "chart"}
							{...stitch}
						/>
					</Grid>
				);
			})}
		</Grid>
	);

		if (mode === "chart" && highlightRow) {
		return (
			<Grid container>
				<DirectionsOverlay rowIndex={rowIndex} blockIndex={blockIndex} row={row} />
			</Grid>
		);
	}

		// (draftRow === rowIndex && mode === "editBlock")

	// if (mode === "editBlock" && editingBlock && draftRow === rowIndex) {
	// 	return <div onClick={() => setDraftRow(null)}>test</div>;
	// }

		// this row is being edited
	if (mode === "editBlock" && editingBlock && draftRow === rowIndex) {
		return (
			<Grid container sx={{ flexWrap: "nowrap", gap: 1, alignItems: "center" }}>
				<Grid
					container
					sx={{
						border: `2px solid ${theme.palette.primary.main}`,
						borderRadius: "5px",
						backgroundColor: theme.palette.background.paper,
						flexWrap: "nowrap",
					}}
					onClick={() => console.log(rowIndex, blockIndex)}
				>
					<SortableList
						items={stitches.map((item, i) => ({
							id: i,
							item: <Stitch {...item} view="edit" placement={{ rowIndex, blockIndex }} />,
						}))}
						direction="horizontal"
					/>
				</Grid>
				<Grid
					container
					sx={{
						flexDirection: "row",
						flexWrap: "nowrap",
						gap: 0.5,
					}}
				>
					<Grid item>
						<IconButton
							sx={{
								color: theme.palette.primary.main,
								transform: "scale(1.5)",
								height: "fit-content",
								width: "fit-content",
							}}
							onClick={() => {
								setDraftRow(null);
								console.log("hi");
							}}
						>
							<SaveOutlined />
						</IconButton>
					</Grid>
				</Grid>
			</Grid>
		);
	}

		// block is being edited, but this specific row is not
	if (mode === "editBlock" && editingBlock) {
		return (
			<Grid container sx={{ flexWrap: "nowrap", gap: 1, alignItems: "center" }}>
				<Grid
					item
					sx={{
						border: `2px solid ${theme.palette.primary.main}`,
						borderRadius: "5px",
						backgroundColor: theme.palette.background.paper,
					}}
				>
					{row}
				</Grid>
				<Grid
					item
					container
					sx={{
						flexDirection: "row",
						flexWrap: "nowrap",
						gap: 0.5,
					}}
				>
					{draftRow === null ? (
						<>
							<Grid item>
								<IconButton
									sx={{
										color: theme.palette.primary.main,
										transform: "scale(1.5)",
										height: "fit-content",
										width: "fit-content",
									}}
									onClick={() => setDraftRow(rowIndex)}
								>
									<EditOutlined />
								</IconButton>
							</Grid>
							<Grid item>
								<IconButton
									disableRipple
									sx={{
										color: theme.palette.primary.main,
										transform: "scale(1.5)",
										height: "fit-content",
										width: "fit-content",
										cursor: "grab",
									}}
								>
									<SwapVertOutlined />
								</IconButton>
							</Grid>
							<Grid item>
								<IconButton
									sx={{
										color: theme.palette.primary.main,
										transform: "scale(1.5)",
										height: "fit-content",
										width: "fit-content",
									}}
									onClick={() => dispatch(removeBlockRow({ blockIndex, rowIndex }))}
								>
									<DeleteOutlined />
								</IconButton>
							</Grid>
						</>
					) : null}
				</Grid>
			</Grid>
		);
	}


*/
