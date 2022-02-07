import Image from '@tiptap/extension-image';
import { mergeAttributes, nodeInputRule } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2';
import Vue from 'vue';
const inputRegex = /(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))/;

const CustomImage = Image.extend({
  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      height: {
        default: 300,
      },
      width: {
        default: 300,
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'sas-image-component',
      },
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['sas-image-component', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
  },

  addNodeView() {
    const componentConfig = Shopware.Component.build('sas-image-component');
    const vueComponent = Vue.component('sas-image-component', componentConfig);

    return VueNodeViewRenderer(vueComponent);
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: match => {
          const [,, alt, src, title, height, width] = match

          return { src, alt, title, height, width }
        },
      }),
    ]
  },
});

export default CustomImage;