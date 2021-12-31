import Option from './Option.js';

export default class Undo extends Option {
  constructor (icon, title, editor) {
    super(icon, title);
    this.action = () => editor.commands.undo();
  }
};