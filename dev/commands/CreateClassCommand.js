import {Command, commands} from 'tramway-command';
import path from 'path';
// import IndexGenerationService from '../services/IndexGenerationService';
import ClassCreationService from '../services/ClassCreationService';
import ClassTemplate from '../services/templates/classes/ClassTemplate';

const {InputOption} = commands;

export default class CreateClassCommand extends Command {
    configure() {
        this.args.add((new InputOption('input', InputOption.string)).isRequired());
        this.options.add(new InputOption('str', InputOption.string));
        this.options.add((new InputOption('num', InputOption.number)).isRequired());
        this.options.add(new InputOption('arr', InputOption.array));
        this.options.add(new InputOption('bool', InputOption.boolean));
    }

    action() {

        let classCreationService = new ClassCreationService();

        classCreationService.createClass("Test", './test');

        console.log('=============')
        let a = new ClassTemplate();
        console.log(a.format("Test", "controller"))
        console.log('=============')


        // let indexGS = new IndexGenerationService();

        // let sampleIndex = indexGS.addClassToGroup("Class2", './dev/commands');

        // console.log(sampleIndex);


        // console.log(path.dirname(require.main.filename), process.env.TRAMWAY_PROJECT_PATH)
        // console.log("Test command ran, here's some of what you gave it", typeof this.getArgument('input'), typeof this.getOption('num'), this.options);
    }

}