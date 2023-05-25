import { type Config } from 'jest'

export default {
  preset: 'ts-jest',
  rootDir: '.',
  verbose: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
  ],

  testMatch: ['<rootDir>/src/**/*.spec.ts?(x)'],
  snapshotResolver: '<rootDir>/jest.snapshot-resolver.ts',

  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts?(x)'],
  coverageDirectory: 'coverage',
} satisfies Config
