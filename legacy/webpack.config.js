const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          ...
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                paths: [path.resolve(__dirname)],
              },
            },
          },
        ],
      },
    ],
  },
};
