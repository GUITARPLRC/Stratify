import { Colors } from "@/constants/Colors"
import { useRef } from "react"
import { StyleSheet, TextInput, Pressable } from "react-native"

const Input = ({ ...rest }) => {
	const inputRef = useRef(null)
	return (
		<Pressable
			style={styles.container}
			onPress={() => inputRef.current && inputRef.current.focus()}
		>
			<TextInput ref={inputRef} style={styles.input} {...rest} />
		</Pressable>
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
