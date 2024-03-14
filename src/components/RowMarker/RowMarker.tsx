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
				width: "50px",
				height: "fit-content",
				mt: "10px",
				// ml: position === "right" ? 38 : 0,
				// mr: position === "left" ? 38 : 0,
				border: "1px solid red",
			}}
			data-testid={`rowmarker${position}`}
		>
			<Grid item>{label}</Grid>
		</Grid>
	);
};
