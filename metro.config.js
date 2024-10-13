/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: ['js', 'json', 'ts', 'tsx', 'png', 'jpg', 'svg'], // add other formats as needed
    },
  };
  