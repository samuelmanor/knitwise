import { Grid } from "@mui/material";
import { FC } from "react";

interface RowMarkerProps {
	position?: "left" | "right";
}

/**
 * A marker that indicates the current row.
 * @param position The position of the marker, either "left" or "right".
 */
export const RowMarker: FC<RowMarkerProps> = ({ position }) => {
	const label = position === "left" ? "WS →" : "← RS";

	return (
		<Grid
			container
			sx={{
				position: "absolute",
				width: 50,
				height: 50,
				mt: 1.5,
				ml: position === "right" ? 20 : 0,
				mr: position === "left" ? 20 : 0,
			}}
			data-testid={`rowmarker${position}`}
		>
			<Grid item>{label}</Grid>
		</Grid>
	);
};
