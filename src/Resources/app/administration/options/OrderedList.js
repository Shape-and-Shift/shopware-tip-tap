import Option from './Option.js';

export default class OrderedList extends Option {
    constructor (icon, title, editor) {
        super(icon, title);
        this.action = () => editor.chain().focus().toggleOrderedList().run();
        this.isActive = () => editor.isActive('orderedList');
    }
};