import { EditorContent } from '@tiptap/vue-2';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import { Color } from '@tiptap/extension-color';
import CustomLink from 'extensions/CustomLink';
import CustomImage from 'extensions/CustomImage';

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
            type: String|Object,
            default: '',
        },
        options: {
            type: Array,
            default: () => [],
        },
        label: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        output: {
            type: String,
            default: 'html',
        },
        mode: {
            type: String,
            default: 'basic',
        },
    },

    computed: {
        editorOptions() {
            return this.mode === 'full' ? [
                {
                    type: 'set',
                    title: 'Heading',
                    icon: 'heading',
                    children: [
                        {
                            name: 'Heading',
                            title: 'Heading 1',
                            icon: 'h-1',
                            config: {
                                level: 1,
                            }
                        },
                        {
                            name: 'Heading',
                            title: 'Heading 2',
                            icon: 'h-2',
                            config: {
                                level: 2,
                            }
                        },
                        {
                            name: 'Heading',
                            title: 'Heading 3',
                            icon: 'h-3',
                            config: {
                                level: 3,
                            }
                        }
                    ]
                },
                {
                    type: 'Color',
                    icon: 'font-color',
                },
                {
                    name: 'Bold',
                    title: 'Bold',
                    icon: 'bold',
                },
                {
                    name: 'Italic',
                    title: 'Italic',
                    icon: 'italic',
                },
                {
                    name: 'Underline',
                    title: 'Underline',
                    icon: 'underline',
                },
                {
                    name: 'Strike',
                    title: 'Strikethrough',
                    icon: 'strikethrough',
                },
                {
                    type: 'set',
                    title: 'Text Align',
                    icon: 'align-justify',
                    children: [
                        {
                            name: 'TextAlign',
                            title: 'Left',
                            icon: 'align-left',
                            config: {
                                textAlign: 'left',
                            }
                        },
                        {
                            name: 'TextAlign',
                            title: 'Center',
                            icon: 'align-center',
                            config: {
                                textAlign: 'center',
                            }
                        },
                        {
                            name: 'TextAlign',
                            title: 'Right',
                            icon: 'align-right',
                            config: {
                                textAlign: 'right',
                            }
                        },
                        {
                            name: 'TextAlign',
                            title: 'Justify',
                            icon: 'align-justify',
                            config: {
                                textAlign: 'justify',
                            }
                        },
                    ]
                },
                {
                    name: 'OrderedList',
                    title: 'Ordered list',
                    icon: 'list-ordered',
                },
                {
                    name: 'BulletList',
                    title: 'Bullet list',
                    icon: 'list-unordered',
                },
                {
                    type: 'sw-media',
                    name: 'SwMedia',
                    title: 'Media library',
                    icon: 'gallery-line',
                },
                {
                    name: 'Undo',
                    title: 'Undo',
                    icon: 'arrow-go-back-line',
                },
                {
                    name: 'Redo',
                    title: 'Redo',
                    icon: 'arrow-go-forward-line',
                },
                {
                    type: 'link',
                    title: 'Link',
                    icon: 'link',
                }
            ] : this.options;
        }
    },

    data() {
        return {
            editor: null,
            showMediaComponent: false,
        }
    },

    watch: {
        value(value) {
            if (!value) return;

            const isSame = this.output === 'html' ? this.editor.getHTML() === value : JSON.stringify(this.editor.getJSON()) === value.toString();

            if (isSame) return;

            this.editor.commands.setContent(this.value, false);
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.editor = this.actionService.registerEditor(
                [
                    StarterKit,
                    CustomImage,
                    Underline,
                    ListItem,
                    BulletList,
                    OrderedList,
                    TextStyle,
                    Color,
                    CustomLink.configure({
                        openOnClick: false,
                        linkOnPaste: false,
                    }),
                    TextAlign.configure({
                        types: ['heading', 'paragraph', 'image'],
                        alignments: ['left', 'center', 'right', 'justify'],
                    }),
                    Placeholder.configure({
                        placeholder: this.placeholder,
                    }),
                ],
                this.output === 'json' ? JSON.parse(this.value) : this.value,
                () => {
                    this.$emit('input', this.output === 'json' ? JSON.stringify(this.editor.getJSON()) : this.editor.getHTML())
                },
            )
        },

        onMediaOpen() {
            this.showMediaComponent = true;
        },

        onAddMedia(media) {
            if (isEmpty(media)) {
                return;
            }

            media.forEach((item) => {
                setTimeout(() => {
                    this.editor.chain().focus().setImage({ src: item.url }).run();
                }, 10);
            })
        }
    },

    destroyed() {
        this.editor.destroy();
    },
})
