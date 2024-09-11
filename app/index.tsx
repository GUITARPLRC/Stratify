import { View, StyleSheet } from "react-native"
import * as schema from "@/database/schema"
import { db } from "@/database"
import { useEffect, useState } from "react"
import AllLists from "@/components/AllLists"
import { ThemedView } from "@/components/ThemedView"
import AddButton from "@/components/AddButton"
import SearchInput from "@/components/SearchInput"
import { KeyboardAvoidingView } from "react-native"

export default function Index() {
	const [value, onValueChange] = useState("")
	useEffect(() => {
		const run = async () => {
			const userData = await db.select().from(schema.user)
			if (userData.length === 0) {
				// we don't have a local user setup yet, let's create one
				db.insert(schema.user).values({}).run()
			}
		}
		run()
	}, [])

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={80}>
			<ThemedView style={{ flex: 1 }}>
				<View style={styles.inputContainer}>
					<SearchInput value={value} onChange={onValueChange} />
				</View>
				<AllLists searchValue={value} />
				<AddButton addType="List" />
			</ThemedView>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	inputContainer: {
		marginBottom: 20,
	},
})
