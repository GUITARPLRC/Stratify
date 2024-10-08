import { View, StyleSheet } from "react-native"
import PillList from "./PillList"
import { Apple, ClipboardList, Folder, Plane, ShoppingCart, Star } from "lucide-react-native"

// * WIP 🚧

// TODO: iterate on displaying pills per section
// TODO: iterate on selected sort option, currently only "all" is selected
// TODO: create PillContent component to pass props

const homePillOptions = {
	0: "all",
	1: "favorite",
	2: "list",
	3: "food",
	4: "shopping",
	5: "travel",
	6: "folder",
}

const homePillIcons = {
	// move this inside the create PillContent function to pass props
	// now being copied to IterableItem need to extract for re-use
	favorite: <Star size={24} color="#000" />,
	list: <ClipboardList size={24} color="#000" />,
	food: <Apple size={24} color="#000" />,
	shopping: <ShoppingCart size={24} color="#000" />,
	travel: <Plane size={24} color="#000" />,
	folder: <Folder size={24} color="#000" />,
}

const HomePills = () => {
	return (
		<View style={styles.container}>
			<PillList>
				{Object.keys(homePillOptions).map((key) => (
					<View key={key} style={styles.pillContainer}>
						{/* <Pill selected={homePillOptions[key] === "all"}>
							{homePillOptions[key] === "all" ? (
								<ThemedText type="medium">All</ThemedText>
							) : (
								homePillIcons[homePillOptions[key]]
							)}
						</Pill> */}
					</View>
				))}
			</PillList>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 20,
	},
	pillContainer: {
		marginRight: 20,
	},
})

export default HomePills
