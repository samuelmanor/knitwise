import { Grid } from "@mui/material";
import { FC } from "react";
import { Stitch, StitchProps } from "../Stitch";

interface RowProps {
	row: StitchProps[];
	highlightRow?: boolean;
	index?: number;
}

/**
 * A row of stitches.
 * @param row The stitches to be rendered.
 * @param highlightRow Whether or not to highlight the row to indicate that it's currently being worked.
 * @param index The index of the row.
 */
export const Row: FC<RowProps> = ({ row, highlightRow, index }) => {
	// const testRowToHighlight = useSelector((state: any) => state.projects.blocks[i]);
	// const currentRow = useSelector((state: any) => state.projects.currentRow);

	// const renderStitches = () => {
	// 	return row.map((stitch: StitchProps, i) => {
	// 		return (
	// 			<Grid item display="inline">
	// 				<Stitch key={i} {...stitch} />
	// 			</Grid>
	// 		);
	// 	});
	// };

	if (!row) {
		return null; // make error row ?
	}

	// figure something out about the width of stitches - flex-grow?
	return (
		<Grid
			container
			// flexDirection="row"
			// width="fit-content"
			justifyContent="space-evenly"
			border="2px solid purple"
			// sx={{ color: rowToHighlight === i + 1 ? "red" : "black" }}
			// onClick={() => console.log("hi")}
			sx={{ color: `${highlightRow ? "red" : "black"}` }}
			// pl={1}
			// pr={1}
			data-testid={`row${index}`}
		>
			{/* {renderStitches()} */}
			{row.map((stitch, i) => {
				return (
					<Grid item display="inline">
						<Stitch key={i} index={i} {...stitch} />
					</Grid>
				);
			})}
		</Grid>
	);
};
