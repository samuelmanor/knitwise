import { ArrowBackOutlined, ArrowForwardOutlined } from "@mui/icons-material";
import { Box, Grid, IconButton, Tooltip, useTheme } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { setMode } from "../../reducers/projectReducer";
import { useDispatch } from "react-redux";

interface TutorialProps {}

interface TutorialStep {
	target: string; // the id of the element the tutorial is explaining
	content: string; // the text to display in the tutorial
	action?: () => void; // the action to take when the next button is clicked
	// actionBackward?: () => void; // the action to take when the previous button is clicked
	offsetX?: number; // the x offset of the tutorial box
	offsetY?: number; // the y offset of the tutorial box
}

export const Tutorial: FC<TutorialProps> = () => {
	const [step, setStep] = useState(0);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const theme = useTheme();
	const dispatch = useDispatch();

	// attaches the popper to the element the tutorial is explaining
	useEffect(() => {
		if (steps[step].target) {
			setAnchorEl(document.getElementById(steps[step].target));
			console.log(document.getElementById(steps[step].target));
		}
	}, [step]);

	const steps: TutorialStep[] = [
		{
			target: "center",
			content: "welcome to knitwise!",
		},
		{
			target: "edit-save-button",
			content: "the pencil button below opens the pattern editor.",
			action: () => dispatch(setMode("edit")),
			offsetX: 0,
			offsetY: -70,
		},
		{
			target: "center",
			content: "welcome to edit mode",
		},
	];

	/**
	 * Returns the position of the tutorial box.
	 */
	const getPosition = () => {
		const offsetX = steps[step].offsetX || 0;
		const offsetY = steps[step].offsetY || 0;

		// if (anchorEl === null) {
		// 	return {
		// 		top: "50vh",
		// 		left: "50vw",
		// 		transform: "translate(-50%, -50%)",
		// 	};
		// } else {
		return {
			top: anchorEl === null ? "50vh" : anchorEl.getBoundingClientRect().top + offsetY,
			left: anchorEl === null ? "50vw" : anchorEl.getBoundingClientRect().left + offsetX,
			transform: "translate(-50%, -50%)",
		};
		// }
	};

	/**
	 * Advances the tutorial to the next step.
	 */
	const handleNextStep = () => {
		if (steps[step].action) steps[step].action();
		setStep(step + 1);
	};

	return (
		<>
			<Grid
				container
				sx={{
					position: "fixed",
					backgroundColor: theme.palette.primary.main,
					borderRadius: "5px",
					p: 1,
					width: "300px",
					flexDirection: "column",
					...getPosition(),
				}}
				onClick={() => console.log(steps[step].target)}
			>
				{steps[step].content}
				<Grid container sx={{ justifyContent: "center" }}>
					{/* <Tooltip title="previous" placement="left"> */}
					{/* <IconButton
						onClick={() => setStep(step - 1)}
						sx={{ color: theme.palette.text.secondary, display: step === 0 ? "none" : "" }}
					>
						<ArrowBackOutlined fontSize="large" />
					</IconButton> */}
					{/* </Tooltip> */}
					<IconButton
						onClick={handleNextStep}
						sx={{
							color: theme.palette.text.secondary,
							display: step === steps.length - 1 ? "none" : "",
						}}
					>
						<ArrowForwardOutlined fontSize="large" />
					</IconButton>
				</Grid>
			</Grid>
			<Box
				id="center"
				sx={{
					top: "50vh",
					left: "50vw",
					position: "fixed",
					transform: "translate(-50%, -50%)",
				}}
			>
				{/* placeholder element used to center the tutorial box */}
			</Box>
		</>
	);
};
