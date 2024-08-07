import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3Deployment from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import path from "path";

import { RemixDistribution } from "./Distribution";
import { RemixServer } from "./RemixServerFunction";

interface RemixSiteProps {
  remixPath: string;
}

export class RemixSite extends Construct {
  constructor(scope: Construct, id: string, props: RemixSiteProps) {
    super(scope, id);

    const remixBucket = new s3.Bucket(this, "RemixStaticBucket", {
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const remixServer = new RemixServer(this, "RemixServerFunction", {
      remixPath: props.remixPath,
    });

    const remixDistribution = new RemixDistribution(this, "RemixDistribution", {
      serverApiUrl: remixServer.apiUrl,
      bucket: remixBucket,
    });

    new s3Deployment.BucketDeployment(this, "RemixBucketDeployment", {
      sources: [
        s3Deployment.Source.asset(
          path.join(props.remixPath, "build/client/assets")
        ),
      ],
      destinationBucket: remixBucket,
      destinationKeyPrefix: "assets",
      distribution: remixDistribution.distribution,
    });

    new cdk.CfnOutput(this, "RemixCloudfrontDomainName", {
      value: remixDistribution.distribution.distributionDomainName,
    });
  }
}
