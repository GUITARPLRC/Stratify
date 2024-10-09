export default () => {
	return {
		name: process.env.APP_ENV === "production" ? "Stratify" : "Stratify (DEV)",
		ios: {
			bundleIdentifier:
				process.env.APP_ENV === "production"
					? "com.reynolds.stratify"
					: "com.reynolds.stratify-dev",
		},
	}
}
