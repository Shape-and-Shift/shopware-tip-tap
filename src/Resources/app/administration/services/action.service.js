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
      if (cf.type !== 'divider') {
        if (cf.type === 'sw-media') {
          cf.config = {
            ...cf.config,
            action: () => this.$emit('media-open')
          };
        }

        options.push(new tiptapOptions[cf.name](cf.icon, cf.title, this.editor, cf.config));
      } else {
        options.push({...cf});
      }
    });

    return options;
  }
}