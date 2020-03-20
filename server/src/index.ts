import { admin } from './server/adminServer'

const adminServerPort: number = 7755

admin.listen(adminServerPort, () => {
  console.log(`admin server started at ${adminServerPort}!`)
})
