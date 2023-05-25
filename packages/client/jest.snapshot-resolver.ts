/** @private */
const testPathPattern = /(?<suffix>\.spec)(?<extension>\.tsx?)$/

export default {
  testPathForConsistencyCheck: 'src/modules/home/counter/counter.spec.tsx',

  resolveSnapshotPath(testPath: string, snapshotExtension: string): string {
    return testPath.replace(testPathPattern, `${snapshotExtension}$2`)
  },

  resolveTestPath(snapshotPath: string, snapshotExtension: string): string {
    return snapshotPath.replace(snapshotExtension, '.spec')
  },
}
