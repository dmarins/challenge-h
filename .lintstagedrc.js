module.exports = {
  'package.json': 'sort-package-json',
  '*.{ts,tsx,js,json,md,mdx,html,css}': ['yarn lint', 'yarn test:lintstaged'],
  '*.spec.ts': (filenames) =>
    filenames.map((filename) => `yarn test:e2e --quiet --spec "${filename}"`),
};
