import {Command, commands} from 'tramway-command';
import path from 'path';

import {CreateController} from '../recipes';

const {InputOption} = commands;

export default class CreateControllerCommand extends Command {
    constructor() {
        super();

        this.recipe = new CreateController();
    }

    configure() {
        this.args.add((new InputOption('name', InputOption.string)).isRequired());
        this.options.add(new InputOption('dir', InputOption.string, "controllers"));
        // this.options.add((new InputOption('num', InputOption.number)).isRequired());
        // this.options.add(new InputOption('arr', InputOption.array));
        // this.options.add(new InputOption('bool', InputOption.boolean));
    }

    action() {
        let name = this.getArgument('name');
        let dir = this.getOption('dir');

        this.recipe.execute(name, dir);



        // let classCreationService = new ClassCreationService();

        // classCreationService.createClass("Test", './test');
 
        // console.log('=============')
        // console.log(this.template.format(name, "controller"))
        // console.log('=============')


        // let indexGS = new IndexGenerationService();

        // let sampleIndex = indexGS.addClassToGroup("Class2", './dev/commands');

        // console.log(sampleIndex);


        // console.log(path.dirname(require.main.filename), process.env.TRAMWAY_PROJECT_PATH)
        // console.log("Test command ran, here's some of what you gave it", typeof this.getArgument('input'), typeof this.getOption('num'), this.options);
    }

}