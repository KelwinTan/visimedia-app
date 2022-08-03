const CracoLessPlugin = require("craco-less");
const COLORS = require("./src/shared/colors");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            /**
             * this section to override color in antd design
             * https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
             */
            modifyVars: {
              "@menu-item-active-bg": COLORS.primary,
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
