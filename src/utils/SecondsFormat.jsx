export const FormatSeconds = (total) => {
  const secondsFull = Number(total)
  const minutes = Math.floor(secondsFull / 60)
  const seconds = Math.floor(secondsFull % 60)

  if(minutes < 10 & seconds < 10 ){
     return {
       formatedTime:  `0${minutes}:0${seconds}`,
     }
  }

  if(minutes < 10 & seconds > 10 ){
    return {
      formatedTime:  `0${minutes}:${seconds}`,
    }
  }

  if(minutes > 10 & seconds > 10 ){
    return {
      formatedTime:  `${minutes}:${seconds}`,
    }
  }

  if(minutes > 10 & seconds < 10 ){
    return {
      formatedTime:  `${minutes}:0${seconds}`,
    }
  }


}
