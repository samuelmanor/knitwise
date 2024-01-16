import { configureStore } from "@reduxjs/toolkit";

import projectReducer from "./projectReducer";
import workspaceReducer from "./workspaceReducer";

export default configureStore({
	reducer: {
		workspace: workspaceReducer,
		projects: projectReducer,
	},
});
