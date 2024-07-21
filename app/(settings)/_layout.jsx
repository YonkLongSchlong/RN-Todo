import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
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
                color: "black",
            }}
            text2Style={{
                fontFamily: "medium",
                fontSize: 13,
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
                color: "black",
            }}
            text2Style={{
                fontFamily: "medium",
                fontSize: 13,
                color: "black",
            }}
        />
    ),
};

export default function SettingsLayout() {
    return (
        <>
            <StatusBar style="light" />
            <Stack>
                <Stack.Screen
                    name="edit"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="password"
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>
            <Toast config={toastConfig} />
        </>
    );
}

const styles = StyleSheet.create({});
