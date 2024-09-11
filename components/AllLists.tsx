import { db } from "@/database"
import { useLiveQuery } from "drizzle-orm/expo-sqlite"
import { ScrollView } from "react-native"
import * as Schema from "@/database/schema"
import { List } from "@/database/schema"
import ListIterableItem from "./ListIterableItem"

// const data = [
// 	{
// 		title: "a really long title that should wrap",
// 		id: "1",
// 		sortKey: "title",
// 		description: "this is a list",
// 		theme: "",
// 		isFavorite: true,
// 		userId: "1",
// 		createdAt: new Date().toISOString(),
// 		icon: "",
// 		color: "",
// 	},
// ]

const AllLists = () => {
	const { data } = useLiveQuery(db.select().from(Schema.list))
	return (
		<ScrollView>
			{data.map((list: List) => (
				<ListIterableItem key={list.id} list={list} color={list.color || ""} />
			))}
		</ScrollView>
	)
}

export default AllLists
