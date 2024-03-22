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
			paper: "#fef9ef", // light tan color
		},
		error: {
			main: "#d62828", // vibrant red
		},
	},
	typography: {
		h2: {
			// used for project name
			fontFamily: "Arial",
			letterSpacing: "1px",
			// color: "#f6f2df",
		},
		h5: {
			// used for block names
			fontFamily: "Helvetica Neue",
		},
		body1: {
			// used for general text
			fontFamily: "Helvetica Neue",
		},
	},
};
