import * as cdk from 'aws-cdk-lib'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { HitCounter } from '../lib/hitcounter';
import { Capture, Template } from 'aws-cdk-lib/assertions';

test('DyanoDB Table Created', () => {
    const stack = new cdk.Stack();

    new HitCounter(stack, 'MyTestConstruct', {
        downstream: new lambda.Function(stack, 'TestFunction', {
            code: lambda.Code.fromAsset('lambda'),
            handler: 'hello.handler',
            runtime: lambda.Runtime.NODEJS_16_X
        })
    })

    const template = Template.fromStack(stack)
    template.resourceCountIs("AWS::DynamoDB::Table", 1)
})

test('Lambda function has both env variables', () => {
    const stack = new cdk.Stack()

    new HitCounter(stack, 'MyTestConstruct', {
        downstream: new lambda.Function(stack, 'TestFunction', {
            code: lambda.Code.fromAsset('lambda'),
            handler: 'hello.handler',
            runtime: lambda.Runtime.NODEJS_16_X
        })
    })

    const template = Template.fromStack(stack)
    const envCapture = new Capture();
    template.hasResourceProperties("AWS::Lambda::Function", {
        Environment: envCapture
    })

    expect(envCapture.asObject()).toEqual({
        Variables: {
            DOWNSTREAM_FUNCTION_NAME: {
                Ref: "TestFunction22AD90FC",
            },
            HITS_TABLE_NAME: {
                Ref: "MyTestConstructHits24A357F0"
            }
        }
    })
})

test("DynamoDB Table Created with Encryption", () => {
    const stack = new cdk.Stack()

    new HitCounter(stack, 'MyTestConstruct', {
        downstream: new lambda.Function(stack, "TestFunction", {
            code: lambda.Code.fromAsset('lambda'),
            handler: 'hello.hanlder',
            runtime: lambda.Runtime.NODEJS_16_X
        })
    })

    const template = Template.fromStack(stack)
    template.hasResourceProperties("AWS::DynamoDB::Table", {
        SSESpecification: {
            SSEEnabled: true
        }
    })
})

test('read capacity can be configured', () => {
    const stack = new cdk.Stack()

    expect(() => {
        new HitCounter(stack, "MyTestConstruct", {
            downstream: new lambda.Function(stack, 'TestFunction', {
                code: lambda.Code.fromAsset('lambda'),
                handler: 'hello.handler',
                runtime: lambda.Runtime.NODEJS_16_X
            }),
            readCapacity: 3
        })
    }).toThrow(/readCapacity must be greater than 5 and less than 20/)
})