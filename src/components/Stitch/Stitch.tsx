import { FC } from "react";
import { StitchTip } from "../StitchTip";
import { Grid } from "@mui/material";

export interface StitchProps {
	name?: string;
	abbreviation?: string;
	symbol?: string;
	description?: string;
	width?: number;
	// userGenerated?: boolean; -> future feature
}
/*

knitStitch = {
	name: "knit",
	abbreviation: "k",
	width: 1,
	symbol: "*",
	direction: "knit one"
}

purlStitch = {
	name: "purl",
	abbreviation: "p",
	width: 1,
	symbol: "-",
	direction: "purl one"
}

2x1lpc = { // 2-1lpc ; might not have a ws?
	name: "2/1 left purl cross",
	abbreviation: "2/1lpc",
	symbol: "-\  \*"
	direction: "slip two stitches onto cable needle and hold in front, purl one, knit two from cable needle"
}

const 2x1rpc = {
	name: "2/1 right purl cross",
	abbreviation: "2/1rpc",
	symbol: "*\  \-"
	directions: "slip one stitch onto cable needle and hold in back, knit two, purl one from cable needle"
}

2x1lpc = { // 2-1lpc ; might not have a ws?
	name: "2/1 left purl cross",
	abbreviation: "2/1lpc",
	symbol: "-\  \*"
	directions: "slip two stitches onto cable needle and hold in front, purl one, knit two from cable needle"
}

*/

/**
 * An individual stitch.
 * @param name The name of the stitch.
 * @param abbreviation The abbreviation of the stitch.
 * @param description The description of the stitch.
 * @param width The width of the stitch in regards to grid columns.
 */
export const Stitch: FC<StitchProps> = ({ name, abbreviation, description, symbol, width }) => {
	return (
		<StitchTip name={name} description={description}>
			<Grid item fontSize={30} sx={{ cursor: "pointer", mt: 1, mb: 1 }}>
				{symbol}
			</Grid>
		</StitchTip>
		// <Grid item>{abbreviation}</Grid>
	);
};
