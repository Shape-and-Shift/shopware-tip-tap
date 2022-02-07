import template from './sas-image-component.html.twig';
import './sas-image-component.scss';

import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-2';

import VueDraggableResizable from 'vue-draggable-resizable';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';

Shopware.Component.register('sas-image-component', {
    template,

    components: {
        'vue-draggable-resizable': VueDraggableResizable,
        NodeViewWrapper
    },

    props: nodeViewProps,

    computed: {
        align() {
            return this.node.attrs.textAlign || 'left';
        },
        src: {
            get() {
                return this.node.attrs.src;
            },
            set(src) {
                this.updateAttributes({src});
            }
        },
        width: {
            get() {
                return parseInt(this.node.attrs.width);
            },
            set(width) {
                this.updateAttributes({
                    width
                });
            }
        },
        height: {
            get() {
                return parseInt(this.node.attrs.height);
            },
            set(height) {
                this.updateAttributes({
                    height
                });
            }
        }
    },

    methods: {
        onResize(x, y, width, height) {
            this.width = width;
            this.height = height;
        }
    }
});