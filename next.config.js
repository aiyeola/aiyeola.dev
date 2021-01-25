// module.exports = {
//   reactStrictMode: true,
// };

// const withMDX = require('@next/mdx')({
//   extension: /\.mdx?$/
// })
const withMDX = require('@next/mdx')();

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
});
