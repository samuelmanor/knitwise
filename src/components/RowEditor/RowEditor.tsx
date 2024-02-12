import { ClickAwayListener, Grid, IconButton, Typography } from "@mui/material";
import { FC, useState } from "react";
import { RowProps } from "../Row/Row";
import { Stitch, StitchProps } from "../Stitch";
import { useDispatch, useSelector } from "react-redux";
import { AddOutlined, CancelOutlined } from "@mui/icons-material";
import { updateRow } from "../../reducers/projectReducer";

interface RowEditorProps {
	row: [];
	blockIndex: number;
	rowIndex: number;
}

export const RowEditor: FC<RowEditorProps> = ({ row, blockIndex, rowIndex }) => {
	const availableStitches = require("../../utils/stitches").stitches;
	const [showStitchSelect, setShowStitchSelect] = useState(false);
	// const [showStitchOptions, setShowStitchOptions] = useState(false); // delete or edit individual existing stitch

	const dispatch = useDispatch();

	const handleAddStitch = (stitch: StitchProps) => {
		setShowStitchSelect(false);
		dispatch(updateRow({ blockIndex, rowIndex, stitches: [...row, stitch] }));
	};

	const stitchSelect = (
		<ClickAwayListener onClickAway={() => setShowStitchSelect(false)}>
			<Grid container>
				available stitches:
				<Grid container>
					{Object.keys(availableStitches).map((stitch, index) => {
						// remove underscore from stitch names that begin with numbers
						const cleanedStitchName = stitch.replace(/_/g, " ");
						return (
							<Grid
								item
								key={`${stitch}${index}`}
								onClick={() => handleAddStitch(availableStitches[stitch])}
							>
								{cleanedStitchName}
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
			<Grid item display="inline">
				<Stitch view="edit" {...stitch} />
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
