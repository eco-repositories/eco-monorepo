import { resolve } from 'path'
import { pathToFileURL } from 'url'
import { resolvePath } from './resolve-path.js'

describe(resolvePath, () => {
  it('should create an absolute path from file://… base url and relative path parts', () => {
    const basePath = resolve('/path/to/foo.txt')
    const baseUrl = pathToFileURL(basePath)
    const resolved = resolvePath(baseUrl, 'other/file', 'bar.baz')

    expect(resolved).toEqual('/path/to/other/file/bar.baz')
  })
})
