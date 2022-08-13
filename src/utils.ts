// v2 utils
import moment from 'moment'

// no real need to include seconds
const convertMsToStringTime = (ms: number) => {
  if (!ms) return 'No runtime available'

  const duration = moment.duration(ms),
    hours = duration.hours(),
    minutes = duration.minutes()

  let result = ''
  
  if (hours)
    result += `${hours} Hour${hours > 1 ? 's' : ''} `
  if (minutes)
    result += `${minutes} Minute${minutes > 1 ? 's' : ''} `

  return result.trim()
}

const convertMsToTrackTime = (ms: number) => {
  const formatted = moment.utc(ms)
    .format('HH:mm:ss')

  return formatted
}

export {
  convertMsToStringTime,
  convertMsToTrackTime
}