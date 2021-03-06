import moment from 'moment'

export function fileSizeToString(size: number, placeholder: string = '-') {
  if (!size) return placeholder
  const i = Math.floor(Math.log(size) / Math.log(1024))
  return parseFloat((size / Math.pow(1024, i)).toFixed(2)).toString() + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i]
}

const DATE_FORMAT = 'YYYY-MM-DD HH:mm'
export function timestampToString(timestamp?: number, placeholder: string = '-') {
  const m = moment(timestamp)
  if (!m || !timestamp || timestamp <= 0) return placeholder
  const diffHours = m.diff(moment.now(), 'hours')
  return (diffHours > -24) ? m.fromNow() : m.format(DATE_FORMAT)
}
