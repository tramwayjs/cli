import fs from 'fs';
import mkdirp from 'mkdirp';

export default class FileProvider {
    read(dir) {
        const buffer = fs.readFileSync(dir);
        return buffer.toString();
    }

    write(dir, fileName, content) {
        try {
            fs.writeFileSync(`${dir}/${fileName}.js`, content);
        } catch (e) {
            if (e.message.includes('no such file or directory')) {
                mkdirp.sync(dir);
                return this.write(dir, fileName, content);
            }

            throw e;
        }
    }
}