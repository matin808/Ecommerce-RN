import {View, StyleSheet} from 'react-native';
import React from 'react';
import {SliderBox} from 'react-native-image-slider-box';

const Carousel = () => {
  const images = [
    require('../../assets/images/slider_img1.jpg'),
    require('../../assets/images/slider_img2.jpg'),
    require('../../assets/images/slider_img3.jpg'),
    require('../../assets/images/slider_img4.jpg'),
  ];
  return (
    <View style={styles.container}>
      <SliderBox images={images} dotColor="#2B1700" autoplay={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
  },
});

export default Carousel;
