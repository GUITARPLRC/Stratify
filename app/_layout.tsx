import { useFonts } from "expo-font"
import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"
import "react-native-reanimated"
import { useDrizzleStudio } from "expo-drizzle-studio-plugin"
import { SQLiteProvider } from "../providers/sqlite.provider"
import { expoDb } from "../database"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { View } from "react-native"
import { Colors } from "@/constants/Colors"
import { StatusBar } from "expo-status-bar"

const queryClient = new QueryClient()

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [loaded] = useFonts({
		Montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
	})

	// TODO: fix this, how to use
	const DrizzleStudio = () => {
		useDrizzleStudio(expoDb)
		return <View></View>
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
			{/* Add drizzle studio plugin */}
			{__DEV__ && <DrizzleStudio />}

			{/* light TEXT color status for time, wifi, battery */}
			<StatusBar style="light" />

			<SQLiteProvider>
				<QueryClientProvider client={queryClient}>
					<Stack
						// all screens will have the same options
						screenOptions={{
							headerBackTitleStyle: {
								fontFamily: "Montserrat",
								fontSize: 16,
							},
							headerTintColor: Colors.text,
							headerStyle: {
								backgroundColor: Colors.background,
							},
							headerTitleStyle: {
								color: Colors.text,
								fontFamily: "Montserrat",
								fontSize: 18,
							},
							headerShadowVisible: false, // hides bottom "border"
							contentStyle: {
								backgroundColor: Colors.background,
								paddingHorizontal: 20,
								paddingVertical: 10,
							},
						}}
					>
						<Stack.Screen
							name="index"
							options={{
								title: "Home",
							}}
						/>
						<Stack.Screen
							name="welcome"
							options={{
								title: "",
								headerBackVisible: false,
								animation: "none",
							}}
						/>
						<Stack.Screen
							name="list"
							options={{
								title: "My List",
							}}
						/>
						<Stack.Screen name="addEditList" />
						<Stack.Screen name="addEditItem" />
					</Stack>
				</QueryClientProvider>
			</SQLiteProvider>
		</>
	)
}
