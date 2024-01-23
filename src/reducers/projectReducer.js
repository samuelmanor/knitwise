// handles things just within a single project like the current row and all the blocks

import { createSlice, current } from "@reduxjs/toolkit";

// const testProject = [
// 	// the project
// 	[
// 		// the blocks
// 		[
// 			// the rows
// 			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 }, // block 1 row 1 stitch 1
// 			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 }, // block 1 row 1 stitch 2
// 			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 }, // block 1 row 1 stitch 3
// 		],
// 		[
// 			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 }, // block 1 row 2 stitch 1
// 			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 }, // block 1 row 2 stitch 2
// 			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 }, // block 1 row 2 stitch 3
// 		],
// 		[
// 			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 }, // block 1 row 3 stitch 1
// 			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
// 			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
// 		],
// 	],
// 	[
// 		[
// 			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 }, // block 2 row 1 stitch 1
// 			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
// 			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
// 		],
// 		[
// 			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
// 			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
// 			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
// 		],
// 		[
// 			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
// 			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
// 			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
// 		],

// 		[
// 			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
// 			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
// 			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
// 		],
// 	],
// 	[
// 		[
// 			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 }, // block 3 row 1 stitch 1
// 			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
// 			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
// 		],
// 		[
// 			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
// 			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
// 			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
// 		],
// 		[
// 			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
// 			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
// 			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
// 		],
// 	],
// ];

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
				}
			};

			const newState = {
				...state,
				project: {
					...state.project,
					blocks: state.project.blocks.map((block, index) => {
						const newBlock = {
							...block,
							currentBlockRow: calculateNextPosition(block.stitches.length, block.currentBlockRow),
						};
						// console.log("new block", newBlock);
						return newBlock;
					}),
				},
			};
			// console.log("new state", newState);
			return newState;
		},
		toNextRow(state) {
			state.currentRow++;
		},
		// toPrevRow(state) {
		// 	state.currentRow--;
		// },
	},
});

export const { updateBlockRow, toNextRow } = projectSlice.actions;

// export const updateBlockRow = (index, newPosition) => {
// 	return dispatch => {
// 		dispatch(changeBlockRow(index, newPosition));
// 	};
// };

export const nextRow = () => {
	return dispatch => {
		dispatch(updateBlockRow({ direction: "next" }));
		dispatch(toNextRow());
	};
};

// export const prevRow = () => {
// 	return dispatch => {
// 		dispatch(toPrevRow());
// 	};
// };

export default projectSlice.reducer;
