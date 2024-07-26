import Ionicons from "@expo/vector-icons/Ionicons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Color from "../constants/Color";
import deleteTodo from "../hooks/deleteTodo";
import updateTodoStatus from "../hooks/updateTodoStatus";
import userStore from "../store/userStore";

export default function TodoTile({
    item,
    setShowUpdateModal,
    setSelectedTodo,
}) {
    const [isChecked, setChecked] = useState(false);
    const date = new Date(item.created_at);
    const token = userStore((state) => state.token);
    const queryClient = useQueryClient();

    var options = {};

    const deleteMutation = useMutation({
        mutationFn: deleteTodo,
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries(["todos"]);
        },
    });

    const handleDelete = () => {
        const id = item.id;
        deleteMutation.mutate({ id, token });
    };

    const updateMutation = useMutation({
        mutationFn: updateTodoStatus,
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries(["todos"]);
        },
    });

    const handleUpdateStatus = () => {
        const id = item.id;
        updateMutation.mutate({ id, token });
    };

    return (
        <View style={styles.container}>
            {/* ---------- TODO LABEL ---------- */}
            <View style={styles.todoLabelContainer}>
                <View style={styles.section}>
                    <Checkbox
                        color={Color.LavenderPurple}
                        style={styles.checkbox}
                        value={item.is_completed}
                        onValueChange={handleUpdateStatus}
                    />
                    <Text
                        style={[
                            styles.labelText,
                            item.is_completed
                                ? { textDecorationLine: "line-through" }
                                : null,
                        ]}
                    >
                        {item.title}
                    </Text>
                </View>
                <Text style={styles.timeText}>
                    {date.getUTCHours() < 12
                        ? date.getUTCHours() +
                          ":" +
                          date.getUTCMinutes() +
                          " AM"
                        : date.getUTCHours() +
                          ":" +
                          date.getUTCMinutes() +
                          " PM"}
                </Text>
            </View>

            {/* ---------- DESCRIPTION ----------- */}
            <View style={styles.descriptionContainer}>
                <Text style={styles.description}>{item.description}</Text>
            </View>

            {/* ---------- CATEGORY LABEL---------- */}
            <View style={styles.catLabelContainer}>
                <Pressable onPress={handleDelete}>
                    <Ionicons
                        name="trash-outline"
                        size={22}
                        color={Color.LavenderPurple}
                    />
                </Pressable>
                <Pressable
                    onPress={() => {
                        setSelectedTodo(item);
                        setShowUpdateModal(true);
                    }}
                >
                    <Ionicons
                        name="create-outline"
                        size={22}
                        color={Color.LavenderPurple}
                    />
                </Pressable>
                <Text style={styles.catText}>{item.category}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.White,
        justifyContent: "center",
        gap: 20,
        width: "95%",
        paddingVertical: 20,
        borderColor: "black",
        borderRadius: 15,
        shadowColor: Color.LavenderPurple,
        shadowOpacity: 10,
        shadowRadius: 10,
        elevation: 5,
        marginTop: 15,
    },
    todoLabelContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 30,
    },
    section: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 15,
    },
    checkbox: {
        padding: 10,
    },
    labelText: {
        fontFamily: "medium",
        fontSize: 14,
        color: Color.LavenderPurple,
    },
    timeText: {
        fontFamily: "medium",
        fontSize: 13,
        color: Color.LavenderPurple,
    },
    descriptionContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 30,
    },
    description: {
        fontFamily: "regular",
        fontSize: 14,
        color: Color.LavenderPurple,
    },
    catLabelContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
        marginTop: 5,
        paddingHorizontal: 30,
        gap: 20,
    },
    catText: {
        textTransform: "uppercase",
        fontFamily: "medium",
        fontSize: 12,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        color: Color.White,
        backgroundColor: Color.LavenderPurple,
    },
});
