module.exports = {
  parser: require('postcss-scss'),
  plugins: [
    require('postcss-smart-import')(),
    require('postcss-custom-properties')(),
    require('postcss-custom-media')(),
    require('precss')(),
    require('postcss-calc')(),
    require('postcss-color-function')(),
    require('postcss-font-magician')({
      hosted: ['./public/fonts', '/fonts'],
      variants: {
        'Comfortaa': {
          '300': [],
          '400': [],
          '700': []
        }
      },
      foundries: ['google']
    })
  ]
};