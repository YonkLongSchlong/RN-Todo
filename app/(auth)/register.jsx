import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import MyTextInput from "../../components/MyTextInput";
import Color from "../../constants/Color";
import register from "../../hooks/auth/register";

export default function Register() {
    const { control, handleSubmit } = useForm();

    const registerMutation = useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            if (data.status == 400) {
                throw new Error("This email has already been registered");
            } else {
                router.push("/login");
                Toast.show({
                    type: "success",
                    text1: "Account create successfully",
                    text2: "Now you can sign in 👌",
                });
            }
        },
        onError: (data) => {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: data.message,
            });
        },
    });

    const registerHanlder = ({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
    }) => {
        registerMutation.mutate({
            firstName,
            lastName,
            email,
            password,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <LinearGradient
                colors={[Color.PastelViolet, Color.Lumber]}
                style={styles.background}
            >
                <View contentContainerStyle={styles.registerFormContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>Let's Get Started!</Text>
                        <Text style={styles.subHeader}>
                            Create your account
                        </Text>
                    </View>
                    <View style={styles.textInputContainer}>
                        <MyTextInput
                            name="firstName"
                            control={control}
                            label={"First name"}
                            ecrypted={false}
                            placeholder={"Enter first name"}
                            rules={{ required: "Please enter your first name" }}
                        />
                        <MyTextInput
                            name="lastName"
                            control={control}
                            label={"Last name"}
                            ecrypted={false}
                            placeholder={"Enter last name"}
                            rules={{ required: "Please enter your last name" }}
                        />
                        <MyTextInput
                            name="email"
                            control={control}
                            label={"Email"}
                            ecrypted={false}
                            placeholder={"Enter email"}
                            rules={{ required: "Please enter your email" }}
                        />
                        <MyTextInput
                            name="password"
                            control={control}
                            label={"Password"}
                            ecrypted={true}
                            placeholder={"Enter password"}
                            rules={{ required: "Please enter your password" }}
                        />
                        <MyTextInput
                            name="confirmPassword"
                            control={control}
                            label={"Confirm password"}
                            ecrypted={true}
                            placeholder={"Enter password"}
                            rules={{
                                required: "Please enter your confirm password",
                            }}
                        />
                    </View>
                    <View style={styles.btnContainer}>
                        <Link href={"#"} asChild>
                            <Pressable
                                style={styles.btn}
                                onPress={handleSubmit(registerHanlder)}
                            >
                                <Text style={styles.text}>SIGN UP</Text>
                            </Pressable>
                        </Link>
                    </View>
                    <View style={styles.loginLinkContainer}>
                        <Text style={styles.loginLink}>
                            Already have an account ?{" "}
                        </Text>
                        <Link href="login">
                            <Text style={styles.loginText}>LOG IN</Text>
                        </Link>
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
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
        left: 0,
        right: 0,
        bottom: 0,
        padding: 40,
        justifyContent: "center",
    },
    headerContainer: {
        marginBottom: 50,
    },
    header: {
        fontFamily: "bold",
        fontSize: 60,
        color: Color.LavenderPurple,
    },
    subHeader: {
        fontFamily: "medium",
        fontSize: 16,
        color: "white",
    },
    registerFormContainer: {
        borderRadius: 5,
        width: "100%",
        height: "100%",
        paddingHorizontal: 40,
        justifyContent: "center",
    },
    textInputContainer: {
        flexDirection: "column",
        gap: 10,
    },
    btnContainer: {
        marginTop: 40,
        justifyContent: "space-between",
        gap: 10,
    },
    btn: {
        padding: 20,
        borderRadius: 5,
        backgroundColor: Color.LavenderPurple,
        width: "100%",
    },
    loginLinkContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
    },
    loginLink: {
        color: Color.LavenderPurple,
    },
    loginText: {
        fontFamily: "mediumItalic",
        color: Color.LavenderPurple,
        fontSize: 15,
        textDecorationLine: "underline",
    },
    text: {
        fontSize: 14,
        fontFamily: "medium",
        color: Color.Lumber,
        textAlign: "center",
    },
});
