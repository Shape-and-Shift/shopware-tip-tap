import template from './sas-menu-link.html.twig';
import './sas-menu-link.scss';

const { Component } = Shopware;
const domainPlaceholderId = '124c71d524604ccbad6042edce3ac799';

Component.register('sas-menu-link', {
    template,

    props: {
        icon: {
            type: String,
            required: true
        },
        editor: {
            type: Object,
            required: true
        },
    },

    data() {
        return {
            link: null,
            newTab: false,
            displayAsButton: false,
            selectedVariant: null,
            buttonVariantList: [
                {
                    id: 'primary',
                    name: this.$tc('sw-text-editor-toolbar.link.buttonVariantPrimary'),
                },
                {
                    id: 'secondary',
                    name: this.$tc('sw-text-editor-toolbar.link.buttonVariantSecondary'),
                },
                {
                    id: 'primary-sm',
                    name: this.$tc('sw-text-editor-toolbar.link.buttonVariantPrimarySmall'),
                },
                {
                    id: 'secondary-sm',
                    name: this.$tc('sw-text-editor-toolbar.link.buttonVariantSecondarySmall'),
                },
            ],
        }
    },

    methods: {
        onRemoveLink() {
            this.editor.commands.unsetLink();
        },

        onAddLink() {
            if (!this.link) return;

            const properties = { href: this.prepareLink(this.link) };
            if (this.newTab) {
                properties.target = '_blank';
            }

            if (this.selectedVariant) {
                properties.class = `btn btn-${this.selectedVariant}`;
            }

            this.editor.commands.setLink(properties);
        },

        prepareLink(link) {
            link = link.trim();

            if (!link.startsWith(domainPlaceholderId)) {
                link = this.addProtocol(link);
            }

            return link;
        },

        addProtocol(link) {
            if (/(^(\w+):\/\/)|(mailto:)|(fax:)|(tel:)/.test(link)) {
                return link;
            }

            const isInternal = /^\/[^\/\s]/.test(link);
            const isAnchor = link.substring(0, 1) === '#';
            const isProtocolRelative = /^\/\/[^\/\s]/.test(link);

            if (!isInternal && !isAnchor && !isProtocolRelative) {
                link = `http://${link}`;
            }

            return link;
        },

        onMenuToggle() {
            this.link = this.editor.getAttributes('link')?.href;
            this.newTab = false;
            this.selectedVariant = false;
        }
    }
});
