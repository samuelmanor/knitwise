// import { ThemeOptions } from "@mui/material";

// export const lightTheme: ThemeOptions = {
// 	palette: {
// 		primary: {
// 			// used for main accent color
// 			main: "#546a76", // dark blue
// 			light: "#94a8b3", // light blue
// 		},
// 		// secondary: {
// 		// 	main: "#fcbf49", // lighter blue here?
// 		// },
// 		text: {
// 			primary: "#2a353c", // darker blue
// 			secondary: "#f6f2df", // light tan color -> contrast text for background
// 		},
// 		background: {
// 			// default: "#f6f2df", // light tan color
// 			paper: "#fef9ef", // light tan color
// 		},
// 		error: {
// 			main: "#d62828", // vibrant red
// 		},
// 	},
// 	typography: {
// 		h2: {
// 			// used for project name
// 			fontFamily: "Arial",
// 			letterSpacing: "1px",
// 			// color: "#f6f2df",
// 		},
// 		h5: {
// 			// used for block names
// 			fontFamily: "Helvetica Neue",
// 		},
// 		body1: {
// 			// used for general text
// 			fontFamily: "Helvetica Neue",
// 		},
// 	},
// };

import { ThemeOptions } from "@mui/material";

export const darkTheme: ThemeOptions = {
	palette: {
		primary: {
			main: "#546a76",
			light: "#5d7683",
		},
		text: {
			primary: "#f6f2df",
			secondary: "#f6f2df",
		},
		background: {
			default:
				"linear-gradient(to right, #324048, #303e46, #2f3c43, #2d3a41, #2c383f, #29363c, #27343a, #243237, #203033, #1c2e2e, #1a2b29, #192924);",
			paper: "#3b4b54",
		},
	},
};
