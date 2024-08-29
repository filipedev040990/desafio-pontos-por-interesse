export const isValidNumer = (value: number): boolean => {
  return typeof value === 'number' && value !== undefined && value !== null && value >= 0
}
