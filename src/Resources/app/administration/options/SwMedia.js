import Option from './Option.js';

export default class SwMedia extends Option {
    constructor (icon, title, editor, config) {
        super(icon, title);
        this.action = config.action;
    }
};