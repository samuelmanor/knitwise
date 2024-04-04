import { ThemeOptions } from "@mui/material";

const componentOverrides: ThemeOptions = {
	components: {
		MuiTypography: {
			styleOverrides: {
				h2: {
					// used for project name and settings menu title
					letterSpacing: "1px",
				},
				h3: {
					// used for settings menu section titles
					letterSpacing: "1px",
					fontSize: "24px",
					marginBottom: "3px",
				},
				h4: {
					fontSize: "15px",
					letterSpacing: "1px",
					paddingLeft: "10px",
				},
			},
		},
		MuiFormControl: {
			styleOverrides: {
				root: {
					marginBottom: "15px",
				},
			},
		},
	},
};

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
	...componentOverrides,
};

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
	...componentOverrides,
};
