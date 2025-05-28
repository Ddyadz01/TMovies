export const FormatSeconds = (total) => {
  const secondsFull = Number(total)
  const minutes = Math.floor(secondsFull / 60)
  const seconds = Math.floor(secondsFull % 60)
  return { minutes, seconds }
}
