import template from './sas-menu-popover.html.twig';
import './sas-menu-popover.scss';

const { Component } = Shopware;

Component.register('sas-menu-popover', {
    template,

    props: {
        icon: {
            type: String,
            required: true
        },
    },

    data() {
        return {
            visible: false,
        }
    },

    methods: {
        onMenuToggle() {
            this.visible = !this.visible;
            this.$emit('menu-toggle', this.visible);
        },

        onMenuHide() {
            this.visible = false;
        }
    }
});
