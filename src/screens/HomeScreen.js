// @flow
import React from "react";
import {
    ActivityIndicator,
    Button,
    Dimensions,
    FlatList,
    NativeModules,
    ScrollView,
    Text,
    View,
} from "react-native";
import {SafeAreaView, withNavigation} from "react-navigation";

import {getCategories, getChannels} from "../api";
import ChannelCard from "../components/ChannelCard";
import GoogleCast from "../utils/GoogleCast";

import {homeScreenStyles as styles} from "../styles.js";

const NAMESPACE = "urn:x-cast:com.abnsat.chromecast";

class HomeScreen extends React.Component {
    state = {
        isLoading: true,
        categories: undefined,
        channels: undefined,
    };

    componentDidMount() {
        this.loadChannels();
    }

    componentDidUpdate() {
        const {isLoading, channels, categories} = this.state;
        if (isLoading && channels && categories) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({isLoading: false});
        }
    }

    loadChannels = () => {
        getChannels()
            .then(channels => {
                this.setState({channels});
            })
            .catch(() => {
                this.setState({channels: []});
            });
        getCategories()
            .then(categories => {
                this.setState({categories});
            })
            .catch(() => {
                this.setState({categories: []});
            });
    };

    onChannelPress = channel => () => {
        // this.props.navigation.navigate("Video", {channel});
        GoogleCast.initChannel(NAMESPACE).then(() => {
            GoogleCast.sendMessage(NAMESPACE, channel.embed_url);
        });
    };

    onTryAgainPress = () => {
        this.setState({isLoading: true}, () => this.loadChannels());
    };

    categoryCompareFunction = (cat1, cat2) => {
        return parseInt(cat1.order) - parseInt(cat2.order);
    };

    channelCompareFunction = (ch1, ch2) => {
        if (ch1.count === ch2.count) {
            return parseInt(ch1.order) - parseInt(ch2.order);
        }
        return ch1.count - ch2.count;
    };

    getCategorySections = () => {
        let {channels, categories} = this.state;

        channels = channels.map(channel => ({
            ...channel,
            categories: channel.categories.split(","),
            count: 0,
        }));
        channels = channels.sort(this.channelCompareFunction);

        return categories.sort(this.categoryCompareFunction).map(category => {
            const categoryChannels = channels.filter(ch => {
                const includes = ch.categories.includes(category.id);
                if (includes) {
                    ch.count += 1;
                    return true;
                }
                return false;
            });
            channels = channels.sort(this.channelCompareFunction);
            return {
                title: category.name,
                channels: categoryChannels,
            };
        });
    };

    render() {
        const {isLoading} = this.state;
        if (isLoading) {
            return (
                <View style={styles.activityContainer}>
                    <ActivityIndicator />
                </View>
            );
        }

        const categories = this.getCategorySections();
        if (categories.length === 0) {
            return (
                <View style={styles.errorContainer}>
                    <Text>
                        Channel data not available. Please check your network
                        connection.
                    </Text>
                    <Button onPress={this.onTryAgainPress}>Try Again</Button>
                </View>
            );
        }

        const {width} = Dimensions.get("window");
        const itemWidth = width / 1.75;

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    {categories.map(category => (
                        <View
                            key={category.title}
                            style={styles.sectionContainer}
                        >
                            <Text style={styles.categoryTitle}>
                                {category.title}
                            </Text>
                            <FlatList
                                horizontal
                                contentContainerStyle={styles.categoryFlatListContent}
                                data={category.channels}
                                keyExtractor={(item, index) =>
                                    item.name + index
                                }
                                renderItem={({item}) => (
                                    <View
                                        style={[
                                            styles.channelCardContainer,
                                            {width: itemWidth},
                                        ]}
                                    >
                                        <ChannelCard
                                            thumbnail={item.thumb_url}
                                            onPress={this.onChannelPress(item)}
                                        />
                                    </View>
                                )}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default withNavigation(HomeScreen);
