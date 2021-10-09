import { Editor } from '@tiptap/vue-2';
import * as extensionList from '../extensions';
import * as tiptapOptions from '../options';

export default class ActionService {
  constructor() {
    this.editor = null;
  }

  getEditor() {
    return this.editor;
  }

  registerEditor(extensions = [], content, callback) {
    if (!this.editor) {
      const list = [];

      extensions.forEach(extension => {
        if (extensionList[extension]) {
          list.push(extensionList[extension]);
        }
      });

      this.editor = new Editor({
        extensions: [
          ...list
        ],
        content,
        onUpdate: callback
      });
    }

    return this.editor;
  }

  generateOptions(config) {
    const options = [];
    config.forEach(cf => {
      options.push(new tiptapOptions[cf.name](cf.icon, cf.title, this.editor));
    });

    return options;
  }
}