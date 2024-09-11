import ListPills from "@/components/ListPills"
import SearchInput from "@/components/SearchInput"
import { ThemedView } from "@/components/ThemedView"
import { List } from "@/database/schema"
import { useRoute } from "@react-navigation/native"
import { View, StyleSheet, Pressable, KeyboardAvoidingView } from "react-native"
import AllItems from "@/components/AllItems"
import AddButton from "@/components/AddButton"
import { useFocusEffect, useNavigation } from "expo-router"
import { ThemedText } from "@/components/ThemedText"
import { useState } from "react"
import { db } from "@/database"
import { eq } from "drizzle-orm"
import { useLiveQuery } from "drizzle-orm/expo-sqlite"
import * as Schema from "@/database/schema"

export default function ListView() {
	const [searchValue, onChangeSearchValue] = useState("")
	const { params } = useRoute()
	const { item } = params as { item: List }
	const navigation = useNavigation()
	useFocusEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<Pressable onPress={navigateEditList}>
					<ThemedText>Edit</ThemedText>
				</Pressable>
			),
		})
	})

	const navigateEditList = () => {
		// @ts-expect-error
		navigation.navigate("addEditList", { item, title: "Edit List" })
	}

	const { data: list } = useLiveQuery(
		db.select().from(Schema.list).where(eq(Schema.list.id, item.id)),
	)

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={80}>
			<ThemedView style={{ flex: 1 }}>
				<View style={styles.inputContainer}>
					<SearchInput value={searchValue} onChange={onChangeSearchValue} />
				</View>
				<View>{list.length > 0 && <ListPills list={list[0]} />}</View>
				{list.length > 0 && <AllItems list={list[0]} searchValue={searchValue} />}
				<AddButton addType="Item" list={item} />
			</ThemedView>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	inputContainer: {
		marginBottom: 20,
	},
})
