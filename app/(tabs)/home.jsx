import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
    Dimensions,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import * as Progress from "react-native-progress";
import AddTodoModal from "../../components/AddTodoModal";
import TodoTile from "../../components/TodoTile";
import UpdateTodoModal from "../../components/UpdateTodoModal";
import Color from "../../constants/Color";
import fetchTodosByDate from "../../hooks/fetchTodosByDate";
import userStore from "../../store/userStore";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function Home() {
    var progress = 0;
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const token = userStore((state) => state.token);

    const daysName = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    var options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ["todos", date, token],
        queryFn: ({ queryKey }) => fetchTodosByDate(queryKey[1], queryKey[2]),
    });

    if (data != undefined) {
        const length = data.length;
        var count = 0;
        data.forEach((todo) => {
            if (todo.is_completed) {
                count++;
            }
        });
        p = (count / length) * 100;
        progress = Math.round(p);
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                {/* ----------  HEADER ---------- */}
                <LinearGradient
                    colors={[Color.Thistle, Color.Lumber]}
                    start={{ x: 0.2, y: 0.1 }}
                    style={styles.topContainer}
                >
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>
                            {daysName[date.getDay()]}
                        </Text>
                        <Text style={styles.dateText}>
                            {date.toLocaleDateString("en-US", options)}
                        </Text>
                    </View>
                    <View style={styles.subHeaderContainer}>
                        <Text style={styles.subHeader}>
                            {data == undefined
                                ? "Let's get productive!"
                                : "Hard work paid off"}
                        </Text>
                    </View>

                    <View style={styles.progressBarContainer}>
                        <Text style={styles.progressText}>{progress}%</Text>
                        <Progress.Bar
                            color={Color.LavenderPurple}
                            progress={progress / 100}
                            width={WIDTH - 150}
                        />
                    </View>
                </LinearGradient>

                {/* ----------  BODY ---------- */}
                <View style={styles.bottomContainer}>
                    {!isLoading && data != null
                        ? data.map((todo) => (
                              <TodoTile
                                  key={todo.id}
                                  item={todo}
                                  setSelectedTodo={setSelectedTodo}
                                  setShowUpdateModal={setShowUpdateModal}
                              />
                          ))
                        : null}
                    {isError ? (
                        <View>Error occurs, please try again</View>
                    ) : null}
                </View>
            </ScrollView>
            <Pressable
                style={styles.addBtn}
                onPress={() => {
                    setShowModal(true);
                }}
            >
                <Ionicons name="add" color={Color.LavenderPurple} size={22} />
            </Pressable>
            <Pressable
                style={styles.calendarBtn}
                onPress={() => {
                    setShow(true);
                }}
            >
                <Ionicons
                    name="calendar"
                    color={Color.LavenderPurple}
                    size={22}
                />
            </Pressable>

            {/* ----------- ADD TODO MODAL ----------- */}
            <AddTodoModal showModal={showModal} setShowModal={setShowModal} />

            {/* ----------- UPDATE TODO MODAL ----------- */}
            {selectedTodo && (
                <UpdateTodoModal
                    showUpdateModal={showUpdateModal}
                    setShowUpdateModal={setShowUpdateModal}
                    selectedTodo={selectedTodo}
                />
            )}

            {/* ----------- DATE PICKER MODAL ----------- */}
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    is24Hour={true}
                    onChange={onChange}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: Color.White,
    },
    scrollView: {
        flexGrow: 1,
        paddingBottom: 175,
    },
    topContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 50,
        paddingTop: 70,
        paddingBottom: 35,
        backgroundColor: Color.Lumber,
        borderBottomLeftRadius: 70,
        borderBottomRightRadius: 70,
        elevation: 8,
    },
    headerContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
    },
    header: {
        fontFamily: "black",
        fontSize: 30,
        color: Color.LavenderPurple,
    },
    dateText: {
        fontFamily: "bold",
        fontSize: 18,
        color: Color.LavenderPurple,
    },
    subHeaderContainer: {
        width: "100%",
        paddingTop: 10,
    },
    subHeader: {
        fontFamily: "medium",
        fontSize: 14,
        color: Color.LavenderPurple,
    },
    progressBarContainer: {
        paddingTop: 15,
        width: "100%",
        alignItems: "center",
    },
    progressText: {
        fontFamily: "medium",
        fontSize: 14,
        color: Color.LavenderPurple,
        marginBottom: 3,
    },
    bottomContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    addBtn: {
        position: "absolute",
        right: 25,
        bottom: 110,
        zIndex: 100,
        backgroundColor: Color.Lumber,
        padding: 15,
        borderRadius: 20,
        elevation: 2,
    },
    calendarBtn: {
        position: "absolute",
        right: 85,
        bottom: 110,
        zIndex: 100,
        backgroundColor: Color.Lumber,
        padding: 15,
        borderRadius: 20,
        elevation: 2,
    },
});
