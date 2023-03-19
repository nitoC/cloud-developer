import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { createLogger } from '../../utils/logger'
import { createAttachmentPresignedUrl } from '../../helpers/attachmentUtils'
//import { getUserId } from '../utils'
const logger = createLogger('attachment url logger')
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    //const userId= getUserId(event)
    const  todoId  = event.pathParameters.todoId
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    try{
      let result = await createAttachmentPresignedUrl(todoId)
      logger.info('The attachment', result)

      return {
          statusCode: 201,
          body:JSON.stringify({uploadUrl:result})
        
      }
    }catch(err){
      throw new Error(' error while generating signature for upload'+ err)
    }
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
