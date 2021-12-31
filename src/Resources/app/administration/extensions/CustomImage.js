import Image from '@tiptap/extension-image';
import { mergeAttributes } from '@tiptap/core';

const CustomImage = Image.extend({
  parseHTML() {
    return [
      {
        tag: 'img[src]',
      },
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },
});

export default CustomImage;