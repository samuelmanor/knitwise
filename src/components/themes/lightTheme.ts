import { ThemeOptions } from "@mui/material";

export const lightTheme: ThemeOptions = {
	palette: {
		primary: {
			main: "#f77f00", // orange
		},
		// secondary: {
		// 	main: "#fcbf49", // yellow
		// },
		text: {
			primary: "#003049", // navy blue
			secondary: "#f6f2df", // contrast text -> light tan color
		},
		background: {
			default: "#f6f2df", // light tan color
			paper: "#77878b", // bluish gray
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
		},
		h4: {
			// used for button text
			fontFamily: "Arial",
			textTransform: "none",
		},
		body1: {
			// used for general text
			fontFamily: "Helvetica Neue",
		},
	},
};
