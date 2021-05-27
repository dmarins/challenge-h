const plopFactory = (type = 'page') => ({
  description: `automation for creating presentation layer ${type}s`,
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: `please enter the ${type} name (lower case)`,
    },
  ],
  actions: [
    {
      type: 'add',
      path: `../../src/presentation/${type}s/{{pascalCase name}}/{{pascalCase name}}.tsx`,
      templateFile: `${type}s/${type}.tsx.hbs`,
    },
    {
      type: 'add',
      path: `../../src/presentation/${type}s/{{pascalCase name}}/{{pascalCase name}}.module.css`,
      templateFile: `${type}s/module.css.hbs`,
    },
    {
      type: 'add',
      path: `../../cypress/integration/{{pascalCase name}}/{{pascalCase name}}.spec.ts`,
      templateFile: `${type}s/test.tsx.hbs`,
    },
  ],
});

module.exports = (plop) => {
  plop.setGenerator('page', plopFactory('page'));
  plop.setGenerator('component', plopFactory('component'));
};
