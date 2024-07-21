import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import { useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import MyTextInput from "../../components/MyTextInput.jsx";
import Color from "../../constants/Color";
import login from "../../hooks/auth/login";
import userStore from "../../store/userStore.js";

export default function Login() {
    const { control, handleSubmit } = useForm();
    const setUser = userStore((state) => state.setUser);
    const setToken = userStore((state) => state.setToken);

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: async (response) => {
            if (response.status === 400) {
                throw new Error("Invalid credentials");
            }
            const data = await response.json();
            await setUser(data.user);
            await setToken(data.token);
            router.replace("/(tabs)/home");
        },
        onError: async (error) => {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: error.message + " ‼️",
            });
        },
    });
    const loginHandler = ({ email, password }) => {
        loginMutation.mutate({ email, password });
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[Color.PastelViolet, Color.Lumber]}
                style={styles.background}
            >
                <View intensity={100} style={styles.loginFormContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>Welcome Back!</Text>
                        <Text style={styles.subHeader}>
                            Sign in to continue
                        </Text>
                    </View>
                    <View style={styles.textInputContainer}>
                        <MyTextInput
                            name="email"
                            control={control}
                            label={"Email"}
                            ecrypted={false}
                            placeholder={"Enter email"}
                            rules={{
                                required: "Please enter your email address",
                            }}
                        />
                        <MyTextInput
                            name="password"
                            control={control}
                            label={"Password"}
                            ecrypted={true}
                            placeholder={"Enter password"}
                            rules={{
                                required: "Please enter your password",
                            }}
                        />
                    </View>
                    <View style={styles.btnContainer}>
                        <Link href="recover">
                            <Text style={styles.forgetLink}>
                                Forgot your password ?
                            </Text>
                        </Link>
                        <Link href={"#"} asChild>
                            <Pressable
                                style={styles.btn}
                                onPress={handleSubmit(loginHandler)}
                            >
                                <Text style={styles.text}>SIGN IN</Text>
                            </Pressable>
                        </Link>
                    </View>
                    <View style={styles.registerLinkContainer}>
                        <Text style={styles.registerLink}>
                            Don't have an account ?{" "}
                        </Text>
                        <Link href={"register"} asChild>
                            <Text style={styles.registerText}>SIGN UP</Text>
                        </Link>
                    </View>
                </View>
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
    loginFormContainer: {
        borderRadius: 5,
        width: "100%",
        height: "100%",
        // backgroundColor: "red",
        paddingHorizontal: 40,
        justifyContent: "center",
    },
    textInputContainer: {
        flexDirection: "column",
        gap: 10,
    },
    forgetLink: {
        fontFamily: "medium",
        color: Color.LavenderPurple,
    },
    btnContainer: {
        marginTop: 30,
        justifyContent: "space-between",
        gap: 10,
    },
    btn: {
        padding: 20,
        borderRadius: 5,
        backgroundColor: Color.LavenderPurple,
        width: "100%",
    },
    registerLinkContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
    },
    registerLink: {
        color: Color.LavenderPurple,
    },
    registerText: {
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
