import {StyleSheet} from "react-native";

export const homeScreenStyles = StyleSheet.create({
    activityContainer: {
        flex: 1,
        backgroundColor: "#0073c6",
        flexDirection: "column",
        justifyContent: "center",
    },
    category: {
        padding: 10,
    },
    categoryFlatListContent: {
        flex: 0,
        paddingHorizontal: 8,
    },
    categoryTitle: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
        paddingBottom: 8,
        paddingLeft: 16,
        paddingTop: 24,
    },
    channelCardContainer: {
        paddingHorizontal: 8,
    },
    container: {
        flex: 1,
        backgroundColor: "#0073c6",
    },
    errorContainer: {
        flex: 1,
        backgroundColor: "#0073c6",
        flexDirection: "column",
        justifyContent: "center",
        paddingHorizontal: 16,
    },
    contentContainer: {
        paddingBottom: 16,
    },
    sectionContainer: {},
});

export const channelCardStyles = StyleSheet.create({
    channelBackground: {
        aspectRatio: 1.5,
        flex: 0,
        width: "100%",
        height: "auto",
    },
    channelContainer: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ffffff",
        overflow: "hidden",
    },
});

export const videoScreenStyles = StyleSheet.create({
    closeButton: {
        marginLeft: 16,
        height: 32,
        width: 32,
    },
    overlayContainer: {
        backgroundColor: "rgba(0, 0, 0, 0.25)",
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 2,
    },
    container: {
        backgroundColor: "#000",
        flex: 1,
    },
    videoContainer: {
        width: "100%",
        height: "100%",
        zIndex: 1,
    },
});

export const videoStyles = StyleSheet.create({
    video: {
        backgroundColor: "#000",
        width: "100%",
        height: "100%",
    },
});
