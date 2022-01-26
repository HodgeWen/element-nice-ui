
export function minDateStr(...dates) {
  let result = dates[0]
  dates.forEach(date => {
    if (date < result) {
      result = date
    }
  })
}

export function maxDateStr(...dates) {
  let result = dates[0]
  dates.forEach(date => {
    if (date > result) {
      result = date
    }
  })
}

export function loop(number, cb) {
  let i = 1
  let ret = []
  while (i <= number) {
    ret.push(cb(i, i - 1))
    i++
  }
  return ret
}