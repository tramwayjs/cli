export default class ReplacementInjector {
    inject(contents, replacements = []) {
        if (!replacements || !replacements.length) {
            return contents;
        }

        replacements.forEach(([find, replace]) => {
            contents = contents.replace(find, replace);
        });

        return contents;
    }
}