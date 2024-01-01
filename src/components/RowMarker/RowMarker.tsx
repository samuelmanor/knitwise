import { Grid } from "@mui/material";
import { FC } from "react";

interface RowMarkerProps {
	children?: React.ReactNode;
	currentRow: number;
}

export const RowMarker: FC<RowMarkerProps> = ({ children, currentRow }) => {
	const side = currentRow % 2 === 1 ? "left" : "right";
	if (!children) {
		return null;
	}

	const marker = (
		<Grid
			item
			sx={{
				position: "absolute",
				textAlign: side,
				width: "200%",
				mt: 0.5,
			}}
		>
			{side === "left" ? "WS →" : "← RS"}
		</Grid>
	);

	return (
		<Grid container sx={{ display: "flex", justifyContent: "center" }}>
			{side === "left" ? marker : null}
			{children}
			{side === "right" ? marker : null}
		</Grid>
	);
};
