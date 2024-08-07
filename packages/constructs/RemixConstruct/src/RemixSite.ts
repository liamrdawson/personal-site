import * as cdk from "aws-cdk-lib";
import { CfnOutput } from "aws-cdk-lib";
import { CorsHttpMethod } from "aws-cdk-lib/aws-apigatewayv2";
import * as apigwv2 from "aws-cdk-lib/aws-apigatewayv2";
import * as apigwIntegrations from "aws-cdk-lib/aws-apigatewayv2-integrations";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

import { Bucket } from "./Bucket/Bucket";
import { RemixServerFunction } from "./RemixServerFunction";

interface RemixSiteProps {
  pathToRemixServerBuildFile: string;
}

export class RemixSite extends Construct {
  public readonly apiUrl: string;
  constructor(scope: Construct, id: string, props: RemixSiteProps) {
    super(scope, id);

    new Bucket(this, "MyFirstBucket", {
      versioned: true,
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const helloWorldFunction = new RemixServerFunction(
      this,
      "RemixServerFunction",
      {
        pathToRemixServerBuildFile: props.pathToRemixServerBuildFile,
      }
    );

    const integration = new apigwIntegrations.HttpLambdaIntegration(
      "LambdaIntegration",
      helloWorldFunction
    );

    const httpApi = new apigwv2.HttpApi(this, "RemixApi", {
      apiName: scope.node.id,
      defaultIntegration: integration,
      corsPreflight: {
        allowMethods: [
          CorsHttpMethod.GET,
          CorsHttpMethod.DELETE,
          CorsHttpMethod.PUT,
          CorsHttpMethod.POST,
        ],
        allowOrigins: ["*"],
      },
    });

    // Output the API endpoint URL
    new CfnOutput(this, "ApiEndpoint", {
      value: httpApi.apiEndpoint,
    });
  }
}
