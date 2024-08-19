import { Grid, useTheme } from "@mui/material";
import { FC } from "react";

interface SavedBlocksProps {
	close: () => void;
}

export const SavedBlocks: FC<SavedBlocksProps> = ({ close }) => {
	const theme = useTheme();

	return (
		<Grid container sx={{ backgroundColor: theme.palette.primary.main }}>
			{/* add new blank block / add from saved blocks */}
			{/* <Grid container>
				<Grid item>add new blank block</Grid>
				<Grid item>add from saved blocks</Grid>
			</Grid>
			<Grid item onClick={close}>
				close
			</Grid> */}
			penis
		</Grid>
	);
};
