import { db } from "@/database"
import { useLiveQuery } from "drizzle-orm/expo-sqlite"
import { ScrollView } from "react-native"
import * as Schema from "@/database/schema"
import { List } from "@/database/schema"
import IterableList from "./IterableList"
import { useMemo } from "react"

const AllLists = ({ searchValue }: { searchValue: string }) => {
	const { data }: { data: Schema.List[] } = useLiveQuery(db.select().from(Schema.list))
	const filteredData = useMemo(
		() =>
			searchValue
				? data.filter((list: List) => list.title && list.title.includes(searchValue))
				: data,
		[data, searchValue],
	)

	return (
		<ScrollView>
			{filteredData.map((list: List) => (
				<IterableList key={list.id} list={list} />
			))}
		</ScrollView>
	)
}

export default AllLists
