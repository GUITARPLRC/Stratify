import { Colors } from "@/constants/Colors"
import { Text, type TextProps, StyleSheet } from "react-native"

export type ThemedTextProps = TextProps & {
	type?: keyof typeof styles
}

export function ThemedText({ style, type = "large", ...rest }: ThemedTextProps) {
	return (
		<Text
			style={[
				{ color: Colors.text, fontFamily: "Montserrat" },
				styles[type as keyof typeof styles],
				style,
			]}
			{...rest}
		/>
	)
}

const styles = StyleSheet.create({
	xl: {
		fontSize: 24,
	},
	large: {
		fontSize: 20,
	},
	medium: {
		fontSize: 16,
	},
	small: {
		fontSize: 12,
	},
	subtitle: {
		fontSize: 12,
		color: Colors.darkGrey,
	},
})
