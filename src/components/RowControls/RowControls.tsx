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
	const currentRow = useSelector((state: any) => state.project.currentProjectRow);

	const dispatch = useDispatch();
	const theme = useTheme();

	return (
		<Grid container data-testid={"row-controls"}>
			<Grid
				item
				sx={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					gap: 2,
				}}
			>
				<Tooltip
					title="to previous row"
					placement="top-end"
					componentsProps={{
						tooltip: {
							sx: {
								backgroundColor: theme.palette.primary.main,
								color: theme.palette.text.secondary,
								fontSize: "1.2rem",
								borderBottomLeftRadius: 0,
								borderBottomRightRadius: 0,
							},
						},
					}}
					PopperProps={{
						modifiers: [
							{
								name: "offset",
								options: {
									offset: [0, -4],
								},
							},
						],
					}}
				>
					<>
						<IconButton
							onClick={() => dispatch(prevRow())}
							sx={{ color: theme.palette.text.secondary, transform: "rotate(270deg)" }}
							disabled={currentRow === 1}
							data-testid="previousRowButton"
						>
							<ArrowBackIosNewOutlined fontSize="large" />
						</IconButton>
					</>
				</Tooltip>
				<Tooltip
					title={"current row"}
					placement="bottom"
					componentsProps={{ tooltip: { sx: { color: theme.palette.text.secondary, fontSize: "1rem" } } }}
					PopperProps={{
						modifiers: [{ name: "offset", options: { offset: [0, -23] } }],
					}}
				>
					<Typography
						sx={{
							color: theme.palette.text.secondary,
							fontWeight: "bold",
							cursor: "default",
							fontSize: "2rem",
						}}
						id="row-control-number"
						data-testid="currentRowNumber"
					>
						{currentRow}
					</Typography>
				</Tooltip>
				<Tooltip
					title="to next row"
					placement="top-start"
					componentsProps={{
						tooltip: {
							sx: {
								backgroundColor: theme.palette.primary.main,
								color: theme.palette.text.secondary,
								fontSize: "1.2rem",
								borderBottomLeftRadius: 0,
								borderBottomRightRadius: 0,
							},
						},
					}}
					PopperProps={{
						modifiers: [
							{
								name: "offset",
								options: {
									offset: [0, -4],
								},
							},
						],
					}}
				>
					<IconButton
						onClick={() => dispatch(nextRow())}
						sx={{
							color: theme.palette.text.secondary,
							transform: "rotate(270deg)",
						}}
						data-testid="nextRowButton"
					>
						<ArrowForwardIosOutlined fontSize="large" />
					</IconButton>
				</Tooltip>
			</Grid>
		</Grid>
	);
};
