import {Command, terminal} from 'tramway-command';

const {
    ProgressBar
} = terminal;

export default class UpgradeBabelCommand extends Command {
    constructor(
        installService, 
        babelRcRecipe,
        babelLibraries,
        babelUninstallLibraries,
    ) {
        super();

        this.installService = installService;
        this.babelRcRecipe = babelRcRecipe;
        this.babelLibraries = babelLibraries;
        this.babelUninstallLibraries = babelUninstallLibraries;
    }

    async action() {
        let progressBar = new ProgressBar('Upgrading Babel', 4);

        this.babelLibraries = Object.values(this.babelLibraries);
        this.babelUninstallLibraries = Object.values(this.babelUninstallLibraries);

        progressBar.start(`Installing babel presets ${this.babelLibraries.join(', ')}`);
        let data = await this.installService.installDev(...this.babelLibraries);
        progressBar.finish(`Installing babel presets ${this.babelLibraries.join(', ')}`);

        progressBar.start(`Uninstalling babel presets: ${this.babelUninstallLibraries.join(', ')}`);
        data = await this.installService.uninstall(...this.babelUninstallLibraries);
        progressBar.finish(`Uninstalling babel presets: ${this.babelUninstallLibraries.join(', ')}`);

        progressBar.start('Updating .babelrc');
        this.babelRcRecipe.create({overwrite: true});
        progressBar.finish('Updating .babelrc');

        progressBar.finish('Upgrading Babel');
    }

    configure() {

    }
}
