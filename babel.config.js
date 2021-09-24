module.exports = function(api) {
  api.cache(false);
  return {
    presets: ['babel-preset-expo'],

    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          whitelist: ['IP', 'PORT'],
          safe: false,
          allowUndefined: true,
        },
      ],
    ],

    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};