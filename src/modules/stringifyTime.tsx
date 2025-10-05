export function stringifyTime(value: number): string[] {
    let minutes: string = (Math.floor(value / 60)).toString()
    let seconds: string = (value - (Math.floor(value / 60)) * 60).toString()
    let secondsAdjusted: string = seconds;
    let minutesAdjusted: string = minutes;

    if (parseInt(seconds) < 10) {
        if (parseInt(seconds) === 0)
            secondsAdjusted = "00"
        else
            secondsAdjusted = "0" + seconds
    }

    if (parseInt(minutes) < 10) {
        if (parseInt(minutes) === 0)
            minutesAdjusted = "00"
        else
            minutesAdjusted = "0" + minutes
    }

    return [minutesAdjusted, secondsAdjusted]
}