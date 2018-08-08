export const generateNumberItens = number => {
  let arr = []
  for (var i = 0; i <= number; i++) {
    arr.push(i)
  }
  return arr
}

export const getTypesObject = () => {
  return {
    "INTEIRA": {},
    "MEIA": {},
    "PROMOCIONAL": {},
    "CORTESIA": {},
    "INTEGRANTE": {}
  }
}
