import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';

import {AntDesign} from '@expo/vector-icons';

import {useColorScheme} from '@/hooks/useColorScheme';
import {
  StyleSheet,
  TouchableOpacity,
  Animated,
  View,
  Dimensions,
  Easing,
} from 'react-native';
import React from 'react';
import {transform} from '@babel/core';
import {opacity} from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

const {height} = Dimensions.get('window');

let heartCount = 1;

const animateY = Math.ceil(height * 0.7);

const negativeAnimateY = animateY * -1;

function getRandomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default class App extends React.Component {
  state = {
    hearts: [],
  };

  addHeart = () => {
    this.setState(
      {
        hearts: [
          ...this.state.hearts,
          {
            id: heartCount,
            right: getRandomNumber(15, 200),
          },
        ],
      },
      () => {
        heartCount++;
      },
    );
  };

  removeHeart = (id) => {
    this.setState({
      hearts: this.state.hearts.filter((heart) => {
        return heart.id !== id;
      }),
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          {this.state.hearts.map((heart) => {
            return (
              <HeartContainer
                key={heart.id}
                style={{right: heart.right}}
                onComplete={() => this.removeHeart(heart.id)}
              />
            );
          })}
        </View>

        <TouchableOpacity onPress={this.addHeart} style={styles.button}>
          <AntDesign name="hearto" size={40} />
        </TouchableOpacity>
      </View>
    );
  }
}

class HeartContainer extends React.Component {
  state = {
    position: new Animated.Value(0),
  };

  static defaultProps = {
    onComplete() {},
  };

  componentDidMount(): void {
    this.Yanimation = this.state.position.interpolate({
      inputRange: [negativeAnimateY, 0],
      outputRange: [animateY, 0],
    });

    this.opcaityAnimation = this.Yanimation.interpolate({
      inputRange: [0, animateY],
      outputRange: [1, 0],
    });

    Animated.timing(this.state.position, {
      duration: 2000,
      toValue: negativeAnimateY,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(this.props.onComplete);
  }

  getHeartStyle() {
    return {
      transform: [{translateY: this.state.position}],
      opacity: this.opcaityAnimation,
    };
  }

  render() {
    return (
      <Animated.View
        style={[styles.heartContainer, this.getHeartStyle(), this.props.style]}>
        <Hearts color={'purple'} />
      </Animated.View>
    );
  }
}

const Hearts = (props: any) => (
  <View {...props} style={[styles.heart, props.styles]}>
    <AntDesign name="heart" size={40} color={props.color} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: 50,
    right: 40,
    bottom: 40,
    height: 50,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
  heart: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  heartContainer: {
    bottom: 30,
    position: 'absolute',
    backgroundColor: 'transparent',
  },
});
