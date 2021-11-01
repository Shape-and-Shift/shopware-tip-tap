import Option from './Option.js';

export default class Italic extends Option {
    constructor (icon, title, editor) {
        super(icon, title);
        this.action = () => editor.chain().focus().toggleItalic().run();
        this.isActive = () => editor.isActive('italic');
    }
};