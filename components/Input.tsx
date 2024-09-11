import { Colors } from "@/constants/Colors"
import { View, StyleSheet, TextInput } from "react-native"

const Input = ({ ...rest }) => {
	return (
		<View style={styles.container}>
			<TextInput style={styles.input} {...rest} />
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.accentColors.black,
		borderRadius: 10,
		paddingHorizontal: 20,
		paddingVertical: 15,
	},
	input: {
		color: Colors.text,
		fontSize: 24,
		fontFamily: "Montserrat",
	},
})

export default Input
