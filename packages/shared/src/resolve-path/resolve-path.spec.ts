import { resolvePath } from './resolve-path.js'

describe(resolvePath, () => {
  it('should create an absolute path from file://… base url and relative path parts', () => {
    const path = resolvePath('file://localhost/path/to/foo.txt', 'other/file', 'bar.baz')

    expect(path).toEqual('/path/to/other/file/bar.baz')
  })
})
