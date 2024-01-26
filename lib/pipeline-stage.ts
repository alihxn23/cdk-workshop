import { CfnOutput, StackProps, Stage } from "aws-cdk-lib";
import { Construct } from "constructs";
import { CdkWorkshopStack } from "./cdk-workshop-stack";

export class WorkshopPipelineStage extends Stage {
    public readonly hcViewerUrl: CfnOutput;
    public readonly hcEndpoint: CfnOutput

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props)

        const service = new CdkWorkshopStack(this, 'WebService')

        this.hcViewerUrl = service.hcViewerUrl
        this.hcEndpoint = service.hcEndpoint
    }
}