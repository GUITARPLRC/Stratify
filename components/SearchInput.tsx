import { Colors } from "@/constants/Colors"
import { View, StyleSheet, TextInput } from "react-native"
import { Search } from "lucide-react-native"

const SearchInput = ({ value, onChange }: { value: string; onChange: (val: string) => void }) => {
	return (
		<View style={styles.container}>
			<Search size={22} color={Colors.accentColors.black} />
			<TextInput
				style={styles.input}
				placeholder="Search"
				placeholderTextColor={Colors.accentColors.black}
				value={value}
				onChangeText={onChange}
			/>
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.accentColors.grey,
		borderRadius: 20,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 10,
		paddingVertical: 8,
	},
	input: {
		color: Colors.accentColors.black,
		fontSize: 17,
		fontFamily: "Montserrat",
		marginLeft: 10,
	},
})

export default SearchInput
