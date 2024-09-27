import { ScrollView, StyleSheet, View } from "react-native"
import { useRoute } from "@react-navigation/native"
import { useNavigation } from "expo-router"
import { useState } from "react"
import AddEditButton from "@/components/AddEditButton"
import { db } from "@/database"
import * as schema from "@/database/schema"
import ItemInputs from "@/components/ItemInputs"

export default function AddItem() {
	const { params } = useRoute()
	const { item, list } = params as {
		item: schema.ListItem
		list: schema.List
	}
	const [itemTitle, setItemTitle] = useState(item?.title || "")
	const [itemSubtitle, setItemSubtitle] = useState(item?.subtitle || "")
	const [itemDescription, setItemDescription] = useState(item?.description || "")
	const navigation = useNavigation()

	const createItem = async () => {
		return db.insert(schema.listItem).values({
			title: itemTitle,
			subtitle: itemSubtitle,
			description: itemDescription,
			listId: list.id,
			priority: priority ? Number(priority) : null,
		})
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
					type={"Create"}
					onPress={async () => {
						await createItem()
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
