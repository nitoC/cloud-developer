import { todosUpdate, todosCreate, todosDelete, updateAttachment, getAllTodos} from './todosAcess'
import { getAttachmentUrl} from './attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
//import * as createError from 'http-errors'
const logger = createLogger('todos')
// TODO: Implement businessLogic
export const createTodo = async (todo:CreateTodoRequest, userId:string)=>{
    logger.info('creating todos')
    let id = uuid.v4()
    let created = new Date(Date.now()).toLocaleString()
    let attachment = getAttachmentUrl(id)
    let item =  {
        userId: userId,
        todoId: id,
        createdAt:created,
        done: false,
        attachmentUrl: attachment,
        ...todo
    } as unknown as TodoItem
    logger.info(item.attachmentUrl)
    try{
        await todosCreate(item)
    }catch(err){
        console.log(err)
        if(err) throw new Error("put item failed")
    }
    return item
}

export const deleteTodo = async (userId:string, todoId:string)=>{
    logger.info('deleting todos')
    try{
        await todosDelete(userId, todoId)
    }catch(err){
        console.log(err) 
       throw new Error(' could not delete item')
    }
}

export const updateTodos = async (todoId:string, userId:string, update:UpdateTodoRequest)=>{
    logger.info('updating items')
    try{
        await todosUpdate(todoId, userId, update)
    }catch(err){
        console.log(err)
        throw new Error(' oops! failed to update todo item')
    }
}
export const updateAttachmentData = async (userId, todoId, attachment)=>{
    logger.info('updating attachment')
    try{
      return await updateAttachment(userId, todoId, attachment)
    }catch(err){
    console.log(err)
    throw new Error('failed to change attached image/document')
   }
}

export const getAllTodoItems = async (userId:string)=>{
   try{
    let result = await getAllTodos(userId)
    return result
   }catch(err){
    throw new Error(' could not get all todo items at this time' + err)
   }
}