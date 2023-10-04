/* eslint-disable react/react-in-jsx-scope */
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {colors} from '../../assets/colors/Colors';
import {Rating} from 'react-native-ratings';
import {useNavigation} from '@react-navigation/native';
import {MyNavigationProp} from '../../Navigation/types';

export interface SingleProduct {
  id: number;
  product_category_id: number;
  name: string;
  producer: string;
  description: string;
  cost: number;
  rating: number;
  view_count: number;
  created: string;
  modified: string;
  product_images: string;
}

export interface IProductListProps {
  item: SingleProduct;
}

const ProductList = ({item}: IProductListProps) => {
  const {id, name} = item;
  const navigation: MyNavigationProp = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetails', {id, name})}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: item.product_images}}
            height={120}
            width={120}
            resizeMode="contain"
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.brandName}>{item.producer}</Text>
          <Text style={styles.name}>{item.name}</Text>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{item.cost.toLocaleString()}</Text>
            <Rating
              imageSize={20}
              readonly={true}
              ratingImage="custom"
              startingValue={item.rating}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.UIBG,
    marginHorizontal: 15,
    marginVertical: 6,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40,
    borderRadius: 12,
    borderColor: Platform.OS === 'android' ? 'gray' : '',
    borderWidth: Platform.OS === 'android' ? 1 : 0,

    //
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: Platform.OS === 'android' ? 0 : 3,
  },

  imageContainer: {
    flex: 0.3,
  },

  details: {
    flex: 0.7,
    marginLeft: 10,
  },
  brandName: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
  name: {
    fontSize: 18,
    color: colors.TEXT,
    fontFamily: 'Montserrat-regular',
    marginVertical: 5,
  },

  desc: {
    fontSize: 13,
    color: colors.TEXT,
    fontFamily: 'Montserrat-SemiBold',
  },

  countContainer: {
    flexDirection: 'row',
    gap: 4,
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    justifyContent: 'space-between',
  },

  price: {
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
  },
});

export default ProductList;
