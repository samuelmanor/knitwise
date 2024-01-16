import { Grid } from "@mui/material";
import { FC } from "react";
import { Stitch, StitchProps } from "../Stitch";
import { useSelector } from "react-redux";

interface RowProps {
	stitches?: JSX.Element[]; // takes an array of Stitch components
	row?: StitchProps[];
	totalRowNum?: number; // total number of rows in the block
	i: number; // index of the row
}

/**
 * A row of stitches.
 * @param stitches The stitches to be rendered.
 */
export const Row: FC<RowProps> = ({ stitches, row, i, totalRowNum }) => {
	const currentRow = useSelector((state: any) => state.projects.currentRow);

	const renderStitches = () => {
		return row.map((stitch: StitchProps, i) => {
			return (
				<Grid item display="inline">
					<Stitch key={i} {...stitch} />
				</Grid>
			);
		});
	};

	// figure something out about the width of stitches - flex-grow?
	return (
		<Grid
			container
			// flexDirection="row"
			// width="fit-content"
			justifyContent="space-evenly"
			// border="2px solid purple"
			// sx={{ color: `${highlight ? "red" : "black"}`, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
			pl={1}
			pr={1}
		>
			{renderStitches()}
		</Grid>
	);
};
