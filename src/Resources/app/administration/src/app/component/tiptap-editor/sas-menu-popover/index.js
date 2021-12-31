import template from './sas-menu-popover.html.twig';
import './sas-menu-popover.scss';
import remixicon from 'remixicon/fonts/remixicon.symbol.svg';

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
            icons: remixicon,
            visible: false,
        }
    },

    methods: {
        onMenuToggle() {
            this.visible = !this.visible;
        },

        onMenuHide() {
            this.visible = false;
        }
    }
});
