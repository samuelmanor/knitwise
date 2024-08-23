import "./App.css";
import { Workspace } from "./components/Workspace";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { lightTheme, darkTheme } from "./theme";

function App() {
	const themeSetting = useSelector((state: any) => state.project.settings.theme);
	const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

	const theme = React.useMemo(() => {
		if (themeSetting === "system") {
			return createTheme(systemTheme === "dark" ? darkTheme : lightTheme);
		} else {
			return createTheme(themeSetting === "light" ? lightTheme : darkTheme);
		}
	}, [themeSetting]);

	return (
		<ThemeProvider theme={theme}>
			<Workspace />
		</ThemeProvider>
	);
}

export default App;
