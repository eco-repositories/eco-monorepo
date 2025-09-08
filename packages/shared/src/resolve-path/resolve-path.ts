import { join, isAbsolute } from "path"
import { fileURLToPath } from "url"

export function resolvePath(this: unknown, baseUrl: string | URL, ...parts: readonly string[]): string {
  const absolute = parts.find(isAbsolute)

  if (absolute != null) {
    throw new PathPartAbsoluteError(absolute)
  }

  if (!(baseUrl instanceof URL)) {
    baseUrl = new URL(baseUrl)
  }

  if (baseUrl.protocol !== 'file:') {
    throw new BaseUrlNotFileUrlError(baseUrl)
  }

  const pathname = join(...parts)
  const url = new URL(pathname, baseUrl)
  const path = fileURLToPath(url)

  return path
}

export class PathPartAbsoluteError extends Error {
  constructor(public readonly pathname: string) {
    super(`Pathname parts must be relative paths, instead encountered an absolute path: "${pathname}"`)
  }
}

export class BaseUrlNotFileUrlError extends Error {
  constructor(public readonly baseUrl: URL) {
    super(`Base URL must start with file://…, instead saw "${baseUrl}"`)
  }
}
