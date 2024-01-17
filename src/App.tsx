// import logo from "./logo.svg";
import { Box, Grid } from "@mui/material";
import "./App.css";
import { Workspace } from "./components/Workspace";

export const testProject2 = {
	projectRow: 1,
	blocks: {
		block1: {
			currentRow: 1,
			stitches: [
				[
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
				],
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
				],
				[
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
				],
			],
		},
		block2: {
			currentRow: 1,
			stitches: [
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
				],
				[
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
				],
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
				],
			],
		},
		block3: {
			currentRow: 1,
			stitches: [
				[
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
				],
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
				],
				[
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
				],
			],
		},
		block4: {
			currentRow: 1,
			stitches: [
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
				],
				[
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
				],
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
				],
			],
		},
		block5: {
			currentRow: 1,
			stitches: [
				[
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
				],
				[
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
				],
				[
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
					{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
					{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
				],
			],
		},
	},
};

export const testProject = [
	// the project
	[
		// the blocks
		[
			// the rows
			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 }, // block 1 row 1 stitch 1
			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 }, // block 1 row 1 stitch 2
			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 }, // block 1 row 1 stitch 3
		],
		[
			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 }, // block 1 row 2 stitch 1
			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 }, // block 1 row 2 stitch 2
			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 }, // block 1 row 2 stitch 3
		],
		[
			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 }, // block 1 row 3 stitch 1
			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
		],
	],
	[
		[
			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 }, // block 2 row 1 stitch 1
			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
		],
		[
			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
		],
		[
			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
		],

		[
			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
		],
	],
	[
		[
			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 }, // block 3 row 1 stitch 1
			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
		],
		[
			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
		],
		[
			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
			{ name: "purl", abbreviation: "p", symbol: "-", description: "purl 1", width: 1 },
			{ name: "knit", abbreviation: "k", symbol: "*", description: "knit 1", width: 1 },
		],
	],
];

function App() {
	return (
		<Box
			sx={{
				// backgroundColor: "yellow",
				position: "fixed",
				height: "100%",
				width: "100%",
				display: "flex",
				alignItems: "center",
			}}
		>
			{/* <Workspace project={testProject} /> */}
			<Workspace project={testProject2} />
		</Box>
	);
}

export default App;
