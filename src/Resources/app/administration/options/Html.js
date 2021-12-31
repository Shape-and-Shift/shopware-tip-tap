import Option from './Option.js';

export default class Html extends Option {
  constructor (icon, title, editor) {
    super(icon, title);
    this.action = () => editor.commands.setContent(editor.getHTML());
  }
};