import { FC, useEffect, useState } from "react";
import { StitchTip } from "../StitchTip";
import { StitchIcon } from "../StitchIcon";
import stitches from "../../../stitches";
import { Grid } from "@mui/material";

export interface StitchProps {
	name: string;
	// userGenerated?: boolean; -> future feature
}

export const Stitch: FC<StitchProps> = ({ name }) => {
	const [currentStitch, setCurrentStitch] = useState({
		name: "",
		abbreviation: "",
		description: "",
		width: 0,
	});

	useEffect(() => {
		setCurrentStitch(stitches[name]);
	}, [name]);

	return (
		<StitchTip
			name={currentStitch?.name}
			abbreviation={currentStitch?.abbreviation}
			description={currentStitch?.description}
		>
			<Grid item sx={{ backgroundColor: "red" }} onClick={() => console.log(name, currentStitch)}>
				<StitchIcon stitchName={name} />
			</Grid>
		</StitchTip>
	);
};

// make a StitchTip component that's a reworking of the Tooltip component
