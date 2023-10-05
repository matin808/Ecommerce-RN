import {StyleSheet, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const Loader = () => {
  return (
    <View style={styles.container}>
      <LottieView
        style={styles.loader}
        source={require('../../../assets/animation/loader-dots.json')}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  loader: {
    height: 150,
  },
});

export default React.memo(Loader);
