import { FC } from 'react'
import cn from 'classnames'
import s from './ToggleSwitch.module.scss'

type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift'
type FixedLengthArray<T, L extends number, TObj = [T, ...Array<T>]> = Pick<
  TObj,
  Exclude<keyof TObj, ArrayLengthMutationKeys>
> & {
  readonly length: L
  [I: number]: T
  [Symbol.iterator]: () => IterableIterator<T>
}

type ArrayOfTwo = FixedLengthArray<string | number, 2>

interface IToggleSwitch {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  name?: string
  optionLabels?: ArrayOfTwo
  small?: boolean
  disabled?: boolean
}

const ToggleSwitch: FC<IToggleSwitch> = ({
  id,
  name,
  checked,
  onChange,
  optionLabels,
  small,
  disabled,
}) => {
  function handleKeyPress(e: any) {
    if (e.keyCode !== 32) {
      return
    }
    e.preventDefault()
    onChange(!checked)
  }

  return (
    <div className={cn(s.toggleSwitch, small ? s.smallSwitch : '')}>
      <input
        type='checkbox'
        name={name}
        className={s.checkbox}
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      {id ? (
        <label
          className={s.label}
          tabIndex={disabled ? -1 : 1}
          onKeyDown={(e) => handleKeyPress(e)}
          htmlFor={id}
        >
          <span
            className={disabled ? cn(s.inner, s.disabled) : s.inner}
            data-yes={optionLabels && optionLabels[0]}
            data-no={optionLabels && optionLabels[1]}
            tabIndex={-1}
          />
          <span
            className={disabled ? cn(s.switch, s.disabled) : s.switch}
            tabIndex={-1}
          />
        </label>
      ) : null}
    </div>
  )
}

export default ToggleSwitch
