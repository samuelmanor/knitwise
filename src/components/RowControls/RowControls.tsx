import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";
import { Grid, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextRow, prevRow } from "../../reducers/projectReducer";

interface RowControlsProps {}

/**
 * Contains the controls for navigating from row to row, and the current row number.
 */
export const RowControls: FC<RowControlsProps> = () => {
	const currentRow = useSelector((state: any) => state.projects.currentRow);

	const dispatch = useDispatch();
	const theme = useTheme();

	return (
		<Grid container sx={{ position: "absolute", justifyContent: "center" }}>
			<Grid
				item
				sx={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					gap: 2,
				}}
			>
				{currentRow !== 1 ? (
					<Tooltip
						title="previous row"
						placement="top-end"
						componentsProps={{
							tooltip: {
								sx: {
									color: theme.palette.primary.main,
									fontSize: "1.2rem",
								},
							},
						}}
						PopperProps={{
							modifiers: [
								{
									name: "offset",
									options: {
										offset: [0, 1.5],
									},
								},
							],
						}}
					>
						<IconButton
							onClick={() => dispatch(prevRow())}
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

				<Typography variant="h5" sx={{ color: theme.palette.text.secondary, fontWeight: "bold" }}>
					{currentRow}
				</Typography>

				<Tooltip
					title="next row"
					placement="top-start"
					componentsProps={{
						tooltip: {
							sx: {
								color: theme.palette.primary.main,
								fontSize: "1.2rem",
							},
						},
					}}
					PopperProps={{
						modifiers: [
							{
								name: "offset",
								options: {
									offset: [0, 1.5],
								},
							},
						],
					}}
				>
					<IconButton
						onClick={() => dispatch(nextRow())}
						sx={{ color: theme.palette.text.secondary }}
						size="large"
					>
						<ArrowForwardIosOutlined />
					</IconButton>
				</Tooltip>
			</Grid>
		</Grid>
	);
};
