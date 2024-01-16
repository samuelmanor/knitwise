// handles all top-level things like the list of projects and the current project('s id)
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

const workspaceSlice = createSlice({
	name: "workspace",
	initialState: {
		projects: [testProject, testProject],
		currentProjectId: 0,
	},
	reducers: {
		addProject(state, action) {
			state.projects.push(action.payload);
		},
		setCurrentProjectId(state, action) {
			state.currentProjectId = action.payload;
		},
	},
});

export const { addProject, setCurrentProjectId } = workspaceSlice.actions;

export default workspaceSlice.reducer;

/*

// handles things just within a single project like the current row and all the blocks

import { createSlice } from "@reduxjs/toolkit";
import { testProject } from "../components/Workspace/Workspace.stories";

const projectSlice = createSlice({
	name: "project",
	initialState: {
		projects: [testProject],
	},
	reducers: {
		addProject(state, action) {
			state.projects.push(action.payload);
		},
	},
});

export const { addProject } = projectSlice.actions;

export default projectSlice.reducer;


*/
