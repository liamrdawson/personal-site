import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cdk from "aws-cdk-lib";

import { Bucket } from "./Bucket/Bucket";

type RemixSiteProps = {
  serverDir: string;
  publicDir: string;
};

export class RemixSite extends Construct {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id);

    new Bucket(this, "MyFirstBucket", { versioned: true });
  }
}
