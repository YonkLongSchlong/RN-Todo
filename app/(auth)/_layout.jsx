import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import Color from "../../constants/Color";

const toastConfig = {
    /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
    success: (props) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: Color.Thistle, marginTop: 35 }}
            contentContainerStyle={{
                paddingHorizontal: 15,
                justifyContent: "center",
            }}
            text1Style={{
                fontFamily: "medium",
                fontSize: 15,
            }}
            text2Style={{
                fontFamily: "medium",
                fontSize: 14,
                color: "black",
            }}
        />
    ),

    error: (props) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: Color.LavenderPurple, marginTop: 35 }}
            contentContainerStyle={{
                paddingHorizontal: 15,
                justifyContent: "center",
            }}
            text1Style={{
                fontFamily: "medium",
                fontSize: 15,
            }}
            text2Style={{
                fontFamily: "medium",
                fontSize: 14,
                color: "black",
            }}
        />
    ),
};

export default function AuthLayout() {
    return (
        <>
            <StatusBar style="light" />
            <Stack initialRouteName="register">
                <Stack.Screen
                    name="register"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="login"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="recover"
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>
            <Toast config={toastConfig} />
        </>
    );
}
