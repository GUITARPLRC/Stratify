import { db } from "@/database"
import { List } from "@/database/schema"
import { View, StyleSheet } from "react-native"
import IterableItem from "./IterableItem"
import { useLiveQuery } from "drizzle-orm/expo-sqlite"
import { eq } from "drizzle-orm"
import * as Schema from "@/database/schema"

export default function ListIterableItem({ list, color }: { list: List; color: string }) {
	const { data } = useLiveQuery(
		db.select().from(Schema.listItem).where(eq(Schema.listItem.listId, list.id)),
	)
	const item = {
		...list,
		subtitle: `${data.length} items`,
	}
	return (
		<View key={list.id} style={styles.container}>
			<IterableItem itemType="list" item={item} color={color} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 20,
	},
})
