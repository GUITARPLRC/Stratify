import { db } from "@/database"
import { useLiveQuery } from "drizzle-orm/expo-sqlite"
import { View, StyleSheet, ScrollView } from "react-native"
import * as schema from "@/database/schema"
import IterableItem from "./IterableItem"
import { eq, asc } from "drizzle-orm"

const AllItems = ({ list, searchValue }: { list: schema.List; searchValue: string }) => {
	console.log({ list })
	console.log("render")
	const { data } = useLiveQuery(
		db
			.select()
			.from(schema.listItem)
			.where(eq(schema.listItem.listId, list.id))
			.orderBy(asc(schema.listItem[list.sortKey])),
	)

	const filteredData = data.filter((item) =>
		searchValue
			? item.title.includes(searchValue) ||
			  item.subtitle.includes(searchValue) ||
			  item.description.includes(searchValue) ||
			  (item.priority ? item.priority.toString() : "").includes(searchValue)
			: data,
	)

	return (
		<ScrollView>
			{filteredData.map((item) => (
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
