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
