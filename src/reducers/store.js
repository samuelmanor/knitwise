import { configureStore } from "@reduxjs/toolkit";

import workspaceReducer from "./workspaceReducer";
import projectReducer from "./projectReducer";

export default configureStore({
	reducer: {
		workspace: workspaceReducer,
		projects: projectReducer,
	},
});
