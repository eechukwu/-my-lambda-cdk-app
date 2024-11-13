import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as cdk from 'aws-cdk-lib';  // Correct import for cdk module
import { Construct } from 'constructs';
import { LambdaFunction } from './lambda'; // Import Lambda module

export class ApiGateway extends Construct {
    public readonly api: apigateway.RestApi;

    constructor(scope: Construct, id: string, lambdaFunction: LambdaFunction) {
        super(scope, id);

        // Create an API Gateway REST API
        this.api = new apigateway.RestApi(this, 'HelloApi', {
            restApiName: 'Hello Service',
            description: 'This service serves a Lambda function.',
        });

        // Create a Lambda integration for the GET method
        const lambdaIntegration = new apigateway.LambdaIntegration(lambdaFunction.lambdaFunction, {
            requestTemplates: { 'application/json': '{"statusCode": 200}' },
        });

        // Define the '/hello' resource and add the GET method
        const helloResource = this.api.root.addResource('hello');
        helloResource.addMethod('GET', lambdaIntegration); // This creates the GET /hello endpoint

        // Output the API Gateway URL
        new cdk.CfnOutput(this, 'APIUrl', {
            value: this.api.url!,
            description: 'API Gateway URL', // The URL of the API Gateway
        });
    }
}