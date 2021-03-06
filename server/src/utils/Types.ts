enum JSTypes {
  number = "number",
  string = "string",
  null = "null",
  undefined = "undefined",
  symbel = "symbol"
}

enum HttpCode {
  BADREQUEST = 400,
  NOTFOUND = 404,
  UNAUTHORIZED = 401,
  OK = 200,
}

enum FileType {
  json = 'application/json'
}

export { JSTypes, HttpCode, FileType }