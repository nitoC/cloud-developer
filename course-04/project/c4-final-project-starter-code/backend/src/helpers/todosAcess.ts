import * as AWS from 'aws-sdk'
const AWSXRay = require('aws-xray-sdk')
import { DocumentClient, UpdateItemInput } from 'aws-sdk/clients/dynamodb'
//import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'

//import { TodoUpdate } from '../models/TodoUpdate';

const XAWS = AWSXRay.captureAWS(AWS)


//const logger = createLogger('TodosAccess')

// TODO: Implement the dataLayer logic
const Document:DocumentClient = new XAWS.DynamoDB.DocumentClient()
const TableName:string = process.env.TODOS_TABLE
const index = process.env.TODOS_CREATED_AT_INDEX


export const todosCreate = async (todoItem:TodoItem)=>{
    try{
        return await Document.put({
            TableName,
            Item:todoItem
        }).promise()
    }catch(err){
        console.log(err)
        throw new Error('todos accss error for creating todos')
    }

}

export const todosUpdate = async (todoId, userId, todoUpdate)=>{
    let parameters = {
      TableName,
      Key:{
        todoId, 
        userId
      },
      UpdateExpression: 'set #name = :name, dueDate = :dueDate, done = :done',
      ExpressionAttributeValues: {
        ':name': todoUpdate.name,
        ':dueDate': todoUpdate.dueDate,
        ':done': todoUpdate.done
      },
      ExpressionAttributeNames: {
        '#name': 'name'
      },
      ReturnValues: 'ALL_NEW'
    }
    try {

       return await Document.update(parameters as UpdateItemInput).promise()
    }catch(err){
        if(err) console.log(err)
    }
   return todoUpdate
}

export const getAllTodos = async (userId:string)=>{
    let result;
    let parameters = {
        TableName,
        IndexName: index,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': userId
        }
    }
    try{
        result = await Document.query(parameters).promise()
        console.log(result.Items, 'items log')
        return result.Items
    }catch(error){
        console.log(error)
        throw new Error(error)
    }
}

export const todosDelete = async (todoId:string, userId:string)=>{
    let parameters = {
        TableName,
        Key:{
            userId,
            todoId
        }
    }
      try{
          await Document.delete(parameters).promise()
      }catch(error){
        console.log(error)
        throw new Error('failed to delete Item')
      }
}

export const updateAttachment = async (userId:string, todoId:string, attachmentUrl:string)=>{
        let parameters = {
            TableName,
            Key:{
                userId,
                todoId
            },
            updateExpression: 'set attachmentUrl = :attachmentUrl',
            ExpressionAttributeValues:{
                ':attachmentUrl': attachmentUrl
            }
        }
        try{
            
            await Document.update(parameters).promise()
            return 'update successfull'
        }catch(error){
            console.log(error)
            throw new Error(' failed to update attachment url')
        }
}

