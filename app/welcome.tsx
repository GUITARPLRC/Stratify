import { ThemedText } from "@/components/ThemedText"
import { useNavigation } from "expo-router"
import { Pressable, View, StyleSheet } from "react-native"
import { Colors } from "@/constants/Colors"
import ConfettiCannon from "react-native-confetti-cannon"

export default function Welcome() {
	const navigation = useNavigation()
	return (
		<>
			<View style={{ flex: 1, justifyContent: "space-between" }}>
				<View>
					<ThemedText type="title" style={{ marginBottom: 20 }}>
						👋 Hey there!
					</ThemedText>
					<ThemedText type="title">Welcome to Stratify</ThemedText>
					<ThemedText>Get started by pressing the add + button on the next page!</ThemedText>
				</View>
				<View style={styles.buttonContainer}>
					<Pressable style={styles.button} onPress={() => navigation.navigate("index")}>
						<ThemedText style={{ fontSize: 20 }}>Let's Go</ThemedText>
					</Pressable>
				</View>
			</View>
			<ConfettiCannon count={100} fallSpeed={3500} origin={{ x: 0, y: 0 }} fadeOut autoStart />
		</>
	)
}

const styles = StyleSheet.create({
	buttonContainer: {
		width: "100%",
		marginTop: 100,
		marginBottom: 30,
	},
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
