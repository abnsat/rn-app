import React from "react";
import {ActivityIndicator, View} from "react-native";
import {withNavigation} from "react-navigation";

import {getChannelItems} from "../api";
import Video from "../components/Video";
import {videoScreenStyles as styles} from "../styles.js";

class VideoScreen extends React.Component {
    state = {
        isLoading: true,
        playlistItems: undefined,
    };

    overlayTimeoutId = null;

    componentDidMount() {
        this.loadScreenData();
    }

    loadScreenData = () => {
        const channel = this.props.navigation.getParam("channel");
        if (channel.type === "live") {
            this.setState({isLoading: false});
        }
        if (channel.type === "playlist") {
            getChannelItems(channel.items_url).then(items => {
                this.setState({isLoading: false, playlistItems: items});
            });
        }
    };

    render() {
        const {navigation} = this.props;
        const {isLoading, playlistItems} = this.state;
        const channel = navigation.getParam("channel");
        return (
            <View style={styles.container}>
                {isLoading ? (
                    <View style={styles.activityContainer}>
                        <ActivityIndicator />
                    </View>
                ) : (
                    <View style={styles.videoContainer}>
                        <Video
                            live={channel.type === "live"}
                            playlist={channel.type === "playlist"}
                            hlsUrl={channel.hls_url}
                            playlistItems={playlistItems}
                        />
                    </View>
                )}
            </View>
        );
    }
}

export default withNavigation(VideoScreen);
