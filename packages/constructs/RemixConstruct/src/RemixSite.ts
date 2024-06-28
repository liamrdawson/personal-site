import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";

import { Bucket } from "./Bucket/Bucket";
import { RemixServerFunction } from "./RemixServerFunction";

type RemixSiteProps = {
  serverDir: string;
  publicDir: string;
};

export class RemixSite extends Construct {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
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
      "RemixServerFunction"
    );

    const httpApi = new apigateway.LambdaRestApi(this, "RemixSiteAPI", {
      handler: helloWorldFunction,
      proxy: false,
    });

    const helloResource = httpApi.root.addResource("hello");
    helloResource.addMethod("GET");
  }
}
