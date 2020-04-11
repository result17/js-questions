import * as Joi from '@hapi/joi'

const questionSchema = Joi.object().keys({
  data: Joi.object({
    name: Joi.string().empty().required(),
    author: Joi.string().empty().required(),
    lever: Joi.string().valid('easy', 'medium', 'diffcult').required(),
    questions: Joi.array().max(300).items(Joi.object({
      id: Joi.number().prefs({ convert: false }).positive().max(300).required(),
      title: Joi.string().empty().required(),
      code: Joi.string().required(),
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

const jsonValid = (val: any, schema: any = questionSchema): boolean  => {
  try {
    Joi.assert(val, schema)
  } catch(e) {
    console.log(e.name)
    return false
  }
  return true
} 

export default jsonValid 

