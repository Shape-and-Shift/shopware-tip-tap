export default class Bold {
  constructor (icon, title, editor) {
    this.icon = icon;
    this.title = title;

    this.action = () => editor.chain().focus().toggleBold().run();
    this.isActive = () => editor.isActive('bold');
  }
};