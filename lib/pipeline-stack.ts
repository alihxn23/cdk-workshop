import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as codecommit from 'aws-cdk-lib/aws-codecommit'
import { Pipeline } from "aws-cdk-lib/aws-codepipeline";
import { CodeBuildStep, CodePipeline, CodePipelineSource } from "aws-cdk-lib/pipelines";
import { WorkshopPipelineStage } from "./pipeline-stage";

export class WorkshopPipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props)

        const repo = new codecommit.Repository(this, 'WorkshopRepo', {
            repositoryName: 'WorkshopRepo'
        })

        const pipeline = new CodePipeline(this, 'Pipeline', {
            pipelineName: 'WorkshopPipeline',
            synth: new CodeBuildStep('SynthStep', {
                input: CodePipelineSource.codeCommit(repo, 'main'),
                installCommands: [
                    'npm install -g aws-cdk'
                ],
                commands: [
                    'npm ci',
                    'npm run build',
                    'npx cdk synth'
                ]
            })
        })

        const deploy = new WorkshopPipelineStage(this, 'Deploy')
        const deployStage = pipeline.addStage(deploy)

        deployStage.addPost(
            new CodeBuildStep("TestViewerEndpoint", {
                projectName: 'TestViewerEndpoint',
                envFromCfnOutputs: {
                    ENDPOINT_URL: deploy.hcViewerUrl
                },
                commands: [
                    'curl -Ssf $ENDPOINT_URL'
                ]
            }),

            new CodeBuildStep("TestApiGatewayEndpoint", {
                projectName: 'TestApiGatewayEndpoint',
                envFromCfnOutputs: {
                    ENDPOINT_URL: deploy.hcEndpoint
                },
                commands: [
                    'curl -Ssf $ENDPOINT_URL',
                    'curl -Ssf $ENDPOINT_URL/hello',
                    'curl -Ssf $ENDPOINT_URL/test'
                ]
            })
        )
    }
}