import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Modal from "react-native-modal";
import Color from "../constants/Color";
import updateTodo from "../hooks/updateTodo";
import userStore from "../store/userStore";

export default function UpdateTodoModal({
    showUpdateModal,
    setShowUpdateModal,
    selectedTodo,
}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const token = userStore((state) => state.token);
    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: updateTodo,
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries(["todos"]);
        },
    });

    const updateTodoHandler = () => {
        const id = selectedTodo.id;
        console.log(typeof selectedTodo.category);
        updateMutation.mutate({ id, title, description, category, token });
        setShowUpdateModal(false);
    };

    return (
        <Modal
            isVisible={showUpdateModal}
            onModalWillShow={() => {
                setTitle(selectedTodo.title);
                setDescription(selectedTodo.description);
                setCategory(selectedTodo.category);
            }}
            onModalHide={() => {
                setTitle("");
                setDescription("");
                setCategory("");
            }}
            onSwipeComplete={() => setShowUpdateModal(false)}
            hideModalContentWhileAnimating={true}
            swipeDirection={"down"}
            useNativeDriverForBackdrop
        >
            <View style={styles.container}>
                <Text style={styles.modalHeader}>UPDATE TODO</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={"Enter title"}
                        onChangeText={(value) => {
                            setTitle(value);
                        }}
                        value={title}
                    />
                    <TextInput
                        style={[
                            styles.textInput,
                            { height: 100, textAlignVertical: "top" },
                        ]}
                        placeholder={"Enter description"}
                        onChangeText={(value) => {
                            setDescription(value);
                        }}
                        value={description}
                        multiline={true}
                        numberOfLines={4}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder={"Enter category"}
                        onChangeText={(value) => {
                            setCategory(value);
                        }}
                        value={category}
                    />
                </View>

                <View style={styles.btnContainer}>
                    <Pressable
                        style={styles.updateBtn}
                        onPress={updateTodoHandler}
                    >
                        <Text style={styles.updateBtnText}>Update</Text>
                    </Pressable>

                    <Pressable
                        style={styles.cancelBtn}
                        onPress={() => {
                            setShowUpdateModal(false);
                        }}
                    >
                        <Text style={styles.cancelBtnText}>Cancel</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.White,
        height: 430,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
    },
    modalHeader: {
        fontFamily: "black",
        fontSize: 16,
        color: Color.LavenderPurple,
        marginBottom: 30,
    },
    inputContainer: {
        width: "100%",
        paddingHorizontal: 25,
        marginBottom: 30,
        gap: 20,
    },
    textInput: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "black",
        borderRadius: 5,
        width: "100%",
        height: 50,
        padding: 10,
        backgroundColor: "white",
        fontFamily: "regular",
    },
    btnContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 25,
    },
    updateBtn: {
        backgroundColor: Color.LavenderPurple,
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 11,
    },
    cancelBtn: {
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    updateBtnText: {
        fontFamily: "medium",
        fontSize: 14,
        color: Color.White,
    },
    cancelBtnText: {
        fontFamily: "medium",
        fontSize: 14,
        color: "black",
    },
});
