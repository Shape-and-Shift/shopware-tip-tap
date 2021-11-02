import Option from './Option.js';

export default class Underline extends Option {
    constructor (icon, title, editor) {
        super(icon, title);
        this.action = () => editor.chain().focus().toggleUnderline().run();
        this.isActive = () => editor.isActive('underline');
    }
};