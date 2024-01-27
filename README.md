# Welcome to your CDK TypeScript project

followed typescript tutorial from cdkworkshop.com. 
TODO: add github integration to codepipeline so a github workflow starts when new code is pushed. this link might be helpful https://github.com/cdklabs/cdk-pipelines-github

___

You should explore the contents of this project. It demonstrates a CDK app with an instance of a stack (`CdkWorkshopStack`)
which contains an Amazon SQS queue that is subscribed to an Amazon SNS topic.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
