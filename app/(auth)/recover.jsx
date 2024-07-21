import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MyTextInput from "../../components/MyTextInput";
import Color from "../../constants/Color";

export default function Recover() {
    const { control, handleSubmit } = useForm();

    const handleSend = ({ email }) => {
        console.log("Email: ", email);
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[Color.PastelViolet, Color.Lumber]}
                style={styles.background}
            >
                <View intensity={100} style={styles.loginFormContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>We got you covered!</Text>
                        <Text style={styles.subHeader}>
                            Let's stay on track
                        </Text>
                    </View>
                    <View style={styles.textInputContainer}>
                        <MyTextInput
                            name="email"
                            control={control}
                            label={
                                "Enter your email and  a recovery link will be send to your email address"
                            }
                            ecrypted={false}
                            placeholder={"Enter email"}
                            rules={{ required: "Please enter your email" }}
                        />
                    </View>
                    <View style={styles.btnContainer}>
                        <Link href={"#"} asChild>
                            <Pressable
                                style={styles.btn}
                                onPress={handleSubmit(handleSend)}
                            >
                                <Text style={styles.text}>SEND</Text>
                            </Pressable>
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
