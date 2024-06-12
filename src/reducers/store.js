import { configureStore } from "@reduxjs/toolkit";

import projectReducer from "./projectReducer";
import workspaceReducer from "./workspaceReducer";

const testConfigureStore = configureStore({
	reducer: {
		workspace: workspaceReducer,
		projects: projectReducer,
	},
});

export const usePreloadedState = preloadedState => {
	return configureStore({
		reducer: {
			workspace: workspaceReducer,
			projects: projectReducer,
		},
		preloadedState,
	});
};

export default testConfigureStore;

// decorators: [
// 	Story => (
// 		<Provider
// 			store={usePreloadedState({
// 				workspace: {
// 					mode: "chart",
// 					settings: {
// 						theme: "light",
// 						stitchDisplay: "symbol",
// 						stitchTipMode: "hover",
// 						directionsOverlayMode: "simple",
// 					},
// 				},
// 			})}
// 		>
// 			<Story />
// 		</Provider>
// 	),
// ],
