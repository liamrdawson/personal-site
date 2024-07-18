import { aws_lambda as lambda, Duration } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import * as lambdaNodeJS from "aws-cdk-lib/aws-lambda-nodejs";
import type { Construct } from "constructs";
// import path from "path";

interface RemixServerFunctionProps {
  server: string;
  projectRoot: string;
  depsLockFilePath: string;
  serverBundle: string;
  handler: string;
}

export class RemixServerFunction extends lambdaNodeJS.NodejsFunction {
  constructor(scope: Construct, id: string, props: RemixServerFunctionProps) {
    super(scope, id, {
      entry: props.server,
      projectRoot: props.projectRoot,
      depsLockFilePath: props.depsLockFilePath,
      bundling: {
        nodeModules: ["@remix-run/architect"],
        // format: lambdaNodeJS.OutputFormat.ESM,
      },
      code: lambda.Code.fromAsset(props.serverBundle),
      handler: props.handler,
      runtime: Runtime.NODEJS_20_X,
      timeout: Duration.seconds(10),
    });
  }
}
