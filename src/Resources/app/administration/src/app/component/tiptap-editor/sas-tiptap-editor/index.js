import { EditorContent } from '@tiptap/vue-2';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Alignment from 'extensions/Alignment';
import CustomLink from 'extensions/CustomLink';

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
              Underline,
              ListItem,
              BulletList,
              OrderedList,
              CustomLink.configure({
                  openOnClick: false,
                  linkOnPaste: false,
              }),
              Alignment.configure({
                  types: ['heading', 'paragraph', 'image'],
                  alignments: ['left', 'center', 'right', 'justify'],
              }),
              Placeholder.configure({
                  placeholder: this.placeholder,
              }),
          ],
          this.value,
          () => {
            // HTML
            this.$emit("input", this.editor.getHTML());
            },
        );
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
