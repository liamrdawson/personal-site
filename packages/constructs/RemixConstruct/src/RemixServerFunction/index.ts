import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as lambdaNodeJS from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import fs from "fs";
import path from "path";

function getDir(dir: string): string {
  if (!fs.existsSync(dir)) {
    throw new Error(`Build Error: ${path} does not exist.`);
  }

  return dir;
}

interface RemixServerFunctionProps
  extends Omit<lambdaNodeJS.NodejsFunctionProps, "code" | "runtime"> {
  pathToRemixServerBuildFile: string;
}

export class RemixServerFunction extends lambdaNodeJS.NodejsFunction {
  constructor(scope: Construct, id: string, props: RemixServerFunctionProps) {
    super(scope, id, {
      entry: path.join(__dirname, "./handler.ts"),
      runtime: lambda.Runtime.NODEJS_20_X,
      timeout: cdk.Duration.seconds(10),
      environment: {
        REMIX_SERVER_BUILD: getDir(props.pathToRemixServerBuildFile),
      },
    });
  }
}
