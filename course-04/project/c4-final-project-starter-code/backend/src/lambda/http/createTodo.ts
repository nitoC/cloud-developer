import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { getUserId } from '../utils';
import { createTodo } from '../../helpers/todos'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    // TODO: Implement creating a new TODO item
     try{
       let userId = getUserId(event)
       let newItem = await createTodo(newTodo, userId)
      return {
        statusCode: 201,
        body:JSON.stringify({item:newItem})
      }

     }catch(err){
      console.log(err)
      throw new Error('oops error while creating todo ' + err)
     }
  }
)

handler.use(
  cors({
    credentials: true
  })
)
