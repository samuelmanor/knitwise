import { ArrowOutwardOutlined } from "@mui/icons-material";
import { ClickAwayListener, Grid, Modal, Typography, useTheme } from "@mui/material";
import { FC } from "react";

interface InfoProps {
	show: boolean;
	close: () => void;
}

export const Info: FC<InfoProps> = ({ show, close }) => {
	const theme = useTheme();
	return (
		// <Modal open={show}>
		// 	<ClickAwayListener onClickAway={close}>
		<Grid
			container
			sx={{
				backgroundColor: theme.palette.primary.dark,
				width: "500px",
				height: "500px",
				borderRadius: "5px",
				position: "fixed",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				cursor: "default",
				gap: 2,
			}}
		>
			<Grid container sx={{ alignItems: "center", justifyContent: "center", gap: 1 }}>
				<Typography variant="h4" sx={{ color: theme.palette.text.secondary }}>
					check out
				</Typography>
				<Typography
					variant="h4"
					sx={{
						backgroundColor: theme.palette.text.secondary,
						color: theme.palette.primary.dark,
						// fontWeight: "bold",
						paddingY: 0.5,
						paddingX: 1,
						borderRadius: "5px",
						alignItems: "center",
						display: "flex",
						cursor: "pointer",
					}}
				>
					my github
					<ArrowOutwardOutlined fontSize="small" />
				</Typography>
			</Grid>
			<Typography>questions? comments? suggestions?</Typography>
			<div>[google sheets embed]</div>
			<Typography>if you enjoy this app, please consider buying me a coffee:</Typography>
			<div>[kofi]</div>
		</Grid>
		// 	</ClickAwayListener>
		// </Modal>
	);
};
