module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module-resolver", {
        "alias": {
          "expo-image-picker": "./node_modules/expo-image-picker"
        }
      }],
      ['module:react-native-dotenv']
    ]
  };
};
