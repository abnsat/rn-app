// @flow
import {NativeModules} from "react-native";
const {RNGoogleCast} = NativeModules;

type CastDevice = {
    id: string,
    version: string,
    name: string,
    model: string,
};

type CastState =
    | "NoDevicesAvailable"
    | "NotConnected"
    | "Connecting"
    | "Connected";

export default {
    startSession(deviceId: string): Promise {
        return RNGoogleCast.startSession(deviceId);
    },

    endSession(stopCasting: boolean = true): Promise {
        return RNGoogleCast.endSession(stopCasting);
    },

    getCastDevice(): Promise<CastDevice> {
        return RNGoogleCast.getCastDevice();
    },

    getCastState(): Promise<CastState> {
        return RNGoogleCast.getCastState();
    },

    initChannel(namespace: string) {
        return RNGoogleCast.initChannel(namespace);
    },

    sendMessage(namespace: string, message: string) {
        return RNGoogleCast.sendMessage(message, namespace);
    },
};
