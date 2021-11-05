import Option from './Option.js';

export default class TextAlign extends Option {
    constructor (icon, title, editor, config) {
        super(icon, title);
        this.action = () => editor.chain().focus().setTextAlign(config.textAlign).run();
        this.isActive = () => editor.isActive('textAlign', {...config});
    }
};