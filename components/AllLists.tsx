import { db } from "@/database"
import { useLiveQuery } from "drizzle-orm/expo-sqlite"
import { ScrollView } from "react-native"
import * as Schema from "@/database/schema"
import { List } from "@/database/schema"
import ListIterableItem from "./ListIterableItem"
import { useMemo } from "react"

const AllLists = ({ searchValue }: { searchValue: string }) => {
	const { data } = useLiveQuery(db.select().from(Schema.list))
	const filteredData = useMemo(
		() => (searchValue ? data.filter((list: List) => list.title.includes(searchValue)) : data),
		[data, searchValue],
	)
	console.log({ searchValue })
	console.log({ data })
	console.log({ filteredData })
	return (
		<ScrollView>
			{filteredData.map((list: List) => (
				<ListIterableItem key={list.id} list={list} color={list.color || ""} />
			))}
		</ScrollView>
	)
}

export default AllLists
