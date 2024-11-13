import * as elb from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as elb_targets from 'aws-cdk-lib/aws-elasticloadbalancingv2-targets'; // Import LambdaTarget from the correct module
import * as cdk from 'aws-cdk-lib'; // Ensure cdk is imported here for cdk.CfnOutput
import { Construct } from 'constructs';
import { LambdaFunction } from './lambda'; // Import Lambda module
import { VpcStack } from './vpc'; // Import VPC module

export class LoadBalancer extends Construct {
    constructor(scope: Construct, id: string, lambdaFunction: LambdaFunction, vpcStack: VpcStack) {
        super(scope, id);

        const vpc = vpcStack.vpc;

        // Create the Application Load Balancer
        const loadBalancer = new elb.ApplicationLoadBalancer(this, 'MyLoadBalancer', {
            vpc: vpc,
            internetFacing: true, // Make the Load Balancer accessible from the internet
        });

        // Create a listener for the Load Balancer
        const listener = loadBalancer.addListener('Listener', {
            port: 80,
        });

        // Add Lambda as a target using LambdaTarget
        listener.addTargets('LambdaTarget', {
            targets: [new elb_targets.LambdaTarget(lambdaFunction.lambdaFunction)], // Correct usage of LambdaTarget
            healthCheck: {
                path: '/',
                interval: cdk.Duration.seconds(30),
            },
        });

        // Output the Load Balancer DNS name
        new cdk.CfnOutput(this, 'LoadBalancerDNS', {
            value: loadBalancer.loadBalancerDnsName,
            description: 'DNS Name of the Load Balancer',
        });
    }
}