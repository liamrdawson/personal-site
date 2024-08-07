import * as cdk from "aws-cdk-lib";
import * as apigwv2 from "aws-cdk-lib/aws-apigatewayv2";
import * as apigwIntegrations from "aws-cdk-lib/aws-apigatewayv2-integrations";
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
  remixPath: string;
}

class RemixServerFunction extends lambdaNodeJS.NodejsFunction {
  constructor(scope: Construct, id: string, props: RemixServerFunctionProps) {
    super(scope, id, {
      entry: getDir(path.join(props.remixPath, "server.ts")),
      runtime: lambda.Runtime.NODEJS_20_X,
      timeout: cdk.Duration.seconds(10),
      bundling: {
        format: lambdaNodeJS.OutputFormat.ESM,
        mainFields: ["module", "main"],
        esbuildArgs: {
          "--conditions": "module",
        },
        banner:
          "import { createRequire } from 'module';const require = createRequire(import.meta.url);",
        nodeModules: [
          "@remix-run/architect",
          "vite",
          "@rollup/rollup-linux-x64-gnu",
        ],
      },
      environment: {
        NODE_ENV: "production",
      },
    });
  }
}

interface RemixServerProps {
  remixPath: string;
}

export class RemixServer extends Construct {
  public readonly apiUrl: string;

  constructor(scope: Construct, id: string, props: RemixServerProps) {
    super(scope, id);

    const remixLambdaNodeJsFunction = new RemixServerFunction(
      this,
      "RemixServerFunction",
      {
        remixPath: props.remixPath,
      }
    );

    const integration = new apigwIntegrations.HttpLambdaIntegration(
      "LambdaIntegration",
      remixLambdaNodeJsFunction
    );

    const httpApi = new apigwv2.HttpApi(this, "RemixApi", {
      apiName: scope.node.id,
      defaultIntegration: integration,
    });

    this.apiUrl = `${httpApi.httpApiId}.execute-api.${
      cdk.Stack.of(this).region
    }.${cdk.Stack.of(this).urlSuffix}`;
  }
}
