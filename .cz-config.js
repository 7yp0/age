module.exports = {
  alloBreakingChanges: ['feat'],
  allowCustomScopes: false,
  scopes: [
    'actions',
    'assets',
    'components',
    'containers',
    'core',
    'exceptions',
    'middlewares',
    'reducers',
    'selectors',
    'services',
    'stores',
    'styles',
    'utils',
    'vendor'
  ],
  types: [
    {value: 'feat',       name: 'feat:      A new feature'},
    {value: 'fix',        name: 'fix:       A bug fix'},
    {value: 'docs',       name: 'docs:      Documentation changes only'},
    {value: 'refactor',   name: 'refactor:  A code change that neither fixes a bug nor adds a feature'},
    {value: 'test',       name: 'test:      Adding missing tests'},
    {value: 'chore',      name: 'chore:     Changes to the build process or auxiliary tools and libraries such as documentatio ngeneration'},
    {value: 'revert',     name: 'revert:    Revert to a commit'},
  ]
};
