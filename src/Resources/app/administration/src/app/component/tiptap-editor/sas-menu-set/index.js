import template from './sas-menu-set.html.twig';
import './sas-menu-set.scss';

const { Component } = Shopware;

Component.extend('sas-menu-set', 'sas-menu-bar', {
    template,

    props: {
        icon: {
            type: String,
            required: true
        },
        options: {
            type: Array,
            default: []
        }
    },

    data() {
        return {
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
