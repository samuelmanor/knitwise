const stitches = {
	k: {
		name: "knit",
		abbreviation: "k",
		description: "knit one",
		width: 1,
	},
	p: {
		name: "purl",
		abbreviation: "p",
		description: "purl one",
		width: 1,
	},
	c2b: {
		name: "cable 2 back",
		abbreviation: "c2b",
		descripton:
			"slip next stitch onto cable needle and hold at back of work, knit 1 from left needle, then knit 1 from cable needle",
		width: 2,
	},
	c2f: {
		name: "cable 2 front",
		abbreviation: "c2f",
		description:
			"slip next stitch onto cable needle and hold at front of work, knit 1 from left needle, then knit 1 from cable needle",
		width: 2,
	},
};

export default stitches;
