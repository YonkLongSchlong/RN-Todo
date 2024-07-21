import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Camera } from "lucide-react-native";
import React, { useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Toast from "react-native-toast-message";
import EditTextInput from "../../components/EditTextInput";
import Color from "../../constants/Color";
import updateAvatar from "../../hooks/user/updateAvatar";
import updateUser from "../../hooks/user/updateUser";
import userStore from "../../store/userStore";

export default function Edit() {
    const user = userStore((state) => state.user);
    const token = userStore((state) => state.token);
    const setUser = userStore((state) => state.setUser);
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const updateMutation = useMutation({
        mutationFn: updateUser,
        onSuccess: (data) => {
            setUser(data);
            setTimeout(() => {
                Toast.show({
                    type: "success",
                    text1: "Update profile successfully",
                    text2: "Your profile have been updated 👏👏",
                });
            }, 500);
            router.back();
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const handleUpdate = () => {
        const id = user.id;
        console.log("Here");
        updateMutation.mutate({
            id,
            firstName,
            lastName,
            email,
            password,
            token,
        });
    };

    const avatarMutation = useMutation({
        mutationFn: updateAvatar,
        onSuccess: async (response) => {
            if (response.status === 200) {
                const data = await response.json();
                setUser(data);
            } else {
                throw new Error("Update avatar failed");
            }
        },
        onError: (error) => {
            Toast.show({
                type: "error",
                text1: error.message,
                text2: "Please try again later 😔",
            });
        },
    });

    const handleUploadImage = async () => {
        const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status) {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                quality: 1,
            });
            handleImage(user, token, result);
        }
    };

    const handleImage = async (user, token, result) => {
        if (!result.canceled) {
            const fileMime = result.assets[0].type;
            const fileType = result.assets[0].uri.split(".").pop();

            const options = {
                uri: `${result.assets[0].uri}`,
                name: `${user.id}-${Date.now().toString()}.${fileType}`,
                type: `${fileMime}/${fileType}`,
            };

            let formData = new FormData();
            formData.append("image", options);

            const id = user.id;
            avatarMutation.mutate({ id, formData, token });
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Edit Profile</Text>
            </View>
            <View style={styles.avatarContainer}>
                <View style={styles.avatarBorder}>
                    <Image
                        style={styles.avatar}
                        source={{ uri: user.avatar }}
                    />
                    <Pressable
                        style={styles.addBtn}
                        onPress={handleUploadImage}
                    >
                        <Camera size={24} color={Color.White} />
                    </Pressable>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <EditTextInput
                    label={"First name"}
                    ecrypted={false}
                    value={firstName}
                    setValue={setFirstName}
                />
                <EditTextInput
                    label={"Last name"}
                    ecrypted={false}
                    value={lastName}
                    setValue={setLastName}
                />
                <EditTextInput
                    label={"Email"}
                    ecrypted={false}
                    value={email}
                    setValue={setEmail}
                />
                <EditTextInput
                    label={"Password"}
                    ecrypted={true}
                    value={password}
                    setValue={setPassword}
                />
            </View>
            <Pressable style={styles.updateBtn} onPress={handleUpdate}>
                <Text style={styles.btnText}>Update</Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: Color.White,
    },
    headerContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
    },
    header: {
        fontFamily: "black",
        fontSize: 20,
    },
    avatarContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    avatarBorder: {
        borderWidth: 3,
        borderRadius: 164,
        width: 163,
        height: 163,
        justifyContent: "center",
        alignItems: "center",
        borderColor: Color.Thistle,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 150,
        resizeMode: "cover",
    },
    addBtn: {
        backgroundColor: Color.LavenderPurple,
        padding: 10,
        borderRadius: 70,
        position: "absolute",
        bottom: -10,
        right: 20,
    },
    inputContainer: {
        marginVertical: 50,
        gap: 15,
        paddingHorizontal: 25,
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
