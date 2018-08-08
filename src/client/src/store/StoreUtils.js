export const save = (obj, array) => {
  let objInArray = array.find(item => item.id = obj.id)
  if(objInArray) {
      array = array.splice(array.indexOf(objInArray), 1)
  }
  array.push(obj)
  return array
}
