import React from "react";
import RNVideo from "react-native-video";

import {videoStyles as styles} from "../styles.js";

export default class Video extends React.Component {
    startTime = 0;
    videoIndex = 0;

    componentWillMount() {
        const {live} = this.props;
        if (!live) {
            this.calculateStart();
        }
    }

    // calculates start time based on seconds since epoch
    calculateStart = () => {
        const {playlistItems: items = []} = this.props;

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

                // skip to next track if we are near the end of current track
                var diff = itemDuration - offset;
                if (diff < 5000) {
                    console.log("go to first clip", diff);
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
        const {hlsUrl, live, playlistItems} = this.props;
        const sourceUri = !!live ? hlsUrl : playlistItems[this.videoIndex].url;
        return (
            <RNVideo
                audioOnly
                shouldPlay
                ref={ref => (this.player = ref)}
                resizeMode="contain"
                style={styles.video}
                source={{uri: sourceUri}}
                onLoad={() => {
                    if (!live) {
                        this.player.seek(this.startTime);
                    }
                }}
            />
        );
    }
}
