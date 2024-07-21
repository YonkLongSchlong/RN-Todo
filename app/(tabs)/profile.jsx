import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StatusBar } from "expo-status-bar";
import {
    BellRing,
    ChevronRight,
    Key,
    LogOut,
    Sliders,
    UserRound,
} from "lucide-react-native";
import React from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Color from "../../constants/Color";
import userStore from "../../store/userStore";

export default function Profile() {
    const user = userStore((state) => state.user);

    const handleLogout = async () => {
        await SecureStore.deleteItemAsync("Token");
        await SecureStore.deleteItemAsync("User");
        router.replace("/login");
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.avatarContainer}>
                <View
                    style={{
                        borderWidth: 4,
                        borderRadius: 200,
                        width: 214,
                        height: 214,
                        justifyContent: "center",
                        alignItems: "center",
                        borderColor: Color.Thistle,
                    }}
                >
                    <Image
                        style={styles.avatar}
                        source={{ uri: user.avatar }}
                    ></Image>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.nameText}>
                        {" "}
                        {user.first_name + " " + user.last_name}{" "}
                    </Text>
                    <Text style={styles.emailText}>{user.email}</Text>
                </View>
            </View>
            <View style={styles.settingsCardContainer}>
                <SettingCard
                    label="Edit profile"
                    icon={UserRound}
                    route={"edit"}
                />
                <SettingCard
                    label="Edit password"
                    icon={Key}
                    route={"password"}
                />
                <SettingCard label="General" icon={Sliders} />
                <SettingCard label="Notification" icon={BellRing} />
                <LogoutCard
                    label="Log out"
                    icon={LogOut}
                    logout={handleLogout}
                />
            </View>
        </ScrollView>
    );
}

const SettingCard = (props) => {
    const handleNavigation = (props) => {
        const route = props.route;
        router.push(`/(settings)/${route}`);
    };

    return (
        <Pressable
            style={styles.cardContainer}
            onPress={() => {
                handleNavigation(props);
            }}
        >
            <View style={styles.iconLabelContainer}>
                <View style={styles.iconContainer}>
                    <props.icon size={24} color={Color.LavenderPurple} />
                </View>
                <Text style={styles.labelText}>{props.label}</Text>
            </View>
            <View
                style={{
                    backgroundColor: Color.LavenderPurple,
                    padding: 5,
                    borderRadius: 10,
                }}
            >
                <ChevronRight size={24} color={Color.White} />
            </View>
        </Pressable>
    );
};

const LogoutCard = (props) => {
    return (
        <Pressable
            style={styles.cardContainer}
            onPress={() => {
                props.logout();
            }}
        >
            <View style={styles.iconLabelContainer}>
                <View style={styles.iconContainer}>
                    <props.icon size={24} color={Color.LavenderPurple} />
                </View>
                <Text style={styles.labelText}>{props.label}</Text>
            </View>
            <View
                style={{
                    backgroundColor: Color.LavenderPurple,
                    padding: 5,
                    borderRadius: 10,
                }}
            >
                <ChevronRight size={24} color={Color.White} />
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: Color.White,
    },
    avatarContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    avatar: {
        width: 200,
        height: 200,
        borderRadius: 200,
    },
    infoContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20,
        width: "100%",
        gap: 3,
    },
    nameText: {
        fontFamily: "black",
        fontSize: 20,
        color: Color.LavenderPurple,
    },
    emailText: {
        fontFamily: "regular",
        fontSize: 14,
        color: Color.LavenderPurple,
    },
    settingsCardContainer: {
        marginTop: 20,
        marginBottom: 50,
        gap: 15,
    },
    cardContainer: {
        flexDirection: "row",
        paddingHorizontal: 30,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: StyleSheet.hairlineWidth,
        marginHorizontal: 20,
        borderRadius: 20,
    },
    iconLabelContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    iconContainer: {
        backgroundColor: Color.White,
        borderRadius: 70,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    labelText: {
        fontFamily: "medium",
        fontSize: 14,
        color: Color.LavenderPurple,
    },
});
