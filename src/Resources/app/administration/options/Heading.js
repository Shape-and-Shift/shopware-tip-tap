import Option from './Option.js';

export default class Heading extends Option {
    constructor (icon, title, editor, config) {
        super(icon, title);
        this.action = () => editor.chain().focus().toggleHeading({...config}).run();
        this.isActive = () => editor.isActive('heading', {...config});
    }
};