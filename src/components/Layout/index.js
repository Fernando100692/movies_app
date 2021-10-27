import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import KeyboardAwareScrollView from 'react-native-keyboard-aware-scroll-view';
import InputScrollView from 'react-native-input-scroll-view';

export const Layout = ({
  children,
  withTouchableFeedback,
  withScrollView,
  withInputScrollView,
  withSafeAreaView,
  scrollContainerStyle,
  contentContainerStyle,
}) => {
  let body = <View style={styles.staticContainer}>{children}</View>;

  if (Platform.OS === 'ios') {
    if (withScrollView) {
      body = (
        <KeyboardAwareScrollView
          enableOnAndroid
          contentContainerStyle={styles.keyboardContainer}
          bounces={false}
          enableAutomaticScroll
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}>
          {children}
        </KeyboardAwareScrollView>
      );
    } else if (withInputScrollView) {
      body = (
        <InputScrollView
          contentContainerStyle={{...contentContainerStyle}}
          scrollContainerStyle={{...scrollContainerStyle}}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          {children}
        </InputScrollView>
      );
    }

    let touchable = body;

    if (withTouchableFeedback) {
      touchable = (
        <TouchableWithoutFeedback
          onPress={withTouchableFeedback ? null : Keyboard.dismiss}>
          {body}
        </TouchableWithoutFeedback>
      );
    }

    if (withSafeAreaView) {
      return (
        <SafeAreaView style={styles.staticContainer}>{touchable}</SafeAreaView>
      );
    }

    return touchable;
  }

  if (withInputScrollView || withScrollView) {
    body = (
      <ScrollView
        contentContainerStyle={{...contentContainerStyle}}
        showsVerticalScrollIndicator={false}>
        {children}
      </ScrollView>
    );
  }

  if (withTouchableFeedback) {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={withTouchableFeedback ? null : Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </View>
    );
  }

  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  staticContainer: {
    flex: 1,
  },
});
