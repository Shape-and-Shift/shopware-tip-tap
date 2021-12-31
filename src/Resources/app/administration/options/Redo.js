import Option from './Option.js';

export default class Redo extends Option {
  constructor (icon, title, editor) {
    super(icon, title);
    this.action = () => editor.commands.redo();
  }
};