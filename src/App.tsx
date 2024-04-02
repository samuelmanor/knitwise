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

	// const theme = React.useMemo(() => {
	// 	if (prefersDarkMode) {
	// 		return createTheme(darkTheme);
	// 	} else {
	// 		return createTheme(themeSetting === "light" ? lightTheme : darkTheme);
	// 	}
	// }, [prefersDarkMode]);

	return (
		<ThemeProvider theme={themeSetting === "light" ? createTheme(lightTheme) : createTheme(darkTheme)}>
			<Workspace />
		</ThemeProvider>
	);
}

export default App;
