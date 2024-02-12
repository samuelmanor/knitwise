import { Grid, IconButton, Typography } from "@mui/material";
import { FC, useState } from "react";
import { RowProps } from "../Row/Row";
import { Stitch, StitchProps } from "../Stitch";
import { useSelector } from "react-redux";
import { AddOutlined } from "@mui/icons-material";

interface RowEditorProps {
	row: [];
}

export const RowEditor: FC<RowEditorProps> = ({ row }) => {
	const availableStitches = require("../../utils/stitches").stitches;
	const [showStitchSelect, setShowStitchSelect] = useState(false);

	const stitchSelect = (
		<Grid container onClick={() => console.log(Object.keys(availableStitches))}>
			available stitches:
			<Grid container>
				{Object.keys(availableStitches).map((stitch, index) => {
					// remove underscore from stitch names that begin with numbers
					const cleanedStitchName = stitch.replace(/_/g, " ");
					return (
						<Grid item key={`${stitch}${index}`}>
							{cleanedStitchName}
						</Grid>
					);
				})}
			</Grid>
		</Grid>
	);

	const stitches = row.map((stitch: StitchProps, i) => {
		return (
			<Grid item display="inline">
				<Stitch view="search" {...stitch} />
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
