import { IsString, Matches, MaxLength } from 'class-validator'
import { displayNameMaxLength } from './user.model.js'
import { IsPassword } from './is-password.decorator.js'

/** @private */
const maxBytesPerChar = 3

/** @private */
const displayNameMaxChars = Math.floor(displayNameMaxLength * 2 / maxBytesPerChar)

/** @private */
const usernamePattern = /^[A-Za-z_][\w-]+$/

/** @private */
const usernameInvalidMessage =
  "username must start with a letter, and may only contain A-Z letters, digits, underscore character ('_'), and a hyphen ('-')"

export const defaults = {
  displayName: '',
} satisfies Partial<CreateUserReqBody>

export class CreateUserReqBody {
  @Matches(usernamePattern, {
    message: usernameInvalidMessage,
  })
  readonly username!: string

  @IsPassword()
  readonly password!: string

  @IsString()
  @MaxLength(displayNameMaxChars)
  readonly displayName: string = defaults.displayName
}
