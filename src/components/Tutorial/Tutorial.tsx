import { Grid, Popper, useTheme } from "@mui/material";
import { FC, useEffect, useState } from "react";

interface TutorialProps {}

const steps = [
	{
		target: null,
		content: <div>one</div>,
	},
	{
		target: "tutorialtest",
		content: <div>two</div>,
	},
];

export const Tutorial: FC<TutorialProps> = () => {
	const [step, setStep] = useState(0);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const theme = useTheme();

	// attaches the popper to the element the tutorial is explaining
	useEffect(() => {
		if (steps[step].target) {
			setAnchorEl(document.getElementById(steps[step].target));
		}
	}, [step]);

	return (
		<Grid container sx={{ backgroundImage: theme.palette.background.default, height: "100vh", width: "100vw" }}>
			<Popper anchorEl={anchorEl} open={true} placement="top">
				<div onClick={() => console.log(anchorEl)}>
					{steps[step].content}
					<button
						onClick={() => setStep(step + 1)}
						style={{ display: step === steps.length - 1 ? "none" : "" }}
					>
						next
					</button>
					<button onClick={() => setStep(step - 1)} style={{ display: step === 0 ? "none" : "" }}>
						previous
					</button>
				</div>
			</Popper>
		</Grid>
	);
};
