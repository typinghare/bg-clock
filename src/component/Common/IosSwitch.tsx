import { useToggle } from '../../hook/Toggle'
import IosSwitchMaterialUi from 'ios-switch-material-ui'

export interface IosSwitchProps {
    checked: boolean,
    onChange: (checked: boolean) => void
}

/**
 * @link https://www.npmjs.com/package/ios-switch-material-ui
 */
export function IosSwitch(props: IosSwitchProps): JSX.Element {
    const { checked: initialChecked, onChange } = props
    const [checked, toggleCheck] = useToggle(initialChecked)

    function handleChange(knobOnLeft: boolean): void {
        toggleCheck()
        onChange(!knobOnLeft)
    }

    return <IosSwitchMaterialUi
        knobOnLeft={!checked}
        onChange={handleChange}
    />
}