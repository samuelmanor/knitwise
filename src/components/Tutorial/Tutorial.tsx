import { Grid, useTheme } from "@mui/material";
import { FC, useState } from "react";

interface TutorialProps {}

const steps = [
	{
		target: null,
		content: <div>one</div>,
	},
	{
		target: null,
		content: <div>two</div>,
	},
];

export const Tutorial: FC<TutorialProps> = () => {
	const [step, setStep] = useState(0);

	const theme = useTheme();

	return (
		<Grid container sx={{ backgroundImage: theme.palette.background.default, height: "100vh", width: "100vw" }}>
			{steps[step].content}
			<button onClick={() => setStep(step + 1)} style={{ display: step === steps.length - 1 ? "none" : "" }}>
				next
			</button>
			<button onClick={() => setStep(step - 1)} style={{ display: step === 0 ? "none" : "" }}>
				previous
			</button>
		</Grid>
	);
};
