const path = require("path");

const prod = process.env.NODE_ENV === "production";
const withTM = require("next-transpile-modules")(["three"]);

module.exports = withTM({
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000,
        },
      },
    });
    config.resolve = {
      alias: {
        "@src": path.join(__dirname, "src"),
        "@static": path.join(__dirname, "src", "public/static"),
        "@styles": path.join(__dirname, "src", "styles"),
      },
      ...config.resolve,
    };
    return config;
  },
  future: {
    webpack5: true,
  },
});
