// lib/my-lambda-cdk-app-stack.ts
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaFunction } from '../modules/lambda';
import { ApiGateway } from '../modules/api-gateway';
import { LoadBalancer } from '../modules/load-balancer';
import { VpcStack } from '../modules/vpc'; // Import VPC module

export class MyLambdaCdkAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create VPC
    const vpcStack = new VpcStack(this, 'MyVpcStack');

    // Create the Lambda function
    const lambdaFunction = new LambdaFunction(this, 'HelloLambda');

    // Create the API Gateway
    new ApiGateway(this, 'HelloApiGateway', lambdaFunction);

    // (Optional) Add the Load Balancer
    new LoadBalancer(this, 'MyLoadBalancer', lambdaFunction, vpcStack);
  }
}