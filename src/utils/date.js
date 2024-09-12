export const today = new Date()
export const zeroTime = new Date(0)
export class UtilsDateFormat {
  constructor(value) {
    this.date = new Date(value)
  }

  isMin() {
    return this.date.getTime() === -62135596800000
  }
  after(date = Date.now()) {
    if (this.date.getTime() === -62135596800000) {
      return true
    }
    // To prevent subtle differences in time between the front and back ends on different computers, the two times are subtracted here and the difference between the two times is then compared to see if the difference is less than 1000ms.
    return this.date.getTime() - date >= 1000
  }
  befor(date = Date.now()) {
    if (this.date.getTime() === -62135596800000) {
      return false
    }
    return this.date.getTime() < Date.now()
  }

  static fromParse(str) {
    return new UtilsDateFormat(Date.parse(str))
  }

  static fromTimeStamp(timestamp = { seconds: 0, nanos: 0 }) {
    if (!('nanos' in timestamp)) {
      return new UtilsDateFormat(timestamp.seconds * 1000)
    }
    return new UtilsDateFormat(timestamp.seconds * 1000 + timestamp.nanos / 1000000)
  }

  toDateString() {
    return this.date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
  }

  toTimeString() {
    return this.date.toLocaleDateString(undefined, { hour: 'numeric', minute: 'long', day: 'numeric' })
  }

  toDateTimeString() {
    return this.date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })
  }

  toAfterDateTimeString() {
    const diff = Date.now() - this.date.valueOf()
    var options
    if (diff <= 60 * 1000) {
      return Math.floor(diff / 1000).toString() + ' seconds ago'
    } else if (diff <= 60 * 60 * 1000) {
      // options = { minute: 'numeric' }
      return Math.floor(diff / (60 * 1000)).toString() + ' minutes ago'
    } else if (diff <= 24 * 60 * 60 * 1000) {
      // options = { hour: 'numeric', minute: 'numeric' }
      return Math.floor(diff / (60 * 60 * 1000)).toString() + ' hours ago'
    } else if (diff <= 3 * 24 * 60 * 60 * 1000) {
      return Math.floor(diff / (24 * 60 * 60 * 1000)).toString() + ' days ago'
    } else {
      options = { year: 'numeric', month: 'long', day: 'numeric' }
    }
    return this.date.toLocaleDateString(undefined, options)
  }
}

export function formatDuration(seconds) {
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  if (seconds < 60) {
    return `${remainingSeconds} ${this.$t('datetime.seconds')}`
  } else if (seconds < 600) {
    return `${minutes} ${this.$t('datetime.minutes')} ${remainingSeconds} ${this.$t('datetime.seconds')}`
  } else if (seconds < 36000) {
    return `${hours} ${this.$t('datetime.hours')} ${minutes} ${this.$t('datetime.minutes')}`
  } else if (seconds < 8640000) {
    return `${days} ${this.$t('datetime.days')} ${hours} ${this.$t('datetime.hours')}`
  } else {
    return `${days} ${this.$t('datetime.days')}`
  }
}

export function formatAfterDateTime(timestamp = { seconds: 0, nanos: 0 }) {
  let t = timestamp.seconds * 1000
  if ('nanos' in timestamp) {
    t = t + timestamp.nanos / 1000000
  }
  const date = new Date(t)
  const diff = Date.now() - date.valueOf()
  var options
  if (diff <= 60 * 1000) {
    return `${Math.floor(diff / 1000)} ${this.$t('datetime.seconds')}${this.$t('datetime.ago')}`
  } else if (diff <= 60 * 60 * 1000) {
    // options = { minute: 'numeric' }
    return `${Math.floor(diff / (60 * 1000))} ${this.$t('datetime.minutes')}${this.$t('datetime.ago')}`
  } else if (diff <= 24 * 60 * 60 * 1000) {
    // options = { hour: 'numeric', minute: 'numeric' }
    return `${Math.floor(diff / (24 * 60 * 1000))} ${this.$t('datetime.hours')}${this.$t('datetime.ago')}`
  } else if (diff <= 3 * 24 * 60 * 60 * 1000) {
    return `${Math.floor(diff / (24 * 60 * 60 * 1000))} ${this.$t('datetime.days')}${this.$t('datetime.ago')}`
  } else {
    options = { year: 'numeric', month: 'long', day: 'numeric' }
  }
  return date.toLocaleDateString(undefined, options)
}
