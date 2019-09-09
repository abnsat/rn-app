// @flow
import React from "react";
import {ActionSheetIOS, Platform, requireNativeComponent, StyleSheet} from "react-native";

import GoogleCast from "../utils/GoogleCast";

const NativeCastButton = requireNativeComponent("RNGoogleCastButton");

const styles = StyleSheet.create({
    castButton: {
        height: 32,
        tintColor: "#fff",
        width: 32,
    },
});

export default class CastButton extends React.Component {
    onPress = event => {
        if (event.nativeEvent.state === "Disconnected") {
            const devices = event.nativeEvent.devices;
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: [...devices.map(device => device.name), "Cancel"],
                    cancelButtonIndex: devices.length,
                    title: "Cast to",
                },
                index => {
                    if (index < devices.length) {
                        GoogleCast.startSession(devices[index].id);
                    }
                },
            );
        }

        if (event.nativeEvent.state === "Connected") {
            const {name} = event.nativeEvent.device;
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ["Stop casting", "Cancel"],
                    destructiveButtonIndex: 0,
                    cancelButtonIndex: 1,
                    title: `Casting to ${name}`,
                },
                index => {
                    if (index === 0) {
                        GoogleCast.endSession();
                    }
                },
            );
        }
    };

    render() {
        return (
            <NativeCastButton
                style={styles.castButton}
                triggersDefaultCastDialog={Platform.OS !== "ios"}
                onPress={this.onPress}
            />
        );
    }
}
