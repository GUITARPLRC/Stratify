import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native"
import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import "react-native-reanimated"
import { useDrizzleStudio } from "expo-drizzle-studio-plugin"

import { SQLiteProvider } from "../providers/sqlite.provider"
import { expoDb } from "../database"

import { useColorScheme } from "@/hooks/useColorScheme"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const theme = useColorScheme() ?? "light"
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	})

	const DrizzleStudio = () => {
		useDrizzleStudio(expoDb)
		return null
	}

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	if (!loaded) {
		return null
	}

	return (
		<>
			{__DEV__ && <DrizzleStudio />}
			<ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
				<SQLiteProvider>
					<Stack>
						<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
						<Stack.Screen name="+not-found" />
					</Stack>
				</SQLiteProvider>
			</ThemeProvider>
		</>
	)
}
