const { join, resolve } = require('path');
module.exports = () => {
    return {
        resolve: {
            alias: {
                '@tiptap': resolve(
                    join(__dirname, '..', 'node_modules', '@tiptap'),
                ),
                'remixicon': resolve(
                    join(__dirname, '..', 'node_modules', 'remixicon')
                ),
                'extensions': resolve(
                    join(__dirname, '..', 'extensions')
                ),
            }
        }
    };
}
