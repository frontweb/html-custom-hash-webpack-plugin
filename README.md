# HtmlWebpackCustomHashPlugin

This is a [webpack](http://webpack.github.io/) plugin that works together with another plugin,
[HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin), 
to allow you to customize the chache buster parameter for script/style assets.

### Why?

_HtmlWebpackPlugin_ can add a cache buster paramter to your _style_ / _script_ tags (when you set `hash:true`),
but there's no way to customize that value:

```html
<script type="text/javascript" src="/dist/bundle.js?7eb5ef5e516e47ad8364"></script>
```

__HtmlWebpackCustomHashPlugin__ allows you to replace that random value with something specific for your build, for example:
```html
<script type="text/javascript" src="/dist/bundle.js?rc20"></script>
```

## Installation
Install the plugin with npm:
```shell
$ npm install html-custom-hash-webpack-plugin --save-dev
```

## Usage

Import the plugin in your _webpack.config.js_ file 
and configure it with the value that you want for the hash (cache buster) parameter:

```js
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackCustomHashPlugin = require('html-custom-hash-webpack-plugin');

module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body'
    }),
    new HtmlWebpackCustomHashPlugin({
      hash: process.env.RC_VERSION
    })
  ]
};
```

Make sure to not provide a `hash:true` configuration for _HtmlWebpackPlugin_.

## Contribution

You're free to contribute to this project by submitting 
[issues](https://github.com/frontweb/html-custom-hash-webpack-plugin/issues) 
and/or [pull requests](https://github.com/frontweb/html-custom-hash-webpack-plugin/pulls).

##  License

This project is licensed under [MIT](https://github.com/frontweb/html-custom-hash-webpack-plugin/blob/master/LICENSE).
