import {
  type ActionCreatorWithoutPayload,
  type ActionCreatorWithPayload,
  type PayloadActionCreator,
  type Slice,
  type SliceCaseReducers,
  createAction,
} from '@reduxjs/toolkit'

/** @private */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SliceNamed<SliceName extends string> = Slice<any, SliceCaseReducers<any>, SliceName>

/** @private */
type ActionType<SliceName extends string, ActionName extends string> = `${SliceName}/${ActionName}`

/** @private */
class SliceActionContext<
  const out SliceName extends string,
  const out ActionName extends string,
> {
  constructor(
    protected readonly sliceName: SliceName,
    protected readonly actionName: ActionName,
  ) {}

  createAction(): ActionCreatorWithoutPayload<ActionType<SliceName, ActionName>>
  createAction<Payload>(): ActionCreatorWithPayload<Payload, ActionType<SliceName, ActionName>>
  createAction(): PayloadActionCreator<undefined, ActionType<SliceName, ActionName>> {
    return createAction(`${this.sliceName}/${this.actionName}`)
  }
}

/** @private */
class SliceContext<const out SliceName extends string> {
  constructor(protected readonly sliceName: SliceName) {}

  /**
   * Name of the action itself, without the slice name prefix; slice name prefix is added automatically.
   * Slice name and action name will be combined into action type. For example, if a slice is called `"app"`
   * and the action name is `"setUser"`, then the action type will be `"app/setUser"`.
   */
  withName<ActionName extends string>(actionName: ActionName): SliceActionContext<SliceName, ActionName> {
    return new SliceActionContext(this.sliceName, actionName)
  }
}

/** 👍
 * Convenience function for creating Redux actions in a D.R.Y. and type-safe way.
 *
 * @uses {@link createAction} from `@redux/toolkit` package internally
 *
 * **Example: actions without payload:**
 *
 * ```ts
 * const app = createSlice({ name: 'app', … })
 *
 * // 👍 declarative
 * const readMessages = forSlice(app).withName('readMessages').createAction()
 *
 * // ❌ low-level action type definition
 * const readMessages = createAction(`${app.name}/readMessages`)
 * ```
 *
 * **Example: actions with payload:**
 *
 * ```ts
 * const app = createSlice({ name: 'app', … })
 *
 * // 👍 concise, type-safe
 * const sendMessage = forSlice(app).withName('sendMessage').createAction<Message>()
 *
 * // ❌ too low-level, not type-sage (action type is `string`, not `app/sendMessage`)
 * const sendMessage = createAction<Message>(`${app.name}/sendMessage`)
 *
 * // ❌ verbose
 * const sendMessageType = `${app.name}/sendMessage` as const
 * const sendMessage = createAction<Message, typeof sendMessageType>(sendMessageType)
 * ```
 */
export function forSlice<SliceName extends string>(slice: SliceNamed<SliceName>): SliceContext<SliceName> {
  return new SliceContext(slice.name)
}
