import ExtractTextPlugin from 'extract-text-webpack-plugin';

export function getStyleLoader(env, base) {
  const ret = {
    ...base,
  };

  if (env === 'production') {
    ret.loader = ExtractTextPlugin.extract(
      'style-loader',
      base.loaders
    );
    delete ret.loaders;
  } else {
    ret.loaders.unshift('style-loader');
  }

  return ret;
}
