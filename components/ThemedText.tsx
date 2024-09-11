import { Colors } from "@/constants/Colors"
import { Text, type TextProps, StyleSheet } from "react-native"

export type ThemedTextProps = TextProps & {
	type?: "default" | "title" | "subtitle"
}

export function ThemedText({ style, type = "default", ...rest }: ThemedTextProps) {
	return (
		<Text
			style={[
				{ color: Colors.text, fontFamily: "Montserrat" },
				type === "default" ? styles.default : undefined,
				type === "title" ? styles.title : undefined,
				type === "subtitle" ? styles.subtitle : undefined,
				style,
			]}
			{...rest}
		/>
	)
}

const styles = StyleSheet.create({
	default: {
		fontSize: 14,
		lineHeight: 24,
	},
	title: {
		fontSize: 22,
		lineHeight: 32,
	},
	subtitle: {
		fontSize: 14,
		color: Colors.accentColors.darkGrey,
	},
})
