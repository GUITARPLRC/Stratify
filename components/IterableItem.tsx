import { View, StyleSheet, Pressable } from "react-native"
import { List, ListItem } from "@/database/schema"
import { Colors } from "@/constants/Colors"
import { ThemedText } from "./ThemedText"
import {
	Apple,
	ChevronRight,
	ClipboardList,
	Folder,
	Plane,
	ShoppingCart,
	Star,
} from "lucide-react-native"
import { useMemo } from "react"
import { useNavigation } from "@react-navigation/native"

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
		const iconColor =
			color && ["yellow", "green", ""].indexOf(color) > -1 ? Colors.accentColors.black : Colors.text
		const homePillIcons = {
			list: <ClipboardList size={24} color={iconColor} />,
			food: <Apple size={24} color={iconColor} />,
			shopping: <ShoppingCart size={24} color={iconColor} />,
			travel: <Plane size={24} color={iconColor} />,
			folder: <Folder size={24} color={iconColor} />,
		}
		return homePillIcons[item.icon] || <View></View>
	}, [item])

	const navigate = () => {
		itemType === "list"
			? navigation.navigate("list", { item: item })
			: navigation.navigate("addEditItem", {
					title: `Edit Item`,
					item: item,
			  })
	}

	const textColor = useMemo(
		() =>
			color && ["yellow", "green", ""].indexOf(color) > -1
				? Colors.accentColors.black
				: Colors.text,
		[color],
	)

	const backgroundColor = useMemo(
		() => (color ? Colors.accentColors[color] : Colors.accentColors.grey),
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
								fontSize: 20,
							}}
						>
							{item?.priority}
						</ThemedText>
					)}
				</View>
			</View>
			<View style={styles.middle}>
				<View>
					<ThemedText type="title">{item.title}</ThemedText>
				</View>
				<View style={styles.subtitleContainer}>
					<ThemedText type="subtitle">{item?.subtitle}</ThemedText>
				</View>
			</View>
			<View style={styles.right}>
				{item?.isFavorite && <Star size={24} color={Colors.accentColors.yellow} />}
				<ChevronRight size={24} color={Colors.accentColors.darkGrey} />
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: Colors.accentColors.black,
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
		backgroundColor: Colors.accentColors.grey,
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
