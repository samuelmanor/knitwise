import { FC, useState } from "react";
import { StitchTip } from "../StitchTip";
import { ClickAwayListener, Grid, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";

interface StitchPlacement {
	blockIndex: number;
	rowIndex: number;
}

export interface StitchProps {
	name: string;
	abbreviation: string;
	symbol: string;
	description: string;
	width: number;
	index?: number;
	placement?: StitchPlacement;
	disableStitchTip?: boolean;
	selected?: boolean;
	setSelected?: (selected: boolean) => void;
	// userGenerated?: boolean; -> future feature ?
}

/**
 * Represents a stitch in a pattern.
 * @param name The name of the stitch.
 * @param abbreviation The abbreviation of the stitch.
 * @param symbol The symbol used to represent the stitch.
 * @param description An explanation of how to work the stitch.
 * @param width The number of stitches the stitch takes up.
 * @param index The index of the stitch.
 * @param placement The placement of the stitch in the pattern.
 * @param disableStitchTip Whether or not to disable the stitch tip.
 */
export const Stitch: FC<StitchProps> = ({
	name,
	abbreviation,
	description,
	symbol,
	width,
	index,
	disableStitchTip,
	selected,
	setSelected,
}) => {
	const stitchDisplaySetting = useSelector((state: any) => state.project.settings.stitchDisplay);
	const [showMenu, setShowMenu] = useState(false);

	// /**
	//  * Edits a stitch in the row.
	//  * @param newStitch The new stitch to replace the old one.
	//  * @param index The index of the stitch to be replaced.
	//  */
	// const handleEditStitch = (newStitch: StitchProps, index: number) => {
	// 	const updatedRow = stitches.map((stitch, i) => {
	// 		if (i === index) {
	// 			return newStitch;
	// 		} else {
	// 			return stitch;
	// 		}
	// 	});
	// 	dispatch(updateRow({ blockIndex, rowIndex, stitches: updatedRow }));
	// 	setSelectedStitch(null);
	// 	setShowStitchMenu(false);
	// };

	const theme = useTheme();

	return (
		<StitchTip name={name} description={description} disabled={disableStitchTip}>
			<Tooltip
				componentsProps={{
					tooltip: {
						sx: {
							"zIndex": "100",
							"backgroundColor": theme.palette.background.paper,
							"& .MuiTooltip-arrow": {
								color: theme.palette.background.paper,
							},
						},
					},
				}}
				PopperProps={{
					modifiers: [
						{
							name: "offset",
							options: {
								offset: [0, 5],
							},
						},
					],
				}}
				title={
					<ClickAwayListener
						onClickAway={() => {
							// setShowMenu(false);
							// setSelected(false);
						}}
					>
						<Grid container>
							<Grid item>
								<IconButton
									// onClick={() => setShowStitchMenu(true)}
									sx={{ color: theme.palette.primary.main }}
								>
									<EditOutlined />
								</IconButton>
							</Grid>
							<Grid item>
								<IconButton
									// onClick={() => handleDeleteStitch(i)}
									sx={{ color: theme.palette.primary.main }}
								>
									<DeleteOutlined />
								</IconButton>
							</Grid>
						</Grid>
					</ClickAwayListener>
				}
				arrow
				disableFocusListener
				disableHoverListener
				disableTouchListener
				open={selected && showMenu}
			>
				<Grid
					item
					sx={{
						marginY: 0.5,
						paddingX: 0.5,
						display: "flex",
						justifyContent: "center",
						letterSpacing: symbol.length * 0.5,
						border: symbol.length > 1 ? `2px solid ${theme.palette.primary.main}` : null,
						borderRadius: "5px",
						color: theme.palette.text.primary,
						userSelect: "none",
						backgroundColor: selected ? "red" : "transparent",
					}}
					data-testid={`stitch${index}${abbreviation}`}
					onClick={() => setShowMenu(!showMenu)}
				>
					<Typography
						sx={{
							fontSize: {
								xs: "1.3rem",
								sm: "1.5rem",
							},
							whiteSpace: "nowrap",
						}}
					>
						{stitchDisplaySetting === "symbol" ? symbol : abbreviation}
					</Typography>
				</Grid>
			</Tooltip>
		</StitchTip>
	);
};

{
	/* <Tooltip
								componentsProps={{
									tooltip: {
										sx: {
											"zIndex": "100",
											"backgroundColor": theme.palette.background.paper,
											"& .MuiTooltip-arrow": {
												color: theme.palette.background.paper,
											},
										},
									},
								}}
								title={
									<Grid container>
										<Grid item>
											<IconButton
												onClick={() => setShowStitchMenu(true)}
												sx={{ color: theme.palette.primary.main }}
											>
												<EditOutlined />
											</IconButton>
										</Grid>
										<Grid item>
											<IconButton
												onClick={() => handleDeleteStitch(i)}
												sx={{ color: theme.palette.primary.main }}
											>
												<DeleteOutlined />
											</IconButton>
										</Grid>
									</Grid>
								}
								arrow
								disableFocusListener
								disableHoverListener
								disableTouchListener
								open={selectedStitch === i && !showStitchMenu}
							></Tooltip> */
}
