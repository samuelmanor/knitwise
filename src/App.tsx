import "./App.css";
import { Workspace } from "./components/Workspace";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";

import lightTheme from "./components/themes/lightTheme";

const light = createTheme(lightTheme);

function App() {
	return (
		<ThemeProvider theme={light}>
			<Workspace />
		</ThemeProvider>
	);
}

export default App;
