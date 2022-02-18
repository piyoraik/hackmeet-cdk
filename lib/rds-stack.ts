import { Stack, StackProps } from "aws-cdk-lib";
import {
  InstanceClass,
  InstanceSize,
  InstanceType,
  ISecurityGroup,
  IVpc,
  SecurityGroup,
  SubnetType,
} from "aws-cdk-lib/aws-ec2";
import {
  Credentials,
  DatabaseInstance,
  DatabaseInstanceEngine,
  IDatabaseInstance,
  MysqlEngineVersion,
} from "aws-cdk-lib/aws-rds";
import { Construct } from "constructs";

export class RDSStack extends Stack {
  public readonly rdsInstance: IDatabaseInstance;
  public readonly rdsSecurityGroup: ISecurityGroup;
  public readonly rdsSecret: Credentials;
  constructor(scope: Construct, id: string, vpc: IVpc, props?: StackProps) {
    super(scope, id, props);

    this.rdsSecurityGroup = new SecurityGroup(this, "HackMeetSecurityGroup", {
      vpc,
      allowAllOutbound: true,
    });

    this.rdsSecret = Credentials.fromGeneratedSecret("root");

    this.rdsInstance = new DatabaseInstance(this, "MySQL", {
      engine: DatabaseInstanceEngine.mysql({
        version: MysqlEngineVersion.VER_5_7_21,
      }),
      credentials: this.rdsSecret,
      databaseName: "hackmeet",
      instanceType: InstanceType.of(InstanceClass.T2, InstanceSize.MICRO),
      vpc,
      vpcSubnets: {
        subnetType: SubnetType.PRIVATE_ISOLATED,
      },
      securityGroups: [this.rdsSecurityGroup],
    });
  }
}
