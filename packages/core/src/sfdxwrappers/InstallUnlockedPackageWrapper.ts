import { SFDXCommand } from '../command/SFDXCommand';
import { Logger, LoggerLevel } from '@dxatscale/sfp-logger';

export default class InstallUnlockedPackageWrapper extends SFDXCommand {
    public constructor(
        logger: Logger,
        logLevel: LoggerLevel,
        working_directory: string,
        private targetUserName: string,
        private packageId: string,
        private waitTime: string,
        private publishWaitTime?: string,
        private installationkey?: string,
        private securityType?: string,
        private upgradeType?: string,
        private apiVersion?: string,
        private apexCompile: string = 'package'
        
    ) {
        super(targetUserName, working_directory, logger, logLevel);
    }


    public setInstallationKey(installationKey:string)
    {
        this.installationkey = installationKey
    }

    public async exec(quiet?: boolean): Promise<any> {
        let result = await super.exec(quiet, 0, !quiet);
        return result;
    }

    getCommandName(): string {
        return 'InstallUnlockedPackageImpl';
    }

    getSFDXCommand(): string {
        return `sfdx force:package:install`;
    }

    getGeneratedParams(): string {
        let command = `--targetusername ${this.targetUserName} --package ${this.packageId} --apexcompile=${this.apexCompile} --noprompt --wait ${this.waitTime}`;
        if (this.installationkey) command += ` --installationkey=${this.installationkey}`;
        if (this.publishWaitTime) command += ` --publishwait=${this.publishWaitTime}`;
        if (this.securityType) command += ` --securitytype=${this.securityType}`;
        if (this.upgradeType) command += ` --upgradetype=${this.upgradeType}`;
        if (this.apiVersion) command += ` --apiversion=${this.apiVersion}`;

        return command;
    }
}
