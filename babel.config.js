module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["expo-image-picker",
        {
          "photosPermission": "The app accesses your photos to let you share them with your friends."
        },
      ],
      ['module:react-native-dotenv']
    ]
  };
};
