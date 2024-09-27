import { View, StyleSheet, Pressable } from "react-native"
import { ListItem } from "@/database/schema"
import { Colors } from "@/constants/Colors"
import { ThemedText } from "./ThemedText"
import { ChevronRight } from "lucide-react-native"
import { useMemo } from "react"
import { useNavigation } from "@react-navigation/native"

const IterableItem = ({ item, color }: { item: ListItem; color: string | null }) => {
	const navigation = useNavigation()

	const navigate = () => {
		// @ts-expect-error
		navigation.navigate("editItem", {
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
					<ThemedText
						style={{
							color: textColor,
						}}
					>
						{item.priority}
					</ThemedText>
				</View>
			</View>
			<View style={styles.middle}>
				<View>
					<ThemedText type="xl">{item.title}</ThemedText>
				</View>
				<View style={styles.subtitleContainer}>
					<ThemedText type="subtitle">{item.subtitle}</ThemedText>
				</View>
			</View>
			<View style={styles.right}>
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
		marginBottom: 20,
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
