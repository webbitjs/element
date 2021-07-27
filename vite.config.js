const path = require('path');

module.exports = {
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'webbitElement'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['lit'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          'lit': 'lit'
        }
      }
    }
  }
}