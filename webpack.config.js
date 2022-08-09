const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

console.log('%c usingWebpack >>>', 'background: yellow; color: blue');

module.exports = function (options, webpack) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    output: {
      path: path.resolve(__dirname, 'dist'),
      clean: true, // Clean the output directory before emit.
    },
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [
      ...options.plugins,
      new CleanWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      new RunScriptWebpackPlugin({
        name: options.output.filename,
        autoRestart: false,
      }),
    ],
    mode: process.env.NODE_ENV === 'debug' ? 'development' : 'production',
    module: {
      ...options.module,
      rules: [
        ...options.module.rules,
        // {
        //   test: /\.ts$/,
        //   loader: 'ts-loader', // or 'awesome-typescript-loader'
        //   options: {
        //     getCustomTransformers: (program) => ({
        //       before: [
        //         tsAutoMockTransformer(program, {
        //           features: ['random'],
        //         }),
        //       ],
        //     }),
        //   },
        // },
      ],
    },
    devtool: process.env.NODE_ENV === 'debug' ? 'inline-source-map' : false,
  };
};
