import Option from './Option.js';

export default class Bold extends Option {
  constructor (icon, title, editor) {
    super(icon, title);
    this.action = () => editor.chain().focus().toggleBold().run();
    this.isActive = () => editor.isActive('bold');
  }
};