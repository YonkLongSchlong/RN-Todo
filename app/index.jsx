import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Color from "../constants/Color";
import userStore from "../store/userStore";

export default function index() {
    const setUser = userStore((state) => state.setUser);
    const setToken = userStore((state) => state.setToken);

    useEffect(() => {
        const getAuth = async () => {
            const userInStore = await SecureStore.getItemAsync("User");
            const tokenInStore = await SecureStore.getItemAsync("Token");
            if (userInStore != undefined && tokenInStore != undefined) {
                await setUser(JSON.parse(userInStore));
                await setToken(tokenInStore);

                router.push("/home");
            } else {
                router.push("/login");
            }
        };

        setTimeout(() => {
            getAuth();
        }, 1000);
    }, []);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[Color.PastelViolet, Color.Lumber]}
                style={styles.background}
            >
                <Text style={styles.appText}>Be better</Text>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    background: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    btn: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: Color.LavenderPurple,
    },
    appText: {
        fontFamily: "fontTitle",
        color: "white",
        fontSize: 60,
    },
});
