export const modifierMethod = {
  number(v) {
    let parsed = Number.parseFloat(v)
    return isNaN(parsed) ? v : parsed
  },
  trim(v) {
    return v.trim()
  }
}