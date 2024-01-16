// handles all top-level things like the list of projects and the current project('s id)
import { createSlice } from "@reduxjs/toolkit";
import { testProject } from "../components/Workspace/Workspace.stories";

const workspaceSlice = createSlice({
	name: "workspace",
	initialState: {
		projects: [testProject],
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
