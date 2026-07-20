const commitlintConfig = {
  extends: ['@commitlint/config-conventional'],
  ignores: [
    (message) => message.startsWith('Merge '),
    (message) => message.startsWith('Revert '),
  ],
};

export default commitlintConfig;
