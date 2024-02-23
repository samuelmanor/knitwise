// handles all top-level things like the list of projects and the current project('s id)
import { createSlice, current } from "@reduxjs/toolkit";
import { testProject } from "../utils/testProject";

const workspaceSlice = createSlice({
	name: "workspace",
	initialState: {
		projects: [testProject, testProject],
		mode: "chart",
		savedBlocks: [testProject.blocks[1], testProject.blocks[2]],
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
		editProjectName(state, action) {
			return {
				...state,
				projects: state.projects.map((project, i) => {
					if (i === state.currentProjectId) {
						return {
							...project,
							projectName: action.payload.projectName,
						};
					} else {
						return project;
					}
				}),
			};
		},
	},
});

export const { setMode, setCurrentProjectId, editProjectName } = workspaceSlice.actions;

export default workspaceSlice.reducer;
