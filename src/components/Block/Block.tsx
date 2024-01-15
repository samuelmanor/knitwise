import { Grid } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Row } from "../Row";
import { StitchProps } from "../Stitch";

interface BlockProps {
	block?: object[];
	currentRow?: number;
	triggerNextRow?: boolean;
	setTriggerNextRow?: React.Dispatch<React.SetStateAction<boolean>>;
	triggerPrevRow?: boolean;
	setTriggerPrevRow?: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * A block of the pattern; made up of many rows.
 * @param rows The rows to be rendered.
 */
export const Block: FC<BlockProps> = ({
	block,
	triggerNextRow,
	setTriggerNextRow,
	triggerPrevRow,
	setTriggerPrevRow,
}) => {
	const [currentBlockRow, setCurrentBlockRow] = useState(1);

	const renderRows = () => {
		return block.map((row, i) => {
			return <Row key={i} row={row as StitchProps[]} i={i} currentRow={currentBlockRow} />;
		});
	};

	/**
	 * Handles the block repeat when going to the next row.
	 */
	useEffect(() => {
		if (triggerNextRow) {
			if (currentBlockRow === block.length) {
				setCurrentBlockRow(1);
			} else {
				setCurrentBlockRow(currentBlockRow + 1);
			}
			setTriggerNextRow(false);
		}
	}, [block, triggerNextRow]);

	/**
	 * Handles the block repeat when going to the previous row.
	 */
	useEffect(() => {
		if (triggerPrevRow) {
			if (currentBlockRow === 1) {
				setCurrentBlockRow(block.length);
			} else {
				setCurrentBlockRow(currentBlockRow - 1);
			}
			setTriggerPrevRow(false);
		}
	});

	return (
		<Grid
			container
			onClick={() => console.log("block length:", block.length, "currentBlockRow:", currentBlockRow)}
			sx={{ border: "2px red solid", width: "fit-content", flexDirection: "row" }}
		>
			<Grid container>{renderRows()}</Grid>
		</Grid>
	);
};
