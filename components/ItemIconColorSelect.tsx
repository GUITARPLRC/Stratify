import EditItemOption from "./EditItemOption"

export default function ItemIconColorSelect({
	items,
	onPress,
	selectedKey,
}: {
	items: { key: string; value: any }[]
	onPress: (arg: string) => void
	selectedKey: string
}) {
	return items.map((item) => (
		<EditItemOption
			key={item.key}
			item={item}
			onPress={onPress}
			isSelected={selectedKey === item.key}
		/>
	))
}
