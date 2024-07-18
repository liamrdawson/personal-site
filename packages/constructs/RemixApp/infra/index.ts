import { RemixSite } from "@liamrdawsonweb/remix-cdk-construct";
import type { Construct } from "constructs";
import path from "path";

export class RemixApp extends RemixSite {
  constructor(scope: Construct, id: string) {
    super(scope, id, {
      server: path.join(__dirname, "../server.ts"),
      projectRoot: path.join(__dirname, "../../../.."),
      depsLockFilePath: path.join(__dirname, "../../../../pnpm-lock.yaml"),
      serverBundle: path.join(__dirname, "../build/server"),
      handler: path.join(__dirname, "../server.handler"),
    });
  }
}
