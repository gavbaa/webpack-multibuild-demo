// To build a single configuration at a time:
//   webpack --config-name=001-essentials

const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

let testables = [
    "001-essentials",
    "002-allowed",
];

let exportables = testables.map(name => {
    const entries = {
        common: [
            "./src/lib/cmi5.js",
            "./src/lib/helpers.js"
        ]
    };
    entries[name] = `./src/runtime/${name}/${name}.js`;
    return {
        name: name,
        mode: "development",
        entry: entries,
        plugins: [
            new HtmlWebpackPlugin({
                template: `./src/index.html`,
                filename: `index.html`,
                inject: true,
            })
        ],
        output: {
            path: path.resolve(__dirname, 'dist', name),
            filename: "[name].js",
        }
    }
})

module.exports = exportables;
// Uncomment and set parallelism for whatever's appropriate for your system.
module.exports.parallelism = 8;
