module.exports = {
    project: {
      dependencies: {
        ...(process.env.NO_FLIPPER
        ? { 'react-native-flipper': { platforms: { ios: null } } }
        : {}),
      },
      ios: {},
      android: {},
    },
    assets: ['./assets/fonts'],
  };