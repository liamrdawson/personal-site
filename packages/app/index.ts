import { RemixApp } from "@liamrdawsonweb/remix-app";
import * as cdk from "aws-cdk-lib";

const app = new cdk.App();

const stack = new cdk.Stack(app, "liamrdawsonweb");

new RemixApp(stack, "remix-app");

app.synth();
