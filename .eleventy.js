module.exports = function (eleventyConfig) {
  // Copy assets folder to the root of the output site
  eleventyConfig.addPassthroughCopy("src/assets");

  // Root level configuration files
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/sitemap.xml");
  eleventyConfig.addPassthroughCopy("src/site.webmanifest");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/articles.json");

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};
