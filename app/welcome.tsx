import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { useNavigation } from "expo-router"
import { Pressable, View, StyleSheet } from "react-native"
import { Colors } from "@/constants/Colors"
import ConfettiCannon from "react-native-confetti-cannon"

export default function Welcome() {
	const navigation = useNavigation()
	return (
		<ThemedView style={{ flex: 1, alignItems: "center" }}>
			<ThemedText type="title" style={{ marginBottom: 20 }}>
				👋 Hey there!
			</ThemedText>
			<ThemedText type="title">Welcome to</ThemedText>
			<ThemedText type="title" style={{ marginBottom: 20 }}>
				Stratify
			</ThemedText>
			<ThemedText>Get started by pressing the add button on the next page!</ThemedText>
			<View style={styles.buttonContainer}>
				<Pressable style={styles.button} onPress={() => navigation.navigate("index")}>
					<ThemedText style={{ fontSize: 20 }}>Let's Go</ThemedText>
				</Pressable>
			</View>
			<ConfettiCannon
				count={200}
				origin={{ x: -200, y: 0 }}
				fadeOut
				autoStartDelay={1000}
				autoStart
			/>
		</ThemedView>
	)
}

const styles = StyleSheet.create({
	buttonContainer: {
		width: "100%",
		marginTop: 100,
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
