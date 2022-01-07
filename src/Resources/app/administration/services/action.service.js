import { Editor } from '@tiptap/vue-2';
import * as tiptapOptions from '../options';

export default class ActionService {
  constructor() {
    this.editor = null;
  }

  getEditor() {
    return this.editor;
  }

  registerEditor(extensions = [], content, callback) {
    this.editor = new Editor({
      extensions: [
        ...extensions
      ],
      content,
      onUpdate: callback
    });

    return this.editor;
  }

  generateOptions(config) {
    const options = [];
    config.forEach(cf => {
      if (cf.type !== 'divider' && cf.type !== 'set' && cf.type !== 'link' && cf.type !== 'Color') {
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