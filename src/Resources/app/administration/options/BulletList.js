import Option from './Option.js';

export default class BulletList extends Option {
    constructor (icon, title, editor) {
        super(icon, title);
        this.action = () => editor.chain().focus().toggleBulletList().run();
        this.isActive = () => editor.isActive('bulletList');
    }
};