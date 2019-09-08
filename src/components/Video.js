import React from "react";
import RNVideo from "react-native-video";

import {videoStyles as styles} from "../styles.js";

export default class Video extends React.Component {
    startTime = 0;
    videoIndex = 0;

    componentDidMount() {
        this.calculateStart();
    }

    // calculates start time based on seconds since epoch
    calculateStart = () => {
        const {playlistItems: items} = this.props;

        // duration is in ms
        var totalDuration = 0;
        for (var i = 0; i < items.length; i++) {
            var itemDuration = parseInt(items[i].duration, 10);
            if (isNaN(itemDuration)) {
                continue;
            }
            totalDuration += itemDuration;
        }

        var offset = Date.now() % totalDuration;

        for (var i = 0; i < items.length; i++) {
            var itemDuration = parseInt(items[i].duration, 10);
            if (isNaN(itemDuration)) {
                continue;
            }
            if (offset < itemDuration) {
                var startTime = offset / 1000;
                var videoIndex = i;

                // skip to next track if offset too large
                var diff = itemDuration - offset;
                if (diff < 5000) {
                    startTime = 0;
                    videoIndex += 1;
                    if (videoIndex === items.length) {
                        videoIndex = 0;
                    }
                }

                this.startTime = startTime;
                this.videoIndex = videoIndex;
                return;
            }
            offset -= itemDuration;
        }
    };

    render() {
        const {hlsUrl} = this.props;
        return (
            <RNVideo shouldPlay resizeMode="contain" style={styles.video} source={{uri: hlsUrl}} />
        );
    }
}
