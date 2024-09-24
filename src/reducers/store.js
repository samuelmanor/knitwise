import { configureStore } from "@reduxjs/toolkit";

import projectReducer from "./projectReducer";
// import workspaceReducer from "./workspaceReducer";

const testConfigureStore = configureStore({
	reducer: {
		// workspace: workspaceReducer,
		project: projectReducer,
	},
});

export const usePreloadedState = preloadedState => {
	return configureStore({
		reducer: {
			// workspace: workspaceReducer,
			project: projectReducer,
		},
		preloadedState,
	});
};

export default testConfigureStore;
