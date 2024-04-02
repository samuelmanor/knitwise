import "./App.css";
import { Workspace } from "./components/Workspace";
import { createTheme, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/material";

import { lightTheme } from "./themes/lightTheme";
import { darkTheme } from "./themes/darkTheme";
import * as React from "react";
import { useSelector } from "react-redux";

const light = createTheme(lightTheme);

function App() {
	const themeSetting = useSelector((state: any) => state.workspace.settings.theme);
	// const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

	const theme = React.useMemo(() => {
		if (themeSetting === "system") {
			return createTheme(systemTheme === "dark" ? darkTheme : lightTheme);
		} else {
			return createTheme(themeSetting === "light" ? lightTheme : darkTheme);
		}
	}, [themeSetting]);

	// const theme = React.useMemo(() => {
	// 	if (prefersDarkMode) {
	// 		return createTheme(darkTheme);
	// 	} else {
	// 		return createTheme(themeSetting === "light" ? lightTheme : darkTheme);
	// 	}
	// }, [prefersDarkMode]);

	// getSystemTheme(state) {
	// 	const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	// 	state.settings.theme = systemTheme;
	// },

	return (
		<ThemeProvider theme={theme}>
			<Workspace />
		</ThemeProvider>
	);
}

export default App;
