/** @private */
type Digit = `${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`

export type HttpStatusCodeInformational = `1${Digit}${Digit}`

export type HttpStatusCodeSuccess = `2${Digit}${Digit}`

export type HttpStatusCodeRedirection = `3${Digit}${Digit}`

export type HttpStatusCodeErrorClient = `4${Digit}${Digit}`

export type HttpStatusCodeErrorServer = `5${Digit}${Digit}`

export type HttpStatusCodeError = HttpStatusCodeErrorClient | HttpStatusCodeErrorServer

export type HttpStatusCodeNonError = HttpStatusCodeInformational | HttpStatusCodeSuccess | HttpStatusCodeRedirection

export type HttpStatusCode = HttpStatusCodeError | HttpStatusCodeNonError
