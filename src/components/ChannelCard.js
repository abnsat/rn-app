import React from "react";
import {ImageBackground, Platform, StyleSheet, View, TouchableHighlight, Text} from "react-native";

import {channelCardStyles as styles} from "../styles.js";

const ChannelCard = ({onPress, thumbnail}) => (
    <TouchableHighlight
        style={[
            styles.channelContainer,
            Platform.isPad ? styles.channelContainerTablet : {},
            Platform.isTV ? styles.channelContainerTV : {},
        ]}
        underlayColor="transparent"
        onPress={onPress}
    >
        <ImageBackground
            style={styles.channelBackground}
            imageStyle={{resizeMode: "cover"}}
            source={{uri: thumbnail}}
        />
    </TouchableHighlight>
);

export default ChannelCard;
