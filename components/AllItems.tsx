import { db } from "@/database"
import { useLiveQuery } from "drizzle-orm/expo-sqlite"
import { ScrollView } from "react-native"
import * as schema from "@/database/schema"
import IterableItem from "./IterableItem"
import { eq } from "drizzle-orm"

const AllItems = ({ list, searchValue }: { list: schema.List; searchValue: string }) => {
	const { data }: { data: schema.ListItem[] } = useLiveQuery(
		db.select().from(schema.listItem).where(eq(schema.listItem.listId, list.id)),
	)

	const filteredSortedData = data
		.filter((item) =>
			searchValue
				? (item.title && item.title.includes(searchValue)) ||
				  (item.subtitle && item.subtitle.includes(searchValue)) ||
				  (item.description && item.description.includes(searchValue)) ||
				  (item.priority ? item.priority.toString() : "").includes(searchValue)
				: data,
		)
		// @ts-expect-error
		.sort((a, b) => (a[list.sortKey] > b[list.sortKey] ? 1 : -1))

	return (
		<ScrollView>
			{filteredSortedData.map((item) => (
				<IterableItem key={item.id} color={list.color} item={item} {...item} />
			))}
		</ScrollView>
	)
}

export default AllItems
