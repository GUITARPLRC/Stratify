import { db } from "@/database"
import { List } from "@/database/schema"
import { View, StyleSheet, Pressable } from "react-native"
import { useLiveQuery } from "drizzle-orm/expo-sqlite"
import { eq } from "drizzle-orm"
import * as Schema from "@/database/schema"
import { ListIcons } from "@/constants/Icons"
import { useNavigation } from "expo-router"
import { ChevronRight, Star } from "lucide-react-native"
import { useMemo } from "react"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { ThemedText } from "./ThemedText"

export default function IterableList({ list, color }: { list: List; color: string }) {
	const navigation = useNavigation()
	const { data }: { data: Schema.List[] } = useLiveQuery(
		db.select().from(Schema.list).where(eq(Schema.list.id, list.id)),
	)
	const { data: listItems }: { data: Schema.ListItem[] } = useLiveQuery(
		db.select().from(Schema.listItem).where(eq(Schema.listItem.listId, list.id)),
	)
	const item = data[0]

	const textColor = useMemo(
		() => (color && ["yellow", "green", ""].indexOf(color) > -1 ? Colors.black : Colors.text),
		[color],
	)

	const backgroundColor = useMemo(
		() => (color ? Colors.accentColors[color as keyof typeof Colors.accentColors] : Colors.grey),
		[color],
	)

	const handleIcon = useMemo(() => {
		const Component = ListIcons[list.icon as keyof typeof ListIcons]
		return Component ? <Component size={24} color={textColor} /> : <View></View>
	}, [item, color])

	const navigate = () => {
		// @ts-expect-error
		navigation.navigate("list", { item: item })
	}

	return (
		<Pressable style={styles.container} onPress={navigate}>
			<View style={styles.left}>
				<View
					style={[
						styles.leftSquare,
						{
							backgroundColor,
						},
					]}
				>
					{handleIcon}
				</View>
			</View>
			<View style={styles.middle}>
				<View>
					<ThemedText type="xl">{item.title}</ThemedText>
				</View>
				<View style={styles.subtitleContainer}>
					<ThemedText type="subtitle">{`${listItems.length} item${
						listItems.length === 1 ? "" : "s"
					}`}</ThemedText>
				</View>
			</View>
			<View style={styles.right}>
				{item.isFavorite && <Star size={24} color={Colors.accentColors.yellow} />}
				<ChevronRight size={24} color={Colors.darkGrey} />
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 20,
	},
	left: {
		marginRight: 15,
	},
	leftSquare: {
		alignItems: "center",
		backgroundColor: Colors.grey,
		borderRadius: 10,
		justifyContent: "center",
		width: 38,
		height: 38,
	},
	middle: {
		flex: 1,
		marginRight: 20,
	},
	right: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	subtitleContainer: {
		marginLeft: 3,
	},
})
