const checkParams = (id: any) => {
  const idCheck = Number.isSafeInteger(id) && id > 0
  return idCheck
}

export default checkParams