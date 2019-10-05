import React from "react";
import {Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-navigation";

import {Header, Link, Paragraph, styles} from "./DonateScreen";

export default class DontateScreen extends React.Component {
    render() {
        const {uri} = this.props;
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <SafeAreaView>
                    <Header size="large">FAQ</Header>

                    <Header size="small">What is ABN?</Header>
                    <Paragraph>Aramaic Broadcasting Network (ABN) is a vision of Christian faith to bring the world to the light of Jesus Christ while exposing the powers of darkness throughout the world. We are a non-profit, non-denominational, Christian ministry that spreads the good message of Jesus Christ through television programing on various platforms. What started off as a local radio frequency in a bedroom has developed to a television network that reaches as far as the Middle East and continues to grow.</Paragraph>

                    <Header size="small">Who are Bassim & Haifa Gorial?</Header>
                    <Paragraph>Bassim & Haifa are the founders of ABN & are devoted servants to the Christian faith. They started their service to the Lord in 1989 and then attended Bible College in Berwick Upon-Tweed, England. In 1996 they moved to the United States to become missionaries to the Aramaic community. In 2000 they launched they’re radio station in the metro-Detroit area, reaching over 250,000 Aramaic people. In 2004, Bassim and Haifa launched ABN and 2009 Trinity Channel to further combat the going issues that faces the world today.</Paragraph>

                    <Header size="small">What is the Digital Tree?</Header>
                    <Paragraph>The Digital Tree is a multi-platform network of channels that have both Aramaic & English programs to find the lost & equip the found. With the Digital Tree, ABN & Trinity Channel have expanded exponentially with releasing several channels with years of content that have been recorded by us. With the Digital Tree, we are able to fight to defend our faith better that ever before.</Paragraph>

                    <Header size="small">What are your plans for the future?</Header>
                    <Paragraph>We plan on focusing our programs on discipleship with recent partners that share our vision.</Paragraph>
                </SafeAreaView>
            </ScrollView>
        );
    }
}
