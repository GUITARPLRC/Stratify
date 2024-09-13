import { View, StyleSheet, Pressable } from "react-native"
import { List, ListItem } from "@/database/schema"
import { Colors } from "@/constants/Colors"
import { ThemedText } from "./ThemedText"
import { ChevronRight, Star } from "lucide-react-native"
import { useMemo } from "react"
import { useNavigation } from "@react-navigation/native"
import { ListIcons } from "@/constants/Icons"

const IterableItem = ({
	item,
	color,
	itemType,
}: {
	item: List | ListItem
	itemType: "item" | "list"
	color: string | null
}) => {
	const navigation = useNavigation()

	const handleIcon = useMemo(() => {
		// extract this to a separate util being used in List pills
		const list = item as List
		const iconColor =
			color && ["yellow", "green", ""].indexOf(color) > -1 ? Colors.black : Colors.text
		const Component = ListIcons[list.icon as keyof typeof ListIcons]
		return Component ? <Component size={24} color={iconColor} /> : <View></View>
	}, [item, color])

	const navigate = () => {
		itemType === "list"
			? navigation.navigate("list", { item: item })
			: navigation.navigate("addEditItem", {
					title: `Edit Item`,
					item: item,
			  })
	}

	const textColor = useMemo(
		() => (color && ["yellow", "green", ""].indexOf(color) > -1 ? Colors.black : Colors.text),
		[color],
	)

	const backgroundColor = useMemo(
		() => (color ? Colors.accentColors[color as keyof typeof Colors.accentColors] : Colors.grey),
		[color],
	)

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
					{itemType === "list" ? (
						handleIcon
					) : (
						<ThemedText
							type="subtitle"
							style={{
								color: textColor,
							}}
						>
							{item.priority}
						</ThemedText>
					)}
				</View>
			</View>
			<View style={styles.middle}>
				<View>
					<ThemedText type="xl">{item.title}</ThemedText>
				</View>
				<View style={styles.subtitleContainer}>
					<ThemedText type="subtitle">{item?.subtitle}</ThemedText>
				</View>
			</View>
			<View style={styles.right}>
				{item?.isFavorite && <Star size={24} color={Colors.accentColors.yellow} />}
				<ChevronRight size={24} color={Colors.darkGrey} />
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: Colors.black,
		borderRadius: 10,
		flexDirection: "row",
		paddingHorizontal: 20,
		paddingVertical: 10,
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

export default IterableItem
