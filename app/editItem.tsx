import { Pressable, ScrollView, StyleSheet, View } from "react-native"
import { useRoute } from "@react-navigation/native"
import { useFocusEffect, useNavigation } from "expo-router"
import { useState } from "react"
import AddEditButton from "@/components/AddEditButton"
import { db } from "@/database"
import * as schema from "@/database/schema"
import { eq } from "drizzle-orm"
import { Trash2 as Trash } from "lucide-react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"
import ItemInputs from "@/components/ItemInputs"

export default function EditItem() {
	const { params } = useRoute()
	const { item } = params as {
		item: schema.ListItem
	}
	const [itemTitle, setItemTitle] = useState(item?.title || "")
	const [itemSubtitle, setItemSubtitle] = useState(item?.subtitle || "")
	const [itemDescription, setItemDescription] = useState(item?.description || "")
	const navigation = useNavigation()
	useFocusEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<Pressable
					onPress={async () => {
						await deleteItem()
						navigation.goBack()
					}}
				>
					<Trash size={18} color={Colors.text} />
				</Pressable>
			),
		})
	})

	const editItem = async () => {
		return db
			.update(schema.listItem)
			.set({
				title: itemTitle,
				subtitle: itemSubtitle,
				description: itemDescription,
				priority: priority ? Number(priority) : null,
			})
			.where(eq(schema.listItem.id, item.id))
	}

	const deleteItem = async () => {
		return db.delete(schema.listItem).where(eq(schema.listItem.id, item.id))
	}

	const [priority, setPriority] = useState(item?.priority || 0)

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			automaticallyAdjustKeyboardInsets={true}
			contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}
		>
			<ItemInputs
				{...{
					itemTitle,
					setItemTitle,
					itemSubtitle,
					setItemSubtitle,
					itemDescription,
					setItemDescription,
					priority,
					setPriority,
				}}
			/>

			<View style={styles.buttonContainer}>
				<AddEditButton
					type={"Update"}
					onPress={async () => {
						await editItem()
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
		flex: 1,
		marginBottom: 30,
	},
})
