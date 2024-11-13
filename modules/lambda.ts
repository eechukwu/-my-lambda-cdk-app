// modules/lambda.ts
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class LambdaFunction extends Construct {
    public readonly lambdaFunction: lambda.Function;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.lambdaFunction = new lambda.Function(this, 'HelloLambda', {
            runtime: lambda.Runtime.NODEJS_18_X,
            handler: 'hello.handler',
            code: lambda.Code.fromAsset('lambda'), // Path to Lambda code
        });
    }
}