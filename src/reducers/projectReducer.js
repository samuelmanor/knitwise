// handles things just within a single project like the current row and all the blocks

import { createSlice } from "@reduxjs/toolkit";

const testProject = [
	// the project
	[
		// the blocks
		[
			// the rows
			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 }, // block 1 row 1 stitch 1
			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 }, // block 1 row 1 stitch 2
			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 }, // block 1 row 1 stitch 3
		],
		[
			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 }, // block 1 row 2 stitch 1
			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 }, // block 1 row 2 stitch 2
			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 }, // block 1 row 2 stitch 3
		],
		[
			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 }, // block 1 row 3 stitch 1
			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
		],
	],
	[
		[
			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 }, // block 2 row 1 stitch 1
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
	[
		[
			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 }, // block 3 row 1 stitch 1
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
	],
];

const projectSlice = createSlice({
	name: "project",
	initialState: {
		project: testProject,
		currentRow: 1,
	},
	reducers: {
		setCurrentRow(state, action) {
			state.currentRow = action.payload;
		},
		toNextRow(state) {
			state.currentRow++;
			console.log(state.currentRow);
			console.log("hiiiiiiii");
		},
		toPrevRow(state) {
			state.currentRow--;
		},
	},
});

export const { setCurrentRow, toNextRow, toPrevRow } = projectSlice.actions;

export const nextRow = () => {
	return dispatch => {
		dispatch(toNextRow());
	};
};

export default projectSlice.reducer;
