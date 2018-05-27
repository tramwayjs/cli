import fs from 'fs';

export default class FileProvider {
    read(dir) {
        try {
            const buffer = fs.readFileSync(dir);
            return buffer.toString();
        } catch (e) {
            // if (e.message.includes('no such file or directory')) {
            //     return null;
            // }

            console.log(e)

            // throw e;
        }
    }

    write(dir, fileName, content) {
        try {
            fs.writeFileSync(`${dir}/${fileName}.js`, content);
        } catch (e) {
            if (e.message.includes('no such file or directory')) {
                fs.mkdirSync(dir);
                return this.write(dir, fileName, content);
            }

            throw e;
        }
    }
}