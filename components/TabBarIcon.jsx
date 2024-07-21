import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Color from "../constants/Color";

export default function TabBarIcon({ focused, iconName, labelName }) {
    return (
        <>
            {focused ? (
                <View style={styles.container}>
                    <Ionicons
                        name={iconName}
                        size={26}
                        color={Color.White}
                    ></Ionicons>
                    {focused ? (
                        <Text style={styles.label}>{labelName}</Text>
                    ) : null}
                </View>
            ) : (
                <View style={styles.containerNonFocused}>
                    <Ionicons
                        name={iconName}
                        size={30}
                        color={Color.LavenderPurple}
                    ></Ionicons>
                    {focused ? (
                        <Text style={styles.label}>{labelName}</Text>
                    ) : null}
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Color.LavenderPurple,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
    },
    containerNonFocused: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Color.Lumber,
    },
    label: {
        fontFamily: "medium",
        fontSize: 14,
        color: Color.White,
    },
});
