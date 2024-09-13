import { View, StyleSheet } from "react-native"
import * as schema from "@/database/schema"
import { db } from "@/database"
import { useEffect, useState } from "react"
import AllLists from "@/components/AllLists"
import { ThemedView } from "@/components/ThemedView"
import AddButton from "@/components/AddButton"
import SearchInput from "@/components/SearchInput"
import { KeyboardAvoidingView } from "react-native"
import { useNavigation } from "expo-router"

export default function Index() {
	const navigation = useNavigation()
	const [value, onValueChange] = useState("")
	useEffect(() => {
		const run = async () => {
			const userData = await db.select().from(schema.user)
			if (userData.length === 0) {
				// we don't have a local user setup yet, let's create one
				const data = await db.insert(schema.user).values({}).returning()
				!__DEV__ &&
					fetch(
						`https://chu-sendemailwithargs.web.val.run/?subject=🎉Stratify: New User 🌲&body=${data[0].id}`,
					)
				// @ts-expect-error
				navigation.navigate("welcome")
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
