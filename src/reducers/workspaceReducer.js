// handles all top-level things like the list of projects and the current project('s id)
import { createSlice } from "@reduxjs/toolkit";
import { testProject } from "../utils/testProject";

const workspaceSlice = createSlice({
	name: "workspace",
	initialState: {
		project: testProject,
		mode: "chart",
		savedBlocks: [testProject.blocks[1], testProject.blocks[2]],
		settings: {
			theme: "system", // | "light" | "dark"
			stitchDisplay: "symbol", // | "abbreviation"
			stitchTipMode: "hover", // | "click"
			directionsOverlayMode: "simple", // | "detailed" | "none"
		},
	},
	reducers: {
		setMode(state, action) {
			state.mode = action.payload;
		},
		changeSetting(state, action) {
			state.settings[action.payload.setting] = action.payload.value;
		},
		// save to browser storage
	},
});

export const { setMode, changeSetting } = workspaceSlice.actions;

export default workspaceSlice.reducer;
