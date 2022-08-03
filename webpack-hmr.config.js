const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

console.log(
  '%c node_env >>>',
  'background: yellow; color: blue',
  process.env.NODE_ENV,
);

module.exports = function (options, webpack) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [
      ...options.plugins,
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
    devtool:
      process.env.NODE_ENV === 'debug' ? '#eval-source-map' : 'source-map',
  };
};
