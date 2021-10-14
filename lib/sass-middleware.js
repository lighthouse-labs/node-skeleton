const sass = require("sass")
const fs = require("fs")

const sassMiddleware = (options) => {
  return (req, res, next) => {
    const cssFilename = req.path.replace(/\.[^/.]+$/, "")
    const { source, destination, isSass } = options
    const extension = isSass ? 'sass' : 'scss'

    try {
      const rendered = sass.renderSync({
        file: `${source}${cssFilename}.${extension}`,
        outFile: `${destination}${cssFilename}.css`,
        debug: true,
        outputStyle: 'expanded'
      })
      fs.writeFileSync(`${destination}${cssFilename}.css`, rendered.css.toString())
    } catch (e) {
      console.log(`\n 🙈🚨 SOURCE SASS FILE NOT FOUND FOR ${cssFilename.substring(1)}.${extension} 🚨🙈 \n`)
    }
    
    next()
  }
}
module.exports = sassMiddleware