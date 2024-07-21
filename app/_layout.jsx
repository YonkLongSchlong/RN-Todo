import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";

export default function RootLayout() {
    const queryClient = new QueryClient();
    const [loaded, error] = useFonts({
        thin: require("../assets/font/Roboto-Thin.ttf"),
        regular: require("../assets/font/Roboto-Regular.ttf"),
        medium: require("../assets/font/Roboto-Medium.ttf"),
        mediumItalic: require("../assets/font/Roboto-MediumItalic.ttf"),
        bold: require("../assets/font/Roboto-Bold.ttf"),
        black: require("../assets/font/Roboto-Black.ttf"),
        fontTitle: require("../assets/font/Pacifico-Regular.ttf"),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="(auth)"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="(tabs)"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="(settings)"
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>
        </QueryClientProvider>
    );
}
