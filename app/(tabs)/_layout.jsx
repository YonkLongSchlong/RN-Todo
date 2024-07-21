import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import TabBarIcon from "../../components/TabBarIcon";
import Color from "../../constants/Color";

export default function TabsLayout() {
    return (
        <>
            <StatusBar style="light" />
            <Tabs
                initialRouteName="settings"
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        position: "absolute",
                        bottom: 20,
                        left: 20,
                        right: 20,
                        height: 80,
                        borderWidth: 0,
                        borderRadius: 25,
                        paddingHorizontal: 10,
                        borderColor: Color.White,
                        backgroundColor: Color.Lumber,
                        elevation: 0,
                    },
                    tabBarHideOnKeyboard: true,
                    headerShown: false,
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <TabBarIcon
                                focused={focused}
                                iconName={"checkbox"}
                                labelName={"Home"}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="profile"
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <TabBarIcon
                                focused={focused}
                                iconName={"person"}
                                labelName={"Profile"}
                            />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
}
