/* eslint-disable react/react-in-jsx-scope */
/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, StyleSheet} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store} from './src/Redux/store';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Root = () => {
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={styles.container}>
          <App />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Root);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
