import Option from './Option.js';

export default class Code extends Option {
    constructor (icon, title, editor) {
        super(icon, title);
        this.action = () => editor.chain().focus().toggleCode().run();
        this.isActive = () => editor.isActive('code');
    }
};