import TextAlign from '@tiptap/extension-text-align';

const Alignment = TextAlign.extend({
  addAttributes() {

  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          textAlign: {
            default: this.options.defaultAlignment,
            parseHTML: element => {
              return element.style.textAlign || this.options.defaultAlignment
            },
            renderHTML: attributes => {
              if (attributes.textAlign === this.options.defaultAlignment) {
                return {};
              }

              if (attributes.src) {
                let style = `text-align: ${attributes.textAlign}; display: block;`;
                if (attributes.textAlign === 'center') {
                  style = style.concat('margin-left: auto; margin-right: auto;');
                }

                if (attributes.textAlign === 'right') {
                  style = style.concat('margin-left: auto;');
                }

                if (attributes.textAlign === 'left') {
                  style = style.concat('margin-right: auto;');
                }

                return { style };
              }

              return { style: `text-align: ${attributes.textAlign}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setTextAlign: (alignment) => ({ editor, commands }) => {
        if (!this.options.alignments.includes(alignment)) {
          return false;
        }

        return this.options.types.every(type => {
          return commands.updateAttributes(type, { textAlign: alignment, type })
        });
      },
      unsetTextAlign: () => ({ commands }) => {
        return this.options.types.every(type => commands.resetAttributes(type, 'textAlign'));
      },
    };
  },
});

export default Alignment;