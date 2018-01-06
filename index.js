/**
 * A plugin that hooks into html-webpack-plugin-alter-asset-tags from HtmlWebpackPlugin
 * in order to add a custom hash as the cache buster parameter
 * @constructor
 */
function HtmlWebpackCustomHashPlugin(options) {
    options = options || {};
    this.hash = options.hash;
}

HtmlWebpackCustomHashPlugin.prototype.apply = function (compiler) {
    var self = this;

    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-alter-asset-tags', function (htmlPluginData, callback) {
            // Create an array with all assets tags
            // (htmlPluginData.body and htmlPluginData.head are arrays that contain all
            // 'script' and 'link' tags that will be insterted in the page)
            var allTags = [];
            if (htmlPluginData.body) allTags = allTags.concat(htmlPluginData.body);
            if (htmlPluginData.head) allTags = allTags.concat(htmlPluginData.head);

            // Add a query parameter with the given hash, to each asset tag
            var customHashParam = '?' + self.hash;
            allTags.map(function(tag) {
                if (tag.tagName === 'script') tag.attributes.src += customHashParam;
                else if (tag.tagName === 'link') tag.attributes.href += customHashParam;
            });

            callback(null, htmlPluginData);
        });
    });
};

module.exports = HtmlWebpackCustomHashPlugin;
