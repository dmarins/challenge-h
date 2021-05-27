module.exports = {
  'package.json': 'sort-package-json',
  '*.{ts,tsx,js,json,md,mdx,html,css}': ['yarn lint'],
  '*.spec.ts': (filenames) =>
    filenames.map((filename) => `yarn test --quiet --spec "${filename}"`),
};
