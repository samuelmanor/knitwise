import "./App.css";
import { Workspace } from "./components/Workspace";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { lightTheme, darkTheme } from "./theme";
import { loadState, saveState } from "./utils/localStorage";
import { initializeProject } from "./reducers/projectReducer";
import { useEffect, useMemo } from "react";

function App() {
	const themeSetting = useSelector((state: any) => state.project.settings.theme);
	const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

	const data = useSelector((state: any) => state.project);

	const dispatch = useDispatch();

	/**
	 * Load the saved state from local storage when the app is first opened.
	 */
	useEffect(() => {
		const savedState = loadState();
		if (savedState) {
			dispatch(initializeProject({ ...savedState, mode: "chart" }));
			console.log("Loaded saved state from local storage.");
			console.log(savedState);
		}
	}, []);

	/**
	 * Save the project state to local storage whenever it changes.
	 */
	useEffect(() => {
		saveState(data);
	}, [data]);

	const theme = useMemo(() => {
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
