import { Box, Grid } from "@mui/material";
import { FC } from "react";

interface RowMarkerProps {
	// children?: React.ReactNode;
	currentRow: number;
}

/**
 * A marker that indicates the current row.
 * @param children The content to be wrapped by the marker.
 * @param currentRow The current row.
 */
export const RowMarker: FC<RowMarkerProps> = ({ currentRow }) => {
	const side = currentRow % 2 === 1;
	const label = side ? "WS →" : "← RS";

	const marker = <Grid item>{label}</Grid>;

	return (
		<Grid
			container
			sx={{
				backgroundColor: "red",
				display: "flex",
				position: "absolute",
				// flexDirection: side ? "row" : "row-reverse",
			}}
		>
			{marker}
			{/* <Box>{children}</Box> */}
		</Grid>
	);
};
