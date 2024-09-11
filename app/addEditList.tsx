import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, View } from "react-native"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { useRoute } from "@react-navigation/native"
import { useFocusEffect, useNavigation } from "expo-router"
import Input from "@/components/Input"
import { Picker } from "@react-native-picker/picker"
import { useState } from "react"
import AddEditButton from "@/components/AddEditButton"
import { Colors } from "@/constants/Colors"
import { Apple, ClipboardList, Folder, Plane, ShoppingCart } from "lucide-react-native"
import ItemIconColorSelect from "@/components/ItemIconColorSelect"
import { db } from "@/database"
import * as schema from "@/database/schema"
import { eq } from "drizzle-orm"

export default function AddEditList() {
	const { params } = useRoute()
	const { title, item } = params as { title: string; item: schema.List }
	const [itemTitle, setItemTitle] = useState(item?.title || "")
	const navigation = useNavigation()
	useFocusEffect(() => {
		navigation.setOptions({
			title,
		})
	})

	const createList = async () => {
		const userData = await db.select().from(schema.user)
		return db.insert(schema.list).values({
			title: itemTitle,
			color: selectedColor,
			icon: selectedIcon,
			userId: userData[0].id,
		})
	}

	const editList = async () => {
		return db
			.update(schema.list)
			.set({
				title: itemTitle,
				color: selectedColor,
				icon: selectedIcon,
			})
			.where(eq(schema.list.id, item.id))
	}

	const deleteList = async () => {
		return db.delete(schema.list).where(eq(schema.list.id, item.id))
	}

	const [priority, setPriority] = useState("")

	const [selectedIcon, setSelectedIcon] = useState(item?.icon || "")
	const icons = [
		{
			key: "list",
			value: <ClipboardList size={24} color={Colors.text} />,
		},
		{ key: "food", value: <Apple size={24} color={Colors.text} /> },
		{ key: "shopping", value: <ShoppingCart size={24} color={Colors.text} /> },
		{ key: "travel", value: <Plane size={24} color={Colors.text} /> },
		{ key: "folder", value: <Folder size={24} color={Colors.text} /> },
	]

	const [selectedColor, setSelectedColor] = useState(item?.color || "")
	const colors = [
		{
			key: "red",
			value: <View style={[styles.colorCircle, { backgroundColor: Colors.accentColors.red }]} />,
		},
		{
			key: "yellow",
			value: <View style={[styles.colorCircle, { backgroundColor: Colors.accentColors.yellow }]} />,
		},
		{
			key: "green",
			value: <View style={[styles.colorCircle, { backgroundColor: Colors.accentColors.green }]} />,
		},
		{
			key: "blue",
			value: <View style={[styles.colorCircle, { backgroundColor: Colors.accentColors.blue }]} />,
		},
		{
			key: "purple",
			value: <View style={[styles.colorCircle, { backgroundColor: Colors.accentColors.purple }]} />,
		},
	]

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={80}>
			<ScrollView>
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
						<View style={styles.inputContainer}>
							<ThemedText style={styles.inputLabel}>Icon</ThemedText>
							<View style={styles.rowContainer}>
								<ItemIconColorSelect
									items={icons}
									onPress={setSelectedIcon}
									selectedKey={selectedIcon}
								/>
							</View>
						</View>
						<View style={styles.inputContainer}>
							<ThemedText style={styles.inputLabel}>Color</ThemedText>
							<View style={styles.rowContainer}>
								<ItemIconColorSelect
									items={colors}
									onPress={setSelectedColor}
									selectedKey={selectedColor}
								/>
							</View>
						</View>
					</View>
					<View style={styles.buttonContainer}>
						<View style={styles.deleteButtonContainer}>
							<Pressable
								style={styles.deleteButton}
								onPress={async () => {
									await deleteList()
									navigation.navigate("index")
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
									await editList()
								} else {
									// create
									await createList()
								}
								navigation.goBack()
							}}
						/>
					</View>
				</ThemedView>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	buttonContainer: {
		justifyContent: "flex-end",
		flex: 1,
		marginBottom: 30,
	},
	colorCircle: {
		width: 24,
		height: 24,
		borderRadius: 12,
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
	rowContainer: {
		flexDirection: "row",
	},
	rowCircle: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.accentColors.black,
		width: 50,
		height: 50,
		padding: 5,
		borderRadius: 25,
		marginRight: 16,
	},
})
