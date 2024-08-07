import { RemixSite } from "@liamrdawsonweb/remix-cdk-construct";
import type { Construct } from "constructs";
import path from "path";

export class RemixApp extends RemixSite {
  constructor(scope: Construct, id: string) {
    super(scope, id, {
      pathToRemixServerBuildFile: path.join(
        __dirname,
        "../build/server/index.js"
      ),
    });
  }
}
