import { Pressable, ScrollView, StyleSheet, View } from "react-native"
import { ThemedText } from "@/components/ThemedText"
import { useRoute } from "@react-navigation/native"
import { useFocusEffect, useNavigation } from "expo-router"
import Input from "@/components/Input"
import { useState } from "react"
import AddEditButton from "@/components/AddEditButton"
import { Colors } from "@/constants/Colors"
import {
	Apple,
	ClipboardList,
	Folder,
	Plane,
	ShoppingCart,
	Trash2 as Trash,
} from "lucide-react-native"
import ItemIconColorSelect from "@/components/ItemIconColorSelect"
import { db } from "@/database"
import * as schema from "@/database/schema"
import { eq } from "drizzle-orm"
import { hasAction, requestReview } from "expo-store-review"

export default function AddEditList() {
	const { params } = useRoute()
	const { title, item } = params as { title: string; item: schema.List }
	const isEdit = title.includes("Edit")
	const [itemTitle, setItemTitle] = useState(item?.title || "")
	const navigation = useNavigation()
	useFocusEffect(() => {
		navigation.setOptions({
			title,
			headerRight: () =>
				isEdit ? (
					<Pressable
						onPress={async () => {
							await deleteList()
							navigation.navigate("index")
						}}
					>
						<Trash size={18} color={Colors.text} />
					</Pressable>
				) : null,
		})
	})

	const createList = async () => {
		// check if second list and if user has submitted review
		// if so, request
		const listData = await db.select().from(schema.list)
		const userData = await db.select().from(schema.user)
		if (listData.length >= 1 && !userData[0].hasSubmittedReview && (await hasAction())) {
			requestReview()
			await db
				.update(schema.user)
				.set({ hasSubmittedReview: true })
				.where(eq(schema.user.id, userData[0].id))
		}

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
		<ScrollView
			// * 2 cool features of ScrollView
			showsVerticalScrollIndicator={false}
			automaticallyAdjustKeyboardInsets={true}
			contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}
		>
			<View>
				<ThemedText style={styles.inputLabel}>Title</ThemedText>
				<View style={styles.inputContainer}>
					<Input value={itemTitle} onChangeText={setItemTitle} />
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
				<AddEditButton
					type={isEdit ? "Update" : "Create"}
					onPress={async () => {
						if (isEdit) {
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
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	buttonContainer: {
		justifyContent: "flex-end",
		marginBottom: 30,
	},
	colorCircle: {
		width: 24,
		height: 24,
		borderRadius: 12,
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
