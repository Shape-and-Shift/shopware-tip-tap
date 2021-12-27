# Description
A plugin to intergrate Tiptap editor into Shopware.

# Installation
For development purpose, I suggest using `https://github.com/shopware/platform`.

Clone this plugin into your `custom/plugins` folder and install it like a normal plugin.

# Usage
A component with tag `sas-tiptap-editor` is available to use.

```html
<sas-tiptap-editor
    :options="editorOptions"
    :value="currentValue"
    @input="updateCurrentValue"
/>
```

with `options` props you can set the toolbar options for the editor. An example of the options is:

```js
editorOptions: [
    {
        name: 'Bold',
        title: 'Bold',
        icon: 'bold',
    },
    {
        name: 'Italic',
        title: 'Italic',
        icon: 'italic',
    }
]
```

An option must provide `name`, `icon` properties in order to work.

All available options are still in development. You can find it in `shopware-tip-tap/src/Resources/app/administration/options`. We can create more options here.