import {View, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import {Button} from 'react-native-paper';
import ImageComponent from './ImageComponent';
import IconComponent from '../Custom/Icon';
import {colors} from '../../assets/colors/Colors';
import {useAppDispatch, useAppSelector} from '../../Redux/store';
import {userToken} from '../../Redux/Users/userSlice';
import {AddToCart} from '../../Redux/Cart/CartSlice';
// import Quantity from '../Custom/Quantity';

interface IDetails {
  product_images?: {
    created: string;
    id: number;
    image: string;
    modified: string;
    product_id: number;
  }[];
  description?: string;
  cost?: string;
  id: number;
  handlePress?: any;
}

const Details = (props: IDetails) => {
  const {product_images, description, cost, id, handlePress} = props;
  const dispatch = useAppDispatch();
  const token: string = useAppSelector(userToken);
  const [addedToCart, setAddedToCart] = useState(false);
  const cartDetails = useAppSelector(state => state.cart);
  const cartData = cartDetails.cart.data;
  let present = false;
  cartData?.map((data: any) => {
    if (data.product.id === id) {
      present = true;
    }
  });

  const handleCart = async (str: string) => {
    setAddedToCart(true);
    console.log(id);
    try {
      await dispatch(AddToCart({token, id, quantity: 1})).unwrap();
      if (str === 'buy') {
        handlePress();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.detail}>
      <View style={styles.ImageContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.Ruppee}>Rs. {cost}</Text>
          <View style={styles.priceContainer}>
            <IconComponent name="star" size={29} color="gold" />

            <IconComponent
              style={styles.Icon}
              name="share"
              size={29}
              color="gray"
            />
          </View>
        </View>

        <ImageComponent images={product_images as any} />
      </View>
      <View style={styles.DescContainer}>
        <Text style={styles.DescStyle}>{description}</Text>
      </View>
      <View style={styles.btnContainer}>
        {addedToCart || present ? (
          // <Quantity
          //   value={quantity}
          //   increment={() => setQuantity(quantity + 1)}
          //   decrement={() => setQuantity(quantity - 1)}
          // />
          <>
            {/* <Text>Already In Cart</Text> */}
            <Button mode="outlined" textColor="green" onPress={handlePress}>
              Go To Cart{' '}
            </Button>
          </>
        ) : (
          <>
            <Button
              mode="outlined"
              textColor="#000"
              onPress={() => handleCart('add')}>
              Add to Cart
            </Button>
          </>
        )}
        <Button
          textColor="#000"
          buttonColor="lightgreen"
          mode="outlined"
          disabled={present}
          onPress={() => handleCart('buy')}>
          Buy Now
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detail: {
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 7,
    borderRadius: 15,
    paddingBottom: 20,
  },

  ImageContainer: {
    marginTop: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginHorizontal: 20,
    marginLeft: 10,
  },
  Ruppee: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 19,
    color: colors.TEXT,
  },

  DescContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },

  DescStyle: {color: colors.TEXTDARK, fontSize: 16},
  btnContainer: {
    marginTop: 30,
    flexDirection: 'column',
    gap: 10,
    borderRadius: 10,
    marginHorizontal: 20,
  },

  Icon: {
    marginRight: 10,
  },
});

export default Details;
