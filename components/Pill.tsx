import { Colors } from "@/constants/Colors"
import { StyleSheet, Pressable } from "react-native"

const Pill = ({
	children,
	selected,
	onPress,
	selectedColor,
	listPill = false,
}: {
	children: string | React.ReactNode
	selected: boolean
	onPress?: () => void
	selectedColor: string
	listPill?: boolean
}) => {
	return (
		<Pressable
			onPress={() => (onPress ? onPress() : undefined)}
			style={[
				styles.container,
				{
					backgroundColor: selected
						? selectedColor
							? selectedColor
							: Colors.black
						: listPill
						? Colors.black
						: Colors.grey,
				},
			]}
		>
			{children}
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 20,
		height: 35,
		paddingHorizontal: 15,
	},
})

export default Pill
