import { Duration } from "aws-cdk-lib";
import { Architecture, Runtime } from "aws-cdk-lib/aws-lambda";
import * as lambdaNodeJS from "aws-cdk-lib/aws-lambda-nodejs";
import type { Construct } from "constructs";
import path from "path";

export class RemixServerFunction extends lambdaNodeJS.NodejsFunction {
  constructor(scope: Construct, id: string) {
    super(scope, id, {
      entry: path.join(__dirname, "./handler.ts"),
      runtime: Runtime.NODEJS_20_X,
      timeout: Duration.seconds(10),
    });
  }
}
