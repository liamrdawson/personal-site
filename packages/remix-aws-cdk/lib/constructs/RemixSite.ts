import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cdk from "aws-cdk-lib";

type RemixSiteProps = {
  serverDir: string;
  publicDir: string;
};

export class RemixSite extends Construct {
  constructor(scope: Construct, id: string, props: RemixSiteProps) {
    super(scope, id);

    const remixBucket = new s3.Bucket(this, "StaticBucket", {
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });
  }
}
