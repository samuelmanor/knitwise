import { ClickAwayListener, Grid } from "@mui/material";
import { FC } from "react";
import { useSelector } from "react-redux";

interface BlockSearchProps {
	closeBlockSearch: () => void;
	addBlock: (blockName: string, stitches: Object) => void;
}

export const BlockSearch: FC<BlockSearchProps> = ({ closeBlockSearch, addBlock }) => {
	const savedBlocks = useSelector((state: any) => state.workspace.savedBlocks);

	return (
		<ClickAwayListener onClickAway={closeBlockSearch}>
			<Grid container>
				{savedBlocks.map((block: any, i: number) => {
					return (
						<Grid
							item
							key={`blockSearch${block.name}${i}`}
							onClick={() => addBlock(block.blockName, block.stitches)}
						>
							{block.blockName}
						</Grid>
					);
				})}
			</Grid>
		</ClickAwayListener>
	);
};
