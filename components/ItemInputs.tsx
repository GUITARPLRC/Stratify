import { Picker } from "@react-native-picker/picker"
import { View, StyleSheet } from "react-native"
import Input from "./Input"
import { ThemedText } from "./ThemedText"

export default function ItemInputs({
	itemTitle,
	setItemTitle,
	itemSubtitle,
	setItemSubtitle,
	itemDescription,
	setItemDescription,
	priority,
	setPriority,
}: {
	itemTitle: string
	setItemTitle: (value: string) => void
	itemSubtitle: string
	setItemSubtitle: (value: string) => void
	itemDescription: string
	setItemDescription: (value: string) => void
	priority: number
	setPriority: (value: number) => void
}) {
	return (
		<>
			<View>
				<ThemedText style={styles.inputLabel}>Title</ThemedText>
				<View style={styles.inputContainer}>
					<Input value={itemTitle} onChangeText={setItemTitle} />
				</View>
			</View>
			<View>
				<ThemedText style={styles.inputLabel}>Subtitle</ThemedText>
				<View style={styles.inputContainer}>
					<Input value={itemSubtitle} onChangeText={setItemSubtitle} />
				</View>
			</View>
			<View>
				<ThemedText style={styles.inputLabel}>Description</ThemedText>
				<View style={styles.inputContainer}>
					<Input value={itemDescription} onChangeText={setItemDescription} />
				</View>
			</View>
			<View>
				<ThemedText style={[styles.inputLabel, { marginBottom: -30 }]}>Priority</ThemedText>
				<View style={[styles.inputContainer, { alignItems: "center" }]}>
					<Picker selectedValue={priority} onValueChange={setPriority} style={{ width: "100%" }}>
						{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
							<Picker.Item key={item} label={item.toString()} value={item} color="#fff" />
						))}
					</Picker>
				</View>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	inputLabel: {
		marginBottom: 8,
	},
	inputContainer: {
		marginBottom: 24,
	},
})
