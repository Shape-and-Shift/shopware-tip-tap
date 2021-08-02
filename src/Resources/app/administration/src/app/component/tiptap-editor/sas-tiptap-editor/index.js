import { Editor, EditorContent } from '@tiptap/vue-2';
import StarterKit from '@tiptap/starter-kit';
import template from './sas-tiptap-editor.html.twig';
import './sas-tiptap-editor.scss';

const { Component } = Shopware;

Component.register('sas-tiptap-editor', {
    template,

    components: {
        EditorContent,
    },

    props: {
        value: {
            type: String,
            default: "",
        },
    },

    data() {
        return {
            editor: null,
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

    mounted() {
        this.editor = new Editor({
            extensions: [StarterKit],
            content: this.value,
            onUpdate: () => {
                // HTML
                this.$emit("input", this.editor.getHTML());

                // JSON
                // this.$emit('input', this.editor.getJSON())
            },
        });
    },

    beforeDestroy() {
        this.editor.destroy();
    },
});
