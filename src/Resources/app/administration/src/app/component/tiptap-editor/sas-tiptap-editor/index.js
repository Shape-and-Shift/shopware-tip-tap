import { EditorContent } from '@tiptap/vue-2';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import template from './sas-tiptap-editor.html.twig';
import './sas-tiptap-editor.scss';

const { Component } = Shopware;
const { isEmpty } = Shopware.Utils.types;

Component.register('sas-tiptap-editor', {
    template,

    inject: ['actionService'],

    components: {
        EditorContent,
    },

    props: {
        value: {
            type: String,
            default: "",
        },
        options: {
            type: Array,
            default: []
        },
        label: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        }
    },

    data() {
        return {
            editor: null,
            showMediaComponent: false,
        };
    },

    watch: {
        value(value) {
            // HTML
            const isSame = this.editor.getHTML() === value;

            // JSON
            // const isSame = this.editor.getJSON().toString() === value.toString()

            if (isSame) {
                return;
            }

            this.editor.commands.setContent(this.value, false);
        },
    },

    created() {
        this.editor = this.actionService.registerEditor(
          [
              StarterKit,
              Image,
              Placeholder.configure({
                  placeholder: this.placeholder,
              })
          ],
          this.value,
          () => {
            // HTML
            this.$emit("input", this.editor.getHTML());
            },
        );
    },

    beforeDestroy() {
        this.editor.destroy();
    },

    methods: {
        onMediaOpen() {
            this.showMediaComponent = true;
        },

        onAddMedia(media) {
            if (isEmpty(media)) {
                return;
            }

            media.forEach((item) =>  {
                setTimeout(() => {
                    this.editor.chain().focus().setImage({ src: item.url }).run();
                }, 10);
            });
        }
    }
});
