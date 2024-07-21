import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Color from "../constants/Color";

export default function MyTextInput({
    name,
    control,
    label,
    ecrypted,
    placeholder,
    rules,
}) {
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
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({
                    field: { value, onChange },
                    fieldState: { error },
                }) => (
                    <>
                        <TextInput
                            style={[
                                isFocus
                                    ? styles.textInputFocus
                                    : styles.textInput,
                                ,
                            ]}
                            placeholder={placeholder}
                            secureTextEntry={ecrypted}
                            value={value}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            onChangeText={onChange}
                        />
                        {error && (
                            <Text style={styles.errorText}>
                                {error.message}
                            </Text>
                        )}
                    </>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    textInputContainer: {
        marginBottom: 0,
    },
    label: {
        fontFamily: "medium",
        color: Color.White,
        marginBottom: 5,
    },
    textInput: {
        borderWidth: 1,
        borderColor: Color.White,
        borderRadius: 5,
        width: "100%",
        height: 50,
        padding: 10,
        backgroundColor: "white",
        fontFamily: "regular",
    },
    textInputFocus: {
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 5,
        width: "100%",
        height: 50,
        padding: 10,
        backgroundColor: "white",
    },
    errorText: {
        color: "red",
        marginHorizontal: 2,
        marginTop: 5,
        fontFamily: "regular",
        fontSize: 12,
        textAlign: "left",
    },
});
