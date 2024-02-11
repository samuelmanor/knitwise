// handles all top-level things like the list of projects and the current project('s id)
import { createSlice } from "@reduxjs/toolkit";
import { testProject } from "../utils/testProject";

const workspaceSlice = createSlice({
	name: "workspace",
	initialState: {
		projects: [testProject, testProject],
		mode: "chart",
		customBlocks: [],
		currentProjectId: 0,
		// draftProject: {
		// 	name: "",
		// 	blocks: [],
		// 	currentDraftBlock: 0,
		// }
	},
	reducers: {
		// addProject(state, action) {
		// 	state.projects.push(action.payload);
		// },
		setMode(state, action) {
			state.mode = action.payload;
		},
		setCurrentProjectId(state, action) {
			state.currentProjectId = action.payload;
		},
	},
});

export const { setMode, setCurrentProjectId } = workspaceSlice.actions;

export default workspaceSlice.reducer;
