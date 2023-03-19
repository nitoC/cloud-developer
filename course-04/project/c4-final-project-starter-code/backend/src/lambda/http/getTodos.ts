import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { getAllTodoItems as getTodosForUser } from '../../helpers/todos'
import { getUserId } from '../utils';

// TODO: Get all TODO items for a current user
export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Write your code here
    let todos
    try{
       todos = await getTodosForUser(getUserId(event))
       return {
        statusCode:200,
        body: JSON.stringify({items:todos})
       }
      
    }catch(err){
      if(err) throw new Error('error while fetching all todos' + err)
      return
    }
  }
  )
  

handler.use(
  cors({
    credentials: true
  })
)
 