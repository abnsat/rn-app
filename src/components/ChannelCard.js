// @flow
import React from "react";
import {ImageBackground, Platform, StyleSheet, View, TouchableOpacity, Text} from "react-native";

import {placeholder} from "../constants";
import {channelCardStyles as styles} from "../styles.js";

const ChannelCard = ({onPress, thumbnail}) => (
    <TouchableOpacity
        activeOpacity={0.5}
        style={[
            styles.channelContainer,
            Platform.isPad ? styles.channelContainerTablet : {},
            Platform.isTV ? styles.channelContainerTV : {},
        ]}
        onPress={onPress}
    >
        <ImageBackground
            imageStyle={{resizeMode: "cover"}}
            defaultSource={placeholder}
            source={{uri: thumbnail}}
            style={styles.channelBackground}
        />
    </TouchableOpacity>
);

export default ChannelCard;
