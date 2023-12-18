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
   * Slice name and action name will be combined into action type.
   *
   * @example
   * const sliceName = 'app'
   * const actionName = 'loadMessages'
   * const actionType = 'app/loadMessages'
   */
  withName<ActionName extends string>(actionName: ActionName): SliceActionContext<SliceName, ActionName> {
    return new SliceActionContext(this.sliceName, actionName)
  }
}

export function forSlice<SliceName extends string>(slice: SliceNamed<SliceName>): SliceContext<SliceName> {
  return new SliceContext(slice.name)
}
