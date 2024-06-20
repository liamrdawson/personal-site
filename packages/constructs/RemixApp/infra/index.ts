import { RemixSite } from "@liamrdawsonweb/remix-cdk-construct";
import type { Construct } from "constructs";

export class RemixApp extends RemixSite {
  constructor(scope: Construct, id: string) {
    super(scope, id);
  }
}
