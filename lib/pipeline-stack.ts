import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as codecommit from 'aws-cdk-lib/aws-codecommit'

export class WorkshopPipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props)

        new codecommit.Repository(this, 'WorkshopRepo', {
            repositoryName: 'WorkshopRepo'
        })
    }
}