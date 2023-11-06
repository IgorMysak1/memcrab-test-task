// Example #1
// Input: 20
// Output: 20

// Example #2
// Input: 20.5
// Output: 20.5
export const roundNumber = (number: number) =>
  Math.floor(number) === number ? number : +number.toFixed(1)

export const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// To create uniq ID
export const generateRandomString = (length: number = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return result
}
