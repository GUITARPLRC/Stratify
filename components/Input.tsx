import { Colors } from "@/constants/Colors"
import { useRef } from "react"
import { StyleSheet, TextInput, Pressable } from "react-native"

const Input = ({ ...rest }) => {
	const inputRef = useRef<TextInput>(null)
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
		backgroundColor: Colors.black,
		borderRadius: 10,
		paddingHorizontal: 20,
		paddingVertical: 15,
	},
	input: {
		color: Colors.text,
		fontSize: 20,
		fontFamily: "Montserrat",
	},
})

export default Input
