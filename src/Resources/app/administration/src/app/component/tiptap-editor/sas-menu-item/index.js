import template from './sas-menu-item.html.twig';
import './sas-menu-item.scss';

const { Component } = Shopware;

Component.register('sas-menu-item', {
    template,

    props: {
        icon: {
            type: String,
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        action: {
            type: Function,
            required: true,
        },

        isActive: {
            type: Function,
            default: null,
        },
    },
});
