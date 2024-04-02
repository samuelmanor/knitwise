import { ThemeOptions } from "@mui/material";

export const lightTheme: ThemeOptions = {
	palette: {
		primary: {
			// used for main accent color
			main: "#546a76", // dark blue
			light: "#94a8b3", // light blue
		},
		// secondary: {
		// 	main: "#fcbf49", // lighter blue here?
		// },
		text: {
			primary: "#2a353c", // darker blue
			secondary: "#f6f2df", // light tan color -> contrast text for background
		},
		background: {
			// default: "#f6f2df", // light tan color
			default:
				"linear-gradient(to right, #f6f2df, #f5f1dc, #f5f0d9, #f4efd6, #f3eed3, #f2edd0, #f2ebce, #f1eacb, #f0e9c8, #efe8c5, #eee6c2, #ede5bf)",
			paper: "#fef9ef", // light tan color
		},
		// error: {
		// 	main: "#d62828", // vibrant red
		// },
	},
};
