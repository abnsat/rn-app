import React from "react";
import {Linking} from "react-native";
import {WebView} from "react-native-webview";

export default class WebViewScreen extends React.Component {
    webview = null;

    handleWebViewNavigationStateChange = newNavState => {
        const {url} = newNavState;

        if (!url || url.includes("abnvideos.com")) {
            return;
        }

        this.webview.stopLoading();
        Linking.openURL(url);
    };

    shouldStartLoadWithRequestHandler = ({url}) => {
        if (url === this.props.uri) {
            return true;
        }
        if (url && url.includes("http")) {
            Linking.openURL(url);
        }
        return false;
    };

    render() {
        const {uri} = this.props;
        return (
            <WebView
                startInLoadingState
                dataDetectorTypes="none"
                ref={ref => (this.webview = ref)}
                source={{uri}}
                onNavigationStateChange={this.handleWebViewNavigationStateChange}
                onShouldStartLoadWithRequest={this.shouldStartLoadWithRequestHandler}
            />
        );
    }
}
