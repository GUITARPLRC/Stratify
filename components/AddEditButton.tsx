import { Pressable, StyleSheet } from "react-native"
import { ThemedText } from "@/components/ThemedText"
import { Colors } from "@/constants/Colors"

export default function AddEditButton({
	type,
	onPress,
}: {
	type: "Update" | "Create"
	onPress: () => void
}) {
	return (
		<Pressable style={styles.button} onPress={onPress}>
			<ThemedText style={{ fontSize: 20 }}>{type}</ThemedText>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: Colors.primary,
		borderRadius: 10,
		fontSize: 24,
		padding: 10,
		width: "100%",
		height: 60,
		justifyContent: "center",
		alignItems: "center",
	},
})
