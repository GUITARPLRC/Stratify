import { View, StyleSheet } from "react-native"
import Pill from "./Pill"
import PillList from "./PillList"
import { ThemedText } from "./ThemedText"
import { List } from "@/database/schema"
import { Colors } from "@/constants/Colors"
import { db } from "@/database"
import * as Schema from "@/database/schema"
import { eq } from "drizzle-orm"
import { useMemo } from "react"

const ListPills = ({ list }: { list: List }) => {
	const listPillOptions = {
		all: "createdAt",
		title: "title",
		rating: "priority",
		subtitle: "subtitle",
	}

	const updateListSort = async (key: string) => {
		await db.update(Schema.list).set({ sortKey: key }).where(eq(Schema.list.id, list?.id))
	}

	const selectedColor = useMemo(
		() =>
			list?.color
				? Colors.accentColors[list.color as keyof typeof Colors.accentColors]
				: Colors.grey,
		[list.color],
	)

	return (
		<View style={styles.container}>
			<PillList>
				{Object.keys(listPillOptions).map((key) => {
					const color =
						// @ts-expect-error
						["yellow", "green", ""].indexOf(list.color) > -1 ? Colors.black : Colors.text
					const selected = listPillOptions[key as keyof typeof listPillOptions] === list?.sortKey
					return (
						<View key={key} style={styles.pillContainer}>
							<Pill
								selected={selected}
								selectedColor={selectedColor}
								onPress={() => updateListSort(listPillOptions[key as keyof typeof listPillOptions])}
								listPill
							>
								<ThemedText type="medium" style={{ color: selected ? color : Colors.text }}>
									{/* Title Case */}
									{key[0].toUpperCase()}
									{key.substring(1)}
								</ThemedText>
							</Pill>
						</View>
					)
				})}
			</PillList>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 20,
	},
	pillContainer: {
		marginRight: 15,
	},
})

export default ListPills
