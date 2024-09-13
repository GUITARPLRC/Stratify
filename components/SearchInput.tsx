import { Colors } from "@/constants/Colors"
import { View, StyleSheet, TextInput, Pressable } from "react-native"
import { Cross, Search, X } from "lucide-react-native"
import { useRef } from "react"

const SearchInput = ({ value, onChange }: { value: string; onChange: (val: string) => void }) => {
	const inputRef = useRef<TextInput>(null)
	return (
		<View
			style={styles.container}
			onTouchStart={() => inputRef.current && inputRef.current.focus()}
		>
			<Search size={22} color={Colors.black} />
			<TextInput
				ref={inputRef}
				style={styles.input}
				placeholder="Search"
				placeholderTextColor={Colors.black}
				value={value}
				onChangeText={onChange}
			/>
			{/* Clear Search */}
			{value && (
				<Pressable onPress={() => onChange("")}>
					<X size={22} color={Colors.black} />
				</Pressable>
			)}
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.grey,
		borderRadius: 20,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 10,
		paddingVertical: 8,
	},
	input: {
		color: Colors.black,
		fontSize: 20,
		fontFamily: "Montserrat",
		marginLeft: 10,
		flex: 1,
	},
})

export default SearchInput
