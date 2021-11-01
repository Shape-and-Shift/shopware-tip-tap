import Option from './Option.js';

export default class Highlight extends Option {
    constructor (icon, title, editor) {
        super(icon, title);
        this.action = () => editor.chain().focus().toggleHighlight().run();
        this.isActive = () => editor.isActive('highlight');
    }
};