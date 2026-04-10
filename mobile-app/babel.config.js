module.exports = function (api) {
  const isTest = process.env.NODE_ENV === "test";
  api.cache(() => process.env.NODE_ENV);

  return {
    presets: ["babel-preset-expo"],
    plugins: isTest ? [] : ["react-native-reanimated/plugin"],
  };
};
