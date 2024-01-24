// handles things just within a single project like the current row and all the blocks
import { createSlice } from "@reduxjs/toolkit";

export const testProject3 = {
	// projectName: "test project",
	currentProjectRow: 1,
	blocks: [
		{
			currentBlockRow: 1,
			stitches: [
				[
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
				],
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
				],
			],
		},
		{
			currentBlockRow: 1,
			stitches: [
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
				],
				[
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
				],
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
				],
			],
		},
		{
			currentBlockRow: 1,
			stitches: [
				[
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
				],
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
				],
				[
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
				],
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
				],
			],
		},
		{
			currentBlockRow: 1,
			stitches: [
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
				],
				[
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
				],
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
				],
			],
		},
		{
			currentBlockRow: 1,
			stitches: [
				[
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
				],
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
				],
				[
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
				],
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
				],
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
				],
				[
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
				],
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
				],
				[
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
				],
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
				],
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
				],
			],
		},
	],
};

const projectSlice = createSlice({
	name: "project",
	initialState: {
		project: testProject3,
		currentRow: 1,
	},
	reducers: {
		updateBlockRow(state, direction) {
			const calculateNextPosition = (blockLength, previousPosition) => {
				if (direction.payload.direction === "next") {
					if (previousPosition < blockLength) {
						return previousPosition + 1;
					} else if (previousPosition === blockLength) {
						return 1;
					} else if (previousPosition > blockLength) {
						return previousPosition;
					}
				} else if (direction.payload.direction === "previous") {
					if (previousPosition > 1) {
						return previousPosition - 1;
					} else if (previousPosition === 1) {
						return blockLength;
					} else if (previousPosition < 1) {
						return previousPosition;
					}
				}
			};

			return {
				...state,
				project: {
					...state.project,
					blocks: state.project.blocks.map(block => {
						const newBlock = {
							...block,
							currentBlockRow: calculateNextPosition(block.stitches.length, block.currentBlockRow),
						};
						return newBlock;
					}),
				},
			};
		},
		toNextRow(state) {
			state.currentRow++;
		},
		toPrevRow(state) {
			state.currentRow--;
		},
	},
});

export const { updateBlockRow, toNextRow, toPrevRow } = projectSlice.actions;

export const nextRow = () => {
	return dispatch => {
		dispatch(updateBlockRow({ direction: "next" }));
		dispatch(toNextRow());
	};
};

export const prevRow = () => {
	return dispatch => {
		dispatch(updateBlockRow({ direction: "previous" }));
		dispatch(toPrevRow());
	};
};

export default projectSlice.reducer;
