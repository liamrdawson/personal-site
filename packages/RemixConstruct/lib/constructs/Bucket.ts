import * as s3 from "aws-cdk-lib/aws-s3";
import type { Construct } from "constructs";

export class Bucket extends s3.Bucket {
  constructor(scope: Construct, id: string, props: s3.BucketProps) {
    super(scope, id, props);
  }
}
