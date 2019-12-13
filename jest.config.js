module.exports = {
  name: 'mainapp',
  preset: 'jest-preset-angular',
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest'
  },
  roots: ['src'],
  setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
  reporters: ['default', 'jest-junit'],
  moduleFileExtensions: ['ts', 'js', 'html']
};
