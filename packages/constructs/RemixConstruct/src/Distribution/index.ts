import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as cloudfrontOrigins from "aws-cdk-lib/aws-cloudfront-origins";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

interface RemixDistributionProps {
  bucket: s3.IBucket;
  serverApiUrl: string;
}

export class RemixDistribution extends Construct {
  public readonly distribution: cloudfront.Distribution;
  constructor(scope: Construct, id: string, props: RemixDistributionProps) {
    super(scope, id);

    const bucketOriginAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      "BucketOriginAccessIdentity"
    );
    props.bucket.grantRead(bucketOriginAccessIdentity);

    console.log(props.serverApiUrl);

    this.distribution = new cloudfront.Distribution(this, "Distribution", {
      enableLogging: false,
      defaultBehavior: {
        allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
        origin: new cloudfrontOrigins.HttpOrigin(props.serverApiUrl),
        originRequestPolicy:
          cloudfront.OriginRequestPolicy.ALL_VIEWER_EXCEPT_HOST_HEADER,
        cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      additionalBehaviors: {
        "assets/*": {
          allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
          origin: new cloudfrontOrigins.S3Origin(props.bucket, {
            originAccessIdentity: bucketOriginAccessIdentity,
          }),
          cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          compress: true,
        },
      },
    });
  }
}
