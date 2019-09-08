// @flow
import React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {createAppContainer} from "react-navigation";
import {createDrawerNavigator} from "react-navigation-drawer";
import {createStackNavigator} from "react-navigation-stack";
import Icon from "react-native-ionicons";

import CastButton from "./src/components/CastButton";
import HomeScreen from "./src/screens/HomeScreen";
import VideoScreen from "./src/screens/VideoScreen";
import WebViewScreen from "./src/screens/WebViewScreen";

export const NAMESPACE = "urn:x-cast:com.abnsat.chromecast";

const styles = StyleSheet.create({
    menuButton: {
        marginLeft: 16,
    },
    castButtonContainer: {
        paddingRight: 16,
    },
});

const DrawerNavigator = createDrawerNavigator(
    {
        Home: HomeScreen,
        FAQ: () => (
            <WebViewScreen uri="http://vidmgr.abnvideos.com/pages/faq/webview" />
        ),
        Donate: () => (
            <WebViewScreen uri="http://vidmgr.abnvideos.com/pages/donate/webview" />
        ),
    },
    {
        initialRouteName: "Home",
        contentOptions: {
            activeTintColor: "#fff",
            activeBackgroundColor: "#7DB8E4",
        },
        navigationOptions: ({navigation}) => ({
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <Icon
                        name="menu"
                        size={32}
                        color="white"
                        style={styles.menuButton}
                    />
                </TouchableOpacity>
            ),
            headerRight: (
                <View style={styles.castButtonContainer}>
                    <CastButton />
                </View>
            ),
        }),
    },
);

const RootStack = createStackNavigator(
    {
        Main: {
            screen: DrawerNavigator,
            navigationOptions: {
                title: "ABNSAT",
                headerStyle: {
                    backgroundColor: "#005ba1",
                },
                headerTintColor: "#fff",
            },
        },
        Video: {
            screen: VideoScreen,
            navigationOptions: ({navigation}) => ({
                title: navigation.getParam("channel").title,
                headerStyle: {
                    backgroundColor: "#000",
                },
                headerTintColor: "#fff",
                headerLeft: (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon
                            name="close"
                            size={32}
                            color="white"
                            style={styles.menuButton}
                        />
                    </TouchableOpacity>
                ),
            }),
        },
    },
    {
        mode: "modal",
        headerMode: "screen",
    },
);

export default createAppContainer(RootStack);
