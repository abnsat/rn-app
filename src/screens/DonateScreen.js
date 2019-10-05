import React from "react";
import {Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-navigation";

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    header: {
        color: "#333333",
        fontWeight: "bold",
    },
    headerLarge: {
        fontSize: 28,
        lineHeight: 32,
        marginVertical: 6,
    },
    headerMedium: {
        fontSize: 22,
        lineHeight: 26,
        marginVertical: 6,
    },
    headerSmall: {
        fontSize: 16,
        lineHeight: 20,
        marginVertical: 6,
    },
    italic: {
        fontStyle: "italic",
    },
    link: {
        color: "#3333ff",
        fontWeight: "bold",
    },
    line: {
        height: 1,
        backgroundColor: "#dddddd",
        marginVertical: 6,
    },
    paragraph: {
        color: "#333333",
        fontSize: 12,
        lineHeight: 18,
        marginVertical: 6,
    },
    row: {
        flexDirection: "row",
    },
});

export const Header = ({children, size}) => (
    <Text
        style={[
            styles.header,
            size === "large" && styles.headerLarge,
            size === "medium" && styles.headerMedium,
            size === "small" && styles.headerSmall,
        ]}
    >
        {children}
    </Text>
);

export const Paragraph = ({children}) => (
    <Text style={styles.paragraph}>
        {children}
    </Text>
);

const Italic = ({children}) => (
    <Text style={styles.italic}>
        {children}
    </Text>
);

const Line = () => (
    <View style={styles.line} />
);

export const Link = ({children, url}) => (
    <TouchableOpacity onPress={() => Linking.openURL(url)}>
        <Text style={styles.link}>
            {children}
        </Text>
    </TouchableOpacity>
);

export default class DontateScreen extends React.Component {
    render() {
        const {uri} = this.props;
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <SafeAreaView>
                    <Header size="large">Donate to ABN</Header>
                    <Paragraph>We are 501(c)(3) ministry. All donations in the U.S. are tax deductible. Thank you for your support.</Paragraph>
                    <Line />
                    <Header size="small">Online</Header>
                    <View style={[styles.paragraph, styles.row]}>
                        <Link url="https://abnsat.networkforgood.com/projects/34661-abn-continuing-support">Credit Card</Link>
                        <Text> {"\u00B7"} </Text>
                        <Link url="https://www.abnsat.com/paypal">PayPal</Link>
                    </View>
                    <Line />
                    <Header size="small">United States Phone</Header>
                    <View style={styles.paragraph}>
                        <Link url="tel:248-416-1300">248-416-1300</Link>
                    </View>
                    <Paragraph>11:00AM - 8:00PM (EST)</Paragraph>
                    <Paragraph>If calling at a different time or if lines are busy then please leave a message with your name & phone number. We will call you back the next day or when our lines are no longer busy.</Paragraph>
                    <Line />
                    <Header size="small">United States&nbsp;Mail</Header>
                    <Paragraph>
                        ABN Inc.{"\n"}
                        P.O. Box 724{"\n"}
                        Walled Lake, MI 48390
                    </Paragraph>
                    <Line />
                    <Header size="small">Canadian Donors</Header>
                    <Paragraph>
                        The Olive Mount Church{"\n"}
                        P.O. Box 43025, Mavis Road{"\n"}
                        Mississauga, On L5B 4A7 Canada
                    </Paragraph>
                    <Paragraph><Italic>Make check payable to Olive Mount Church.</Italic></Paragraph>
                    <Line />
                    <Header size="small">New Zealand Donors</Header>
                    <Paragraph>
                        ABN New Zealand{"\n"}
                        Westpac NZ{"\n"}
                        0313220790249000{"\n"}
                        CMTV New Zealand
                    </Paragraph>
                    <Paragraph><Italic>On the Check Memo: ABN</Italic></Paragraph>
                    <Paragraph><Italic>Please write your name &amp; phone number on the deposit slip to help us keep proper records.</Italic></Paragraph>
                    <Line />
                    <Header size="small">Australian Donor</Header>
                    <Paragraph>
                        DOH-ABN{"\n"}
                        Commonwealth Bank of Australia{"\n"}
                        BSB 062-128{"\n"}
                        Account# 10926635​
                    </Paragraph>
                    <Paragraph><Italic>Please write your name & phone number on the deposit slip to help us keep proper records.</Italic></Paragraph>
                </SafeAreaView>
            </ScrollView>
        );
    }
}
