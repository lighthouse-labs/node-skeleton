const sass = require("sass");
const fs = require("fs");

const compileSass = () => {
  const sassFilenames = fs.readdirSync("./styles");

  for (const filename of sassFilenames) {
    const cssFilename = filename.replace(".scss", ".css");

    try {
      const rendered = sass.renderSync({
        file: `./styles/${filename}`,
        debug: true,
        outputStyle: "expanded",
      });

      fs.writeFileSync(`./public/styles/${cssFilename}`, rendered.css.toString());
    } catch (err) {
      console.log(`\n 🙈🚨 UNABLE TO GENERATE CSS FROM SASS FILE: ${filename}  🚨🙈 \n ERROR: ${err} \n`);
    }
  }
};

module.exports = compileSass;
