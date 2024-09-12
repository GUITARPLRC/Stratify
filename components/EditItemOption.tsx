import { Colors } from "@/constants/Colors"
import { Pressable, StyleSheet } from "react-native"

export default function EditItemOption({
	item,
	onPress,
	isSelected,
}: {
	item: any
	onPress: (arg: string) => void
	isSelected: boolean
}) {
	return (
		<Pressable
			style={[
				styles.rowCircle,
				{
					borderWidth: 2,
					borderColor: isSelected ? Colors.primary : "transparent",
				},
			]}
			onPress={() => onPress && onPress(item.key)}
		>
			{item.value}
		</Pressable>
	)
}

const styles = StyleSheet.create({
	rowCircle: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.accentColors.black,
		width: 50,
		height: 50,
		padding: 5,
		borderRadius: 25,
		marginRight: 16,
	},
})
