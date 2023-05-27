import { HourMinuteSecond, SlowHourMinuteSecond } from '@typinghare/hour-minute-second'

export const convertTimeToString = function(time: HourMinuteSecond): string {
    const strArray = []
    if (time.hour > 0) strArray.push(`${time.hour.toString()} hour`)
    if (time.minute > 0) strArray.push(`${time.minute.toString()} min`)
    if (time.second > 0) strArray.push(`${time.second.toString()} sec`)

    if (strArray.length === 0) {
        strArray.push('0 sec')
    }

    return strArray.join(' ')
}

export const convertStringToTime = function(string: string): HourMinuteSecond {
    const sp: string[] = string.split(' ')
    let hour = 0, minute = 0, second = 0

    const hourIndex: number = sp.indexOf('hour')
    if (hourIndex > 0) hour = parseInt(sp[hourIndex - 1])

    const minuteIndex: number = sp.indexOf('min')
    if (minuteIndex > 0) minute = parseInt(sp[minuteIndex - 1])

    const secondIndex: number = sp.indexOf('sec')
    if (secondIndex > 0) second = parseInt(sp[secondIndex - 1])

    return SlowHourMinuteSecond.ofHours(hour).extendMinute(minute).extendSecond(second)
}