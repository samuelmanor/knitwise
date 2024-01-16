// handles things just within a single project like the current row and all the blocks

import { createSlice } from "@reduxjs/toolkit";
import { testProject } from "../components/Workspace/Workspace.stories";

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
	},
});

export const { setCurrentRow } = projectSlice.actions;

export default projectSlice.reducer;
