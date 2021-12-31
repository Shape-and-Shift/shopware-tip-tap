import template from './sas-menu-item.html.twig';
import './sas-menu-item.scss';

const { Component } = Shopware;

Component.register('sas-menu-item', {
    template,

    computed: {
        item() {
            return { ...this.$attrs };
        }
    },
});
