import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Color from "../constants/Color";

export default function EditTextInput({ label, ecrypted, value, setValue }) {
    const [isFocus, setIsFocus] = useState(false);

    const onFocus = () => {
        setIsFocus(true);
    };

    const onBlur = () => {
        setIsFocus(false);
    };
    return (
        <View style={styles.textInputContainer}>
            <Text style={styles.label}>{label}</Text>

            <TextInput
                style={[isFocus ? styles.textInputFocus : styles.textInput, ,]}
                secureTextEntry={ecrypted}
                value={value}
                onFocus={onFocus}
                onBlur={onBlur}
                onChangeText={(text) => setValue(text)}
            />
            {label == "Password" ? (
                <Text style={styles.notifyText}>
                    Please enter your password to cotinue *
                </Text>
            ) : label == "Confirm new password" ? (
                <Text style={styles.notifyText}>
                    Please confirm your new password to update *
                </Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    textInputContainer: {
        marginBottom: 0,
    },
    label: {
        fontFamily: "medium",
        color: "black",
        marginBottom: 5,
    },
    textInput: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "black",
        borderRadius: 10,
        width: "100%",
        height: 50,
        padding: 15,
        backgroundColor: "white",
        fontFamily: "regular",
    },
    textInputFocus: {
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 10,
        width: "100%",
        height: 50,
        padding: 15,
        backgroundColor: "white",
        fontFamily: "regular",
    },
    notifyText: {
        color: Color.PastelViolet,
        marginHorizontal: 2,
        marginTop: 5,
        fontFamily: "regular",
        fontSize: 12,
        textAlign: "left",
    },
});
