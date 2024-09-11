import { StyleSheet, ScrollView } from "react-native"

const PillList = ({ children }: { children: React.ReactNode }) => {
	return (
		<ScrollView horizontal style={styles.container}>
			{children}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		flexWrap: "nowrap",
	},
})

export default PillList
