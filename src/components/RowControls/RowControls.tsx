import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";
import { Grid, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { useSelector } from "react-redux";

interface RowControlsProps {}

export const RowControls: FC<RowControlsProps> = () => {
	const currentRow = useSelector((state: any) => state.projects.currentRow);
	const theme = useTheme();

	return (
		<Grid item sx={{ display: "flex", flexDirection: "row", alignItems: "baseline", gap: 2 }}>
			{currentRow !== 1 ? (
				<Tooltip
					title={<Typography variant="body1">previous row</Typography>}
					placement="top-end"
					slotProps={{ popper: { modifiers: [{ name: "offset", options: { offset: [0, -10] } }] } }}
					sx={{ fontSize: "15px" }}
				>
					<IconButton
						// onClick={() => dispatch(prevRow())}
						sx={{ color: theme.palette.text.secondary }}
						size="large"
					>
						<ArrowBackIosNewOutlined />
					</IconButton>
				</Tooltip>
			) : (
				<IconButton disabled size="large">
					<ArrowBackIosNewOutlined />
				</IconButton>
			)}

			<Typography variant="h5" fontFamily={"Arial"}>
				{currentRow}
			</Typography>

			<Tooltip
				title={<Typography variant="body1">next row</Typography>}
				placement="top-start"
				slotProps={{ popper: { modifiers: [{ name: "offset", options: { offset: [0, -10] } }] } }}
				sx={{ fontSize: "15px" }}
			>
				<IconButton
					// onClick={() => dispatch(nextRow())}
					sx={{ color: theme.palette.text.secondary }}
					size="large"
				>
					<ArrowForwardIosOutlined />
				</IconButton>
			</Tooltip>
		</Grid>
	);
};
