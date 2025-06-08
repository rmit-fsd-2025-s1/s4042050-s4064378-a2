module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/*.test.ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
};