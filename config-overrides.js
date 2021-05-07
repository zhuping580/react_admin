const {override, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override( 
  fixBabelImports(
    // 实现组件的按需打包
    'import', 
    { 
      libraryName: 'antd', 
      libraryDirectory: 'es', 
      style: true,
    }
  ),
  // 自定义 antd 主题
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {'@primary-color': '#89bf04'},
  }),
);