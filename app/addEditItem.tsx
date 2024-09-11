import { Pressable, StyleSheet, View } from "react-native"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { useRoute } from "@react-navigation/native"
import { useFocusEffect, useNavigation } from "expo-router"
import Input from "@/components/Input"
import { Picker } from "@react-native-picker/picker"
import { useState } from "react"
import AddEditButton from "@/components/AddEditButton"
import { db } from "@/database"
import * as schema from "@/database/schema"
import { eq } from "drizzle-orm"

export default function AddEditItem() {
	const { params } = useRoute()
	const { title, item, list } = params as {
		title: string
		item: schema.ListItem
		list: schema.List
	}
	const [itemTitle, setItemTitle] = useState(item?.title || "")
	const [itemSubtitle, setItemSubtitle] = useState(item?.subtitle || "")
	const [itemDescription, setItemDescription] = useState(item?.description || "")
	const navigation = useNavigation()
	useFocusEffect(() => {
		navigation.setOptions({
			title,
		})
	})

	const createItem = async () => {
		return db.insert(schema.listItem).values({
			title: itemTitle,
			subtitle: itemSubtitle,
			description: itemDescription,
			listId: list.id,
		})
	}

	const editItem = async () => {
		return db
			.update(schema.listItem)
			.set({
				title: itemTitle,
				subtitle: itemSubtitle,
				description: itemDescription,
			})
			.where(eq(schema.listItem.id, item.id))
	}

	const deleteItem = async () => {
		return db.delete(schema.listItem).where(eq(schema.listItem.id, item.id))
	}

	const [priority, setPriority] = useState("")

	return (
		<ThemedView
			style={{
				flex: 1,
			}}
		>
			<View>
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
						<Picker
							selectedValue={priority || "0"}
							onValueChange={setPriority}
							style={{ width: "100%" }}
						>
							{["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((item) => (
								<Picker.Item key={item} label={item} value={item} color="#fff" />
							))}
						</Picker>
					</View>
				</View>
			</View>
			<View style={styles.buttonContainer}>
				<View style={styles.deleteButtonContainer}>
					<Pressable
						style={styles.deleteButton}
						onPress={async () => {
							await deleteItem()
							navigation.goBack()
						}}
					>
						<ThemedText>Delete</ThemedText>
					</Pressable>
				</View>
				<AddEditButton
					type={title.includes("Edit") ? "Update" : "Create"}
					onPress={async () => {
						if (title.includes("Edit")) {
							// edit / update
							await editItem()
						} else {
							// create
							await createItem()
						}
						navigation.goBack()
					}}
				/>
			</View>
		</ThemedView>
	)
}

const styles = StyleSheet.create({
	buttonContainer: {
		justifyContent: "flex-end",
		flex: 1,
		marginBottom: 30,
	},
	deleteButtonContainer: {
		alignItems: "center",
		marginBottom: 16,
	},
	deleteButton: {
		padding: 8,
	},
	inputLabel: {
		fontSize: 20,
		marginBottom: 8,
	},
	inputContainer: {
		marginBottom: 24,
	},
})
