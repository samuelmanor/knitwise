import { ClickAwayListener, Grid, IconButton, Typography } from "@mui/material";
import { FC, useState } from "react";
import { RowProps } from "../Row/Row";
import { Stitch, StitchProps } from "../Stitch";
import { useDispatch, useSelector } from "react-redux";
import { AddOutlined, CancelOutlined, DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { updateRow } from "../../reducers/projectReducer";

interface RowEditorProps {
	row: [];
	blockIndex: number;
	rowIndex: number;
}

export const RowEditor: FC<RowEditorProps> = ({ row, blockIndex, rowIndex }) => {
	const availableStitches = require("../../utils/stitches").stitches;
	const [showStitchSelect, setShowStitchSelect] = useState(false); // rename to showStitchSelectMenu
	const [showStitchOptions, setShowStitchOptions] = useState(false);
	const [selectedStitch, setSelectedStitch] = useState<number | null>(null);

	const dispatch = useDispatch();

	// if row is empty (just created?) then show stitch select right away

	const handleRowEdit = (newStitch: StitchProps, action: "edit" | "add") => {
		if (action === "add") {
			setShowStitchSelect(false);
			dispatch(updateRow({ blockIndex, rowIndex, stitches: [...row, newStitch] }));
			setSelectedStitch(null);
		} else if (action === "edit") {
			setShowStitchSelect(false);
			const newRow = row.map((stitch, i) => {
				if (i === selectedStitch) {
					return newStitch;
				} else {
					return stitch;
				}
			});
			dispatch(updateRow({ blockIndex, rowIndex, stitches: newRow }));
			setSelectedStitch(null);
		}
	};

	const handleDeleteStitch = (index: number) => {
		const updatedRow = row.filter((stitch, i) => i !== index);
		dispatch(updateRow({ blockIndex, rowIndex, stitches: updatedRow }));
		setSelectedStitch(null);
	};

	const stitchSelect = (
		<ClickAwayListener onClickAway={() => setShowStitchSelect(false)}>
			<Grid container sx={{ position: "absolute" }}>
				available stitches:
				<Grid container sx={{ border: "2px solid green" }}>
					{/* {Object.keys(availableStitches).map((stitch, index) => {
						// remove underscore from stitch names that begin with numbers
						const cleanedStitchName = stitch.replace(/_/g, " ");
						return (
							<Grid
								item
								key={`${stitch}${index}`}
								onClick={() =>
									handleRowEdit(availableStitches[stitch], selectedStitch ? "edit" : "add")
								}
							>
								{cleanedStitchName}
							</Grid>
						);
					})} */}
					{Object.keys(availableStitches).map((stitch, i) => {
						return (
							<Grid
								item
								key={`${stitch}${i}`}
								onClick={() =>
									handleRowEdit(availableStitches[stitch], selectedStitch ? "edit" : "add")
								}
							>
								<Stitch view="search" {...availableStitches[stitch]} />
							</Grid>
						);
					})}
				</Grid>
				<Grid item>
					<IconButton onClick={() => setShowStitchSelect(false)}>
						<CancelOutlined />
					</IconButton>
				</Grid>
			</Grid>
		</ClickAwayListener>
	);

	const stitches = row.map((stitch: StitchProps, i) => {
		return (
			<Grid
				item
				display="inline"
				onClick={() => {
					setShowStitchOptions(!showStitchOptions);
					setSelectedStitch(i);
				}}
				sx={{ background: "green" }}
			>
				<Stitch view="edit" {...stitch} />
				{showStitchOptions && selectedStitch === i ? (
					<ClickAwayListener onClickAway={() => setShowStitchOptions(false)}>
						<Grid container>
							<Grid item>
								<IconButton onClick={() => setShowStitchSelect(true)}>
									<EditOutlined />
								</IconButton>
							</Grid>
							<Grid item>
								<IconButton onClick={() => handleDeleteStitch(selectedStitch)}>
									<DeleteOutlined />
								</IconButton>
							</Grid>
						</Grid>
					</ClickAwayListener>
				) : null}
			</Grid>
		);
	});

	return (
		<Grid container>
			{stitches}
			<Grid item>
				<IconButton onClick={() => setShowStitchSelect(true)}>
					<AddOutlined />
				</IconButton>
			</Grid>
			{showStitchSelect ? stitchSelect : null}
		</Grid>
	);
};
