import * as Joi from '@hapi/joi'
import * as fs from 'fs'
import * as path from 'path'

const main = async () => {
  try {
    const questionSchema = Joi.object().keys({
      data: Joi.object({
        name: Joi.string().empty().required(),
        author: Joi.string().empty().required(),
        level: Joi.string().valid('easy', 'medium', 'diffcult').required(),
        questions: Joi.array().max(300).items(Joi.object({
          id: Joi.number().prefs({ convert: false }).positive().max(300).required(),
          isFormal: Joi.boolean().required(),
          title: Joi.string().empty().required(),
          code: Joi.string().allow("").required(),
          options: Joi.array().max(4).items(Joi.object({
            text: Joi.string().empty().required(),
            correct: Joi.boolean().empty().required(),
            __typename: Joi.string().valid('Option').required()
          })),
          explanation: Joi.string().empty().required(),
          __typename: Joi.string().valid('Question').required()
        }))
      }).required()
    })
    Joi.assert(JSON.parse(await (await fs.promises.readFile(path.resolve('.', 'test.json'))).toString()), questionSchema)
  } catch(e) {
    console.log(e.name)
  }
}
main()
