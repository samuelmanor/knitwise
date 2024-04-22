import { Grid } from "@mui/material";
import { FC } from "react";
// import { useSelector } from "react-redux";
import { stitches } from "../../utils/stitches";
import { Stitch } from "../Stitch";

interface BlockSearchProps {
	// closeBlockSearch: () => void;
	// addBlock: (blockName: string, stitches: Object) => void;
	content: "blocks" | "stitches";
	select: (stitch: any) => void;
}

// {Object.keys(availableStitches).map((stitch, i) => {
// 	return (
// 		<Grid
// 			item
// 			key={`${stitch}${i}`}
// 			onClick={() =>
// 				handleRowEdit(availableStitches[stitch], selectedStitch ? "edit" : "add")
// 			}
// 		>
// 			<Stitch view="search" {...availableStitches[stitch]} />
// 		</Grid>
// 	);
// })}

export const Search: FC<BlockSearchProps> = ({ content, select }) => {
	// const savedBlocks = useSelector((state: any) => state.workspace.savedBlocks);

	if (content === "blocks") {
		return <Grid container>block search</Grid>;
	}

	if (content === "stitches") {
		return (
			<Grid container>
				{Object.keys(stitches).map((stitch, i) => {
					return (
						<Grid item key={`${stitch}${i}`} onClick={() => select(stitch)}>
							<Stitch view="search" {...stitches[stitch]} />
						</Grid>
					);
				})}
			</Grid>
		);
	}
};
