import {View} from 'react-native';
import React from 'react';
import {SliderBox} from 'react-native-image-slider-box';

type ProductImage = {
  created: string;
  id: number;
  image: string;
  modified: string;
  product_id: number;
};

interface ImageProps {
  images: ProductImage[];
}
const ImageComponent = ({images}: ImageProps) => {
  let img: ProductImage[] = [];
  images?.map(val => img.push(val.image as any));
  console.log('images', img);
  return (
    <View style={{marginTop: 20}}>
      <SliderBox
        images={img}
        // sliderBoxHeight={350}
        resizeMode="contain"
        inactiveDotColor="#AFE1AF"
        dotColor="darkgreen"
        autoplay={true}
      />
    </View>
  );
};

export default ImageComponent;
