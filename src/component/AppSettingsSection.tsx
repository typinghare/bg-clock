import { SettingGroup } from './Settings/SettingGroup'
import { SettingItem } from './Settings/SettingItem'
import { useAppSettings } from '../hook/AppSettings'
import { useToggle } from '../hook/Toggle'

export function AppSettingsSection(): JSX.Element {
    const [appSettingContainer, setAppSetting] = useAppSettings()
    const [, toggleSignal] = useToggle()
    const clockTimeFontSizeSetting = appSettingContainer.getSetting('clockTimeFontSize')
    const clockBubbleSizeSetting = appSettingContainer.getSetting('clockBubbleSize')

    return (
        <SettingGroup title='APP SETTINGS'>
            <SettingItem
                type='number'
                value={clockTimeFontSizeSetting.value}
                onChange={(newValue: number) => {
                    setAppSetting('clockTimeFontSize', newValue)
                    toggleSignal()
                }
                }
                label={clockTimeFontSizeSetting.getProperty('label')}
                description={clockTimeFontSizeSetting.getProperty('description')}
                optionList={clockTimeFontSizeSetting.getProperty('options')}
                isLastElementInGroup={false}
            />

            <SettingItem
                type='number'
                value={clockBubbleSizeSetting.value}
                onChange={(newValue: number) => {
                    setAppSetting('clockBubbleSize', newValue)
                    toggleSignal()
                }
                }
                label={clockBubbleSizeSetting.getProperty('label')}
                description={clockBubbleSizeSetting.getProperty('description')}
                optionList={clockBubbleSizeSetting.getProperty('options')}
                isLastElementInGroup={true}
            />
        </SettingGroup>
    )
}