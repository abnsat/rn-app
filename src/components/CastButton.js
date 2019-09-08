// @flow
import React from "react";
import {ActionSheetIOS, Platform, StyleSheet} from "react-native";
// import {CastContext, CastButton as GoogleCastButton} from "rn-google-cast";

const NativeCastButton = null;

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
                        CastContext.startSession(devices[index].id);
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
                        CastContext.endSession();
                    }
                },
            );
        }
    };

    render() {
        if (!NativeCastButton) return null;
        return (
            <GoogleCastButton
                style={styles.castButton}
                triggersDefaultCastDialog={Platform.OS !== "ios"}
                onPress={this.onPress}
            />
        );
    }
}
