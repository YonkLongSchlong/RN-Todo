import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Modal from "react-native-modal";
import Color from "../constants/Color";
import createTodo from "../hooks/createTodo";
import userStore from "../store/userStore";

export default function AddTodoModal({ showModal, setShowModal }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const user = userStore((state) => state.user);
    const queryClient = useQueryClient();
    const token = userStore((state) => state.token);

    const addMutation = useMutation({
        mutationFn: createTodo,
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries(["todos"]);
        },
    });

    const addTodoHandler = () => {
        addMutation.mutate({ title, description, category, token, user });
        setShowModal(false);
    };

    return (
        <Modal
            isVisible={showModal}
            onSwipeComplete={() => setShowModal(false)}
            hideModalContentWhileAnimating={true}
            swipeDirection={"down"}
            useNativeDriverForBackdrop
            onModalHide={() => {
                setTitle("");
                setDescription("");
                setCategory("");
            }}
        >
            <View style={styles.container}>
                <Text style={styles.modalHeader}>CREATE NEW TODO</Text>
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
                    <Pressable style={styles.addBtn} onPress={addTodoHandler}>
                        <Text style={styles.addBtnText}>Create</Text>
                    </Pressable>

                    <Pressable
                        style={styles.cancelBtn}
                        onPress={() => {
                            setShowModal(false);
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
    addBtn: {
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
    addBtnText: {
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
