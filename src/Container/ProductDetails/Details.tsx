import {View, StyleSheet, Text, Image, Share, Alert} from 'react-native';
import React, {useState} from 'react';
import {Button, Dialog, Portal} from 'react-native-paper';
import ImageComponent from './ImageComponent';
import IconComponent from '../Custom/Icon';
import {colors} from '../../assets/colors/Colors';
import {useAppDispatch, useAppSelector} from '../../Redux/store';
import {userToken} from '../../Redux/Users/userSlice';
import {AddToCart, ICartDetailsProps} from '../../Redux/Cart/CartSlice';
import Toast from 'react-native-simple-toast';
import {Rating} from 'react-native-ratings';
import {handleRatingFunctionality} from '../../utils/API/handleRatingFunctionality';

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
  name?: string;
  singleImage?: string;
}

const Details = (props: IDetails) => {
  const {
    product_images,
    description,
    cost,
    id,
    handlePress,
    name,
    singleImage,
  } = props;
  const dispatch = useAppDispatch();
  const token: string = useAppSelector(userToken);
  const [addedToCart, setAddedToCart] = useState(false);
  const cartDetails: ICartDetailsProps = useAppSelector(state => state.cart);
  const [ratingStatus, setRatingStatus] = useState(false);

  const cartData = cartDetails.cart.data;
  console.log('cartDetails', cartDetails.cart.data);

  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  let present = false;
  cartData?.map((data: any) => {
    if (data.product.id === id) {
      present = true;
    }
  });

  const handleCart = async (str: string) => {
    console.log(id);
    try {
      await dispatch(AddToCart({token, id, quantity: 1})).unwrap();
      setAddedToCart(true);
      Toast.show('Added to cart', Toast.SHORT);
      present = true;
      if (str === 'buy') {
        handlePress();
      }
    } catch (err) {
      console.log('something went wrong', err);
    }
  };

  const ratingCompleted = async (rating: number) => {
    console.log('your ratin', rating, 'sdsd', id);
    const value = await handleRatingFunctionality(rating, id);
    console.log('vvvvv', value);
    if (value.status === 200) {
      setRatingStatus(true);
      Toast.show('Rating added, Thank you!', Toast.SHORT);
      setTimeout(() => {
        hideDialog();
      }, 500);
    } else {
      Toast.show('Something went wrong', Toast.SHORT);
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this amazing product from Monterrack, I love it! ${name}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.detail}>
      <View style={styles.ImageContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.Ruppee}>₹ {cost}</Text>
          <View style={styles.priceContainer}>
            <IconComponent
              handlePress={showDialog}
              name="star"
              size={29}
              color="gold"
            />

            <IconComponent
              style={styles.Icon}
              handlePress={onShare}
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
          <>
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
      <Portal>
        <Dialog
          style={styles.Dialog}
          theme={{colors: {primary: 'green'}}}
          visible={visible}
          onDismiss={hideDialog}>
          <Dialog.Title style={styles.DialogText}>{name}</Dialog.Title>
          <Dialog.Content style={styles.DialogContent}>
            <Image
              source={{uri: singleImage}}
              resizeMode="contain"
              width={200}
              height={200}
            />
            <Rating
              imageSize={30}
              readonly={ratingStatus}
              ratingImage="custom"
              startingValue={0}
              onFinishRating={ratingCompleted}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button style={styles.btn} onPress={hideDialog}>
              Close
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  Dialog: {
    backgroundColor: '#fff',
  },
  DialogText: {
    alignSelf: 'center',
    fontFamily: 'Montserrat-Black',
  },
  DialogContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#F8F9F9',
    paddingHorizontal: 10,
  },
});

export default Details;
