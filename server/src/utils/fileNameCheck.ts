const fileNameCheck = (fileName: string, ext: string) => new RegExp(`\\w+\\.${ext}$`).test(fileName)


export default fileNameCheck