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
    type: 'set',
    title: 'Heading',
    icon: 'heading',
    children: [
      {
        name: 'Heading',
        title: 'Heading 1',
        icon: 'h-1',
        config: {
          level: 1,
        }
      },
      {
        name: 'Heading',
        title: 'Heading 2',
        icon: 'h-2',
        config: {
          level: 2,
        }
      },
      {
        name: 'Heading',
        title: 'Heading 3',
        icon: 'h-3',
        config: {
          level: 3,
        }
      }
    ]
  },
  {
    type: 'Color',
    icon: 'font-color',
  },
  {
    name: 'Bold',
    title: 'Bold',
    icon: 'bold',
  },
  {
    name: 'Italic',
    title: 'Italic',
    icon: 'italic',
  },
  {
    name: 'Underline',
    title: 'Underline',
    icon: 'underline',
  },
  {
    name: 'Strike',
    title: 'Strikethrough',
    icon: 'strikethrough',
  },
  {
    type: 'set',
    title: 'Text Align',
    icon: 'align-justify',
    children: [
      {
        name: 'TextAlign',
        title: 'Left',
        icon: 'align-left',
        config: {
          textAlign: 'left',
        }
      },
      {
        name: 'TextAlign',
        title: 'Center',
        icon: 'align-center',
        config: {
          textAlign: 'center',
        }
      },
      {
        name: 'TextAlign',
        title: 'Right',
        icon: 'align-right',
        config: {
          textAlign: 'right',
        }
      },
      {
        name: 'TextAlign',
        title: 'Justify',
        icon: 'align-justify',
        config: {
          textAlign: 'justify',
        }
      },
    ]
  },
  {
    name: 'OrderedList',
    title: 'Ordered list',
    icon: 'list-ordered',
  },
  {
    name: 'BulletList',
    title: 'Bullet list',
    icon: 'list-unordered',
  },
  {
    type: 'sw-media',
    name: 'SwMedia',
    title: 'Media library',
    icon: 'gallery-line',
  },
  {
    name: 'Undo',
    title: 'Undo',
    icon: 'arrow-go-back-line',
  },
  {
    name: 'Redo',
    title: 'Redo',
    icon: 'arrow-go-forward-line',
  },
  {
    type: 'link',
    title: 'Link',
    icon: 'link',
  }
]
```

Too long? You can set `mode` prop to `full` and all available options will show up.

With `set` as a type, you can create a dropdown menu of many items.

An option must provide `name`, `icon` properties in order to work.

All available options are still in development. You can find it in `shopware-tip-tap/src/Resources/app/administration/options`. We can create more options here.

# Add new options
An example of an option:

```js
import Option from './Option.js';

export default class Bold extends Option {
  constructor (icon, title, editor) {
    super(icon, title);
    this.action = () => editor.chain().focus().toggleBold().run();
    this.isActive = () => editor.isActive('bold');
  }
};
```
With option class, what essential you need to do is to provide `super(icon, title);`.  With an `action` property that you can provide whatever logic that you want to execute when the option is clicked.

We also provide `config` property for you to pass in data that you want to use. You can receive it as a param of the constructor funtion.

```js
constructor (icon, title, editor, config) 
{
    super(icon, title);
    this.action = () => localStorage.setItem('tiptap-editor-config', config);
}
```
