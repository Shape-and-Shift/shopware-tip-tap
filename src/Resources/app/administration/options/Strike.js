import Option from './Option.js';

export default class Strike extends Option {
    constructor (icon, title, editor) {
        super(icon, title);
        this.action = () => editor.chain().focus().toggleStrike().run();
        this.isActive = () => editor.isActive('strike');
    }
};