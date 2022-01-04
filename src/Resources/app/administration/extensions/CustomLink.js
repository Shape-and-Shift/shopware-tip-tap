import Link from '@tiptap/extension-link';

const CustomLink = Link.extend({
  addAttributes() {
    return {
      href: {
        default: null,
      },
      target: {
        default: this.options.HTMLAttributes.target,
      },
      class: {
        default: '',
      },
    }
  },
});

export default CustomLink;