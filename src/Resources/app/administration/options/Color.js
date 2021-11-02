import Option from './Option.js';

export default class Color extends Option {
    constructor (icon, title, editor) {
        super(icon, title);
        this.action = () => editor.chain().focus().setColor('#958DF1').run();
    }
};