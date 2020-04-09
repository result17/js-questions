import * as Joi from '@hapi/joi'

const questionSchema = Joi.object({
  data: Joi.object({
    questions: Joi.array().max(300).items(Joi.object({
      id: Joi.string().regex(/^\d+$/).max(3),
      title: Joi.string().empty(),
      code: Joi.string(),
      options: Joi.array().max(4).items(Joi.object({
        text: Joi.string().empty(),
        correct: Joi.boolean(),
        __typename: Joi.string().valid('Option')
      })),
      explanation: Joi.string().empty(),
      __typename: Joi.string().valid('Question')
    }))
  })
})

const jsonVaild = (val: any, schema: any = questionSchema): boolean  => {
  try {
    Joi.assert(val, schema)
  } catch(e) {
    console.log(e.name)
    return false
  }
  return true
} 

export default jsonVaild 

