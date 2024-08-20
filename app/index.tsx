import { Text, View } from "react-native"
import * as schema from "@/database/schema"
import { db } from "@/database"
import { useEffect, useRef } from "react"

export default function Index() {
	// TODO: we need to wait for the query to finish before we can add the user
	const runningRef = useRef(false)

	useEffect(() => {
		const run = async () => {
			if (runningRef.current) return
			runningRef.current = true
			const userData = await db.select().from(schema.user)
			if (userData.length === 0) {
				// we don't have a local user setup yet, let's create one
				db.insert(schema.user).values({}).run()
				// TODO: confetti - welcome
			}
			runningRef.current = false
		}
		run()
	}, [])

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text>🌲 Welcome to the app! 👋</Text>
		</View>
	)
}
