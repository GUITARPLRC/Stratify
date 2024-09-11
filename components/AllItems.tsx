import { db } from "@/database"
import { useLiveQuery } from "drizzle-orm/expo-sqlite"
import { View, StyleSheet, ScrollView } from "react-native"
import * as schema from "@/database/schema"
import IterableItem from "./IterableItem"
import { eq } from "drizzle-orm"

// const listItems = [
// 	{
// 		id: "1",
// 		listId: "2",
// 		title: "a really long title that should wrap",
// 		description: "this is a list",
// 		priority: 10,
// 		createdAt: new Date().toISOString(),
// 		subtitle: "this is a subtitle",
// 	},
// ]

const AllItems = ({ list }: { list: schema.List }) => {
	const { data } = useLiveQuery(
		db.select().from(schema.listItem).where(eq(schema.listItem.listId, list?.id)),
	)
	console.log({ list })
	console.log({ data })

	return (
		<ScrollView>
			{data.map((item) => (
				<View key={item.id} style={styles.container}>
					<IterableItem itemType="item" color={list.color} item={item} {...item} />
				</View>
			))}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 20,
	},
})

export default AllItems
