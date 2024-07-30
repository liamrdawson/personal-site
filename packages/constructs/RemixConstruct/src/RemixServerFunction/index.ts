import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import fs from "fs";
import path from "path";

const defaultLambdaProps = {
  timeout: cdk.Duration.seconds(30),
  memorySize: 512,
  runtime: lambda.Runtime.NODEJS_20_X,
};

function getDir(dir: string): string {
  if (!fs.existsSync(dir)) {
    throw new Error(`Build Error: ${path} does not exist.`);
  }

  return dir;
}

interface RemixServerFunctionProps
  extends Omit<lambda.FunctionProps, "code" | "runtime"> {
  remixPath: string;
}

export class RemixServerFunction extends lambda.Function {
  constructor(scope: Construct, id: string, props: RemixServerFunctionProps) {
    const remixServerBuild = getDir(
      path.resolve(props.remixPath, "build/server")
    );

    const superProps = {
      ...defaultLambdaProps,
      ...props,
      code: lambda.Code.fromAsset(remixServerBuild),
    };

    super(scope, id, { ...superProps });
  }
}
