import { StackActions } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { router, useNavigationContainerRef } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import EditTextInput from "../../components/EditTextInput";
import Color from "../../constants/Color";
import updatePassword from "../../hooks/user/updatePassword";
import userStore from "../../store/userStore";

export default function Password() {
    const rootNavigation = useNavigationContainerRef();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const user = userStore((state) => state.user);
    const token = userStore((state) => state.token);

    const updateMutation = useMutation({
        mutationFn: updatePassword,
        onSuccess: async (data) => {
            console.log(data);
            await SecureStore.deleteItemAsync("User");
            await SecureStore.deleteItemAsync("Token");
            rootNavigation.dispatch(StackActions.popToTop());
            router.replace("/login");
            setTimeout(() => {
                Toast.show({
                    type: "success",
                    text1: "Update password successfully",
                    text2: "Please sign in again👏👏",
                });
            }, 500);
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const handleUpdate = () => {
        const id = user.id;
        updateMutation.mutate({ id, currentPassword, newPassword, token });
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Change password</Text>
            </View>
            <View style={styles.inputContainer}>
                <EditTextInput
                    label={"Current password"}
                    ecrypted={true}
                    value={currentPassword}
                    setValue={setCurrentPassword}
                />
                <EditTextInput
                    label={"New password"}
                    ecrypted={true}
                    value={newPassword}
                    setValue={setNewPassword}
                />
                <EditTextInput
                    label={"Confirm new password"}
                    ecrypted={true}
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                />
            </View>
            <Pressable style={styles.updateBtn} onPress={handleUpdate}>
                <Text style={styles.btnText}>Update</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        backgroundColor: Color.White,
    },
    headerContainer: {
        justifyContent: "center",
        marginBottom: 25,
        paddingHorizontal: 25,
    },
    header: {
        fontFamily: "black",
        fontSize: 20,
    },
    inputContainer: {
        gap: 15,
        paddingHorizontal: 25,
        marginBottom: 50,
    },
    updateBtn: {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 25,
        paddingVertical: 20,
        backgroundColor: Color.LavenderPurple,
        borderRadius: 15,
    },
    btnText: {
        fontFamily: "medium",
        fontSize: 14,
        color: Color.White,
    },
});
