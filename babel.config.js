module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel"],
    env: {
      production: {
        plugins: ['react-native-paper/babel',
          'react-native-dotenv', // Add this plugin for dotenv support
        ],
      },
    },
  };
};
