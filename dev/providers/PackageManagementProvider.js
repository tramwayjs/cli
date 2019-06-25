export default class PackageManagementProvider {
    constructor(shellProvider, options = {}) {
        const {packageManager = 'npm', command = 'install', args = ['--save']} = options;

        this.packageManager = packageManager;
        this.command = command;
        this.args = Array.isArray(args) ? args : Object.values(args);

        this.shellProvider = shellProvider;
    }

    async install(...components) {
        return await this.shellProvider.run(this.packageManager, this.command, ...this.args, ...components);
    }

    async uninstall(...components) {
        return await this.shellProvider.run(this.packageManager, 'uninstall', ...this.args, ...components);
    }

    async installDev(...components) {
        let args = this.args;
        let index = args.indexOf('--save');

        if (~index) {
            args[index] = '--save-dev';
        }

        return await this.shellProvider.run(this.packageManager, this.command, ...args, ...components);
    }

    isInstalled(component) {
        try {
            return require.resolve(component);
        } catch(e) {
            return false;
        }
    }
}