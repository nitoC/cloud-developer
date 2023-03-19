import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)

// TODO: Implement the fileStorage logic
const Bucket_name = process.env.ATTACHMENT_S3_BUCKET
const SignedUrlExpiration = process.env.SIGNED_URL_EXPIRATION

export const createAttachmentPresignedUrl = async (todoId:string) : Promise<string> =>{
   let signature = new XAWS.S3({signatureVersion:'v4'})
   let result;

try{
        result = await signature.getSignedUrl('putObject',{
         Bucket:Bucket_name,
         Key:todoId,
         Expires: parseInt(SignedUrlExpiration,10)
     
        })  as string
        return result
}catch(err){
        console.log(err)
        throw new Error('error getting signed url')
 }
}
export const getAttachmentUrl = (todoId:string)=>{
        return `https://${Bucket_name}.s3.amazonaws.com/${todoId}`
} 