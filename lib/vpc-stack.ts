import { Stack, StackProps, Tags } from "aws-cdk-lib";
import { IVpc, SubnetType, Vpc } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export class VPCStack extends Stack {
  public readonly vpc: IVpc;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.vpc = new Vpc(this, "HackMeetVPC", {
      cidr: "10.0.0.0/16",
      maxAzs: 2,
      enableDnsSupport: true,
      enableDnsHostnames: true,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: "public-1",
          subnetType: SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: "private-1",
          subnetType: SubnetType.PRIVATE_ISOLATED,
        },
      ],
    });
    Tags.of(this.vpc).add("Name", "HackMeetVPCStack");
  }
}
