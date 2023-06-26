/* eslint-disable no-console */
import * as core from '@actions/core'
import {App, Stack, RemovalPolicy} from 'aws-cdk-lib'
import {Construct} from 'constructs'
import * as ecr from 'aws-cdk-lib/aws-ecr'

class EcrStack extends Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id)

    const repositoryName = core.getInput('ecr-repository')

    // Create the ECR repository
    const repository = new ecr.Repository(this, 'Repository', {
      repositoryName,
      removalPolicy: RemovalPolicy.DESTROY,
      imageScanOnPush: true
    })

    console.log('Repository Name: ', repositoryName)
    console.log('Repository ARN: ', repository.repositoryArn)
    console.log('Repository URI: ', repository.repositoryUri)

    // Add standard lifecycle rules
    repository.addLifecycleRule({
      description: 'Only keep 1 untagged image',
      tagStatus: ecr.TagStatus.UNTAGGED,
      maxImageCount: 1
    })
    repository.addLifecycleRule({
      description: 'Only keep last 20 images',
      maxImageCount: 20
    })

    // Output the repository URI
    core.setOutput('repository-uri', repository.repositoryUri)
  }
}

// Create the CDK app
const app = new App()

// Create the stack
new EcrStack(app, 'EcrStack')

// Synthesize the CloudFormation template
app.synth()
