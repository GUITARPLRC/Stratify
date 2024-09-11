import { Colors } from "@/constants/Colors"
import { useNavigation } from "expo-router"
import { Pressable, StyleSheet, View } from "react-native"
import { Plus } from "lucide-react-native"
import { List } from "@/database/schema"

const AddButton = ({ addType, list }: { addType: "Item" | "List"; list?: List }) => {
	const navigation = useNavigation()

	const handleOnPress = () =>
		navigation.navigate(list ? "addEditItem" : "addEditList", {
			title: `Add ${addType}`,
			list: list,
		})

	return (
		<View style={styles.container}>
			<Pressable style={styles.buttonContainer} onPress={handleOnPress}>
				{/* Maybe this should be an icon instead of text */}
				<Plus size={30} color={Colors.text} />
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	button: {
		color: "white",
		fontSize: 50,
		lineHeight: 50,
		marginLeft: 1,
	},
	buttonContainer: {
		backgroundColor: Colors.primary,
		borderRadius: 60,
		padding: 10,
		width: 60,
		height: 60,
		justifyContent: "center",
		alignItems: "center",
	},
	container: {
		position: "absolute",
		bottom: 20,
		right: 0,
		zIndex: 10000,
	},
})

export default AddButton
