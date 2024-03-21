import { FC } from "react";
import { nextRow, prevRow, resetProject } from "../../reducers/projectReducer.js";
import { Grid, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined, SettingsOutlined } from "@mui/icons-material";

interface ProjectMenuProps {}

export const ProjectMenu: FC<ProjectMenuProps> = () => {
	const projectName = useSelector(
		(state: any) => state.workspace.projects[state.workspace.currentProjectId].projectName,
	);
	const currentRow = useSelector((state: any) => state.projects.currentRow);

	const dispatch = useDispatch();
	const theme = useTheme();

	return (
		<Grid
			container
			sx={{
				// display: "flex",
				// justifyContent: "space-between",
				// zIndex: 10,
				// // borderTop: "1px solid red",
				// position: "fixed",
				// bottom: 0,
				// backgroundImage:
				// 	"linear-gradient(to right, #f6f2df, #f5f1dc, #f5f0d9, #f4efd6, #f3eed3, #f2edd0, #f2ebce, #f1eacb, #f0e9c8, #efe8c5, #eee6c2, #ede5bf)",
				// alignItems: "center",

				// buffer

				backgroundImage:
					"linear-gradient(to right, #f6f2df, #f5f1dc, #f5f0d9, #f4efd6, #f3eed3, #f2edd0, #f2ebce, #f1eacb, #f0e9c8, #efe8c5, #eee6c2, #ede5bf)",
			}}
		>
			<Grid item onClick={() => console.log(currentRow)}>
				<Typography variant="h2">{projectName}</Typography>
			</Grid>
			<Grid item sx={{ display: "flex", flexDirection: "row", alignItems: "baseline", gap: 2 }}>
				{currentRow !== 1 ? (
					<Tooltip
						title={<Typography variant="body1">previous row</Typography>}
						placement="top-end"
						slotProps={{ popper: { modifiers: [{ name: "offset", options: { offset: [0, -10] } }] } }}
						sx={{ fontSize: "15px" }}
					>
						<IconButton
							onClick={() => dispatch(prevRow())}
							sx={{ color: theme.palette.primary.main }}
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
						onClick={() => dispatch(nextRow())}
						sx={{ color: theme.palette.primary.main }}
						size="large"
					>
						<ArrowForwardIosOutlined />
					</IconButton>
				</Tooltip>
			</Grid>
			<Grid item>
				<IconButton>
					<SettingsOutlined />
				</IconButton>
			</Grid>
		</Grid>
	);
};
