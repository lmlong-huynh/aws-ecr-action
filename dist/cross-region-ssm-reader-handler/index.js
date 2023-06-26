"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.handler=void 0;const aws_sdk_1=require("aws-sdk");async function handler(event){const props=event.ResourceProperties.ReaderProps,imports=props.imports,importNames=Object.keys(imports),keyName=`aws-cdk:strong-ref:${props.prefix}`,ssm=new aws_sdk_1.SSM({region:props.region});try{switch(event.RequestType){case"Create":console.info("Tagging SSM Parameter imports"),await addTags(ssm,importNames,keyName);break;case"Update":const oldExports=event.OldResourceProperties.ReaderProps.imports,newExports=except(importNames,Object.keys(oldExports)),paramsToRelease=except(Object.keys(oldExports),importNames);console.info("Releasing unused SSM Parameter imports"),Object.keys(paramsToRelease).length>0&&await removeTags(ssm,paramsToRelease,keyName),console.info("Tagging new SSM Parameter imports"),await addTags(ssm,newExports,keyName);break;case"Delete":console.info("Releasing all SSM Parameter exports by removing tags"),await removeTags(ssm,importNames,keyName);return}}catch(e){throw console.error("Error importing cross region stack exports: ",e),e}return{Data:imports}}exports.handler=handler;async function addTags(ssm,parameters,keyName){await Promise.all(parameters.map(async name=>{try{return await ssm.addTagsToResource({ResourceId:name,ResourceType:"Parameter",Tags:[{Key:keyName,Value:"true"}]}).promise()}catch(e){throw new Error(`Error importing ${name}: ${e}`)}}))}async function removeTags(ssm,parameters,keyName){await Promise.all(parameters.map(async name=>{try{return await ssm.removeTagsFromResource({TagKeys:[keyName],ResourceType:"Parameter",ResourceId:name}).promise()}catch(e){switch(e.code){case"InvalidResourceId":return;default:throw new Error(`Error releasing import ${name}: ${e}`)}}}))}function except(source,filter){return source.filter(key=>!filter.includes(key))}
