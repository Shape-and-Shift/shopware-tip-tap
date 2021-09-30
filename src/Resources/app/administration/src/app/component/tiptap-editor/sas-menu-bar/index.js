import template from './sas-menu-bar.html.twig';
import './sas-menu-bar.scss';

const { Component } = Shopware;

Component.register('sas-menu-bar', {
    template,

    props: {
        editor: {
            type: Object,
            required: true,
        },
        options: {
            type: Array,
            default: []
        }
    },

    computed: {
        toolbar() {
            return this.options.map(option => {
                // let actions = this.editor.chain().focus();
                // if (Array.isArray(option.action)) {
                //     option.action.forEach(item => {
                //         actions = actions[item](option.level ? { level: option.level } : {});
                //     })
                // } else {
                //     actions = actions[opion.action]();
                // }
                if (option.type === 'divider') {
                    return option;
                }

                return {
                    icon: option.icon,
                    title: option.title,
                    action: () => this.editor.chain().focus()[option.action](option.level ? { level: option.level } : {}).run(),
                    isActive: () => this.editor.isActive(option.key, option.level ? { level: option.level } : {}),
                }
            });
        }
    },

    created() {
        console.log(this.editor, 111);
    },

    data() {
        return {
            items: [
                {
                    icon: 'bold',
                    title: 'Bold',
                    action: () => this.editor.chain().focus().toggleBold().run(),
                    isActive: () => this.editor.isActive('bold'),
                },
                {
                    icon: 'italic',
                    title: '',
                    action: () => this.editor.chain().focus().toggleItalic().run(),
                    isActive: () => this.editor.isActive('italic'),
                },
                {
                    icon: 'strikethrough',
                    title: 'Strike',
                    action: () => this.editor.chain().focus().toggleStrike().run(),
                    isActive: () => this.editor.isActive('strike'),
                },
                {
                    icon: 'code-view',
                    title: 'Code',
                    action: () => this.editor.chain().focus().toggleCode().run(),
                    isActive: () => this.editor.isActive('code'),
                },
                {
                    type: 'divider',
                },
                {
                    icon: 'h-1',
                    title: 'Heading 1',
                    action: () => this.editor.chain().focus().toggleHeading({ level: 1 }).run(),
                    isActive: () => this.editor.isActive('heading', { level: 1 }),
                },
                {
                    icon: 'h-2',
                    title: 'Heading 2',
                    action: () => this.editor.chain().focus().toggleHeading({ level: 2 }).run(),
                    isActive: () => this.editor.isActive('heading', { level: 2 }),
                },
                {
                    icon: 'paragraph',
                    title: 'Paragraph',
                    action: () => this.editor.chain().focus().setParagraph().run(),
                    isActive: () => this.editor.isActive('paragraph'),
                },
                {
                    icon: 'list-unordered',
                    title: 'Bullet List',
                    action: () => this.editor.chain().focus().toggleBulletList().run(),
                    isActive: () => this.editor.isActive('bulletList'),
                },
                {
                    icon: 'list-ordered',
                    title: 'Ordered List',
                    action: () => this.editor.chain().focus().toggleOrderedList().run(),
                    isActive: () => this.editor.isActive('orderedList'),
                },
                {
                    icon: 'code-box-line',
                    title: 'Code Block',
                    action: () => this.editor.chain().focus().toggleCodeBlock().run(),
                    isActive: () => this.editor.isActive('codeBlock'),
                },
                {
                    type: 'divider',
                },
                {
                    icon: 'double-quotes-l',
                    title: 'Blockquote',
                    action: () => this.editor.chain().focus().toggleBlockquote().run(),
                    isActive: () => this.editor.isActive('blockquote'),
                },
                {
                    icon: 'separator',
                    title: 'Horizontal Rule',
                    action: () => this.editor.chain().focus().setHorizontalRule().run(),
                },
                {
                    type: 'divider',
                },
                {
                    icon: 'text-wrap',
                    title: 'Hard Break',
                    action: () => this.editor.chain().focus().setHardBreak().run(),
                },
                {
                    icon: 'format-clear',
                    title: 'Clear Format',
                    action: () => this.editor.chain()
                        .focus()
                        .clearNodes()
                        .unsetAllMarks()
                        .run(),
                },
                {
                    type: 'divider',
                },
                {
                    icon: 'arrow-go-back-line',
                    title: 'Undo',
                    action: () => this.editor.chain().focus().undo().run(),
                },
                {
                    icon: 'arrow-go-forward-line',
                    title: 'Redo',
                    action: () => this.editor.chain().focus().redo().run(),
                },
                {
                    type: 'component',
                    name: 'sw-media-modal-v2',
                    icon: 'gallery-fill',
                    title: 'Media Library',
                    action: () => this.$emit('media-open'),
                }
            ],
        }
    }
});
