export const FormatSeconds = (total) => {
  const secondsFull = Number(total)
  const minutes = Math.floor(secondsFull / 60)
  const seconds = Math.floor(secondsFull % 60)

  if (minutes < 10 && seconds < 10) {
    return `0${minutes}:0${seconds}`
  }

  if (minutes < 10 && seconds >= 10) {
    return `0${minutes}:${seconds}`
  }

  if (minutes >= 10 && seconds >= 10) {
    return `${minutes}:${seconds}`
  }

  if (minutes >= 10 && seconds < 10) {
    return `${minutes}:0${seconds}`
  }

  return `${minutes}:${seconds}`
}
