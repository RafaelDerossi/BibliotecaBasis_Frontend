export const ConfigurationEditor = {
  language: "pt-br",
  height: 200,
  extraPlugins: "copyformatting,colorbutton,justify,font",
  removePlugins: "elementspath,imagebase,image2,easyimage",
  uiColor: "#E8E4E4",
  resize_enabled: false,
  exportpdf: true,
  fontSize: {
    options: [
      9,
      11,
      13,
      "default",
      17,
      19,
      21
    ]
  },

  toolbarGroups: [
    // { "name": 'styles', "groups": ['Styles', 'Format', 'Font', 'FontSize'] },
    // { "name": 'colors' },
    {
      "name": "basicstyles",
      "groups": ["basicstyles", "Colors", "Format", "Font", "FontSize", "Styles"]
    },
    {
      "name": "colors",
      "groups": ["colors"]
    },
    {
      "name": "paragraph",
      "groups": ["list", "indent", "blocks", "align", "bidi"]
    },
    {
      "name": "styles",
      "groups": ["styles", "fontsize"]
    },
    {
      "name": "clipboard",
      "groups": ["clipboard", "undo"]
    },
    {
      "name": "links",
      "groups": ["links"]
    },
    {
      "name": "mathtype",
      "groups": ["mathtype"]
    },
    // {
    //   "name": "document",
    //   "groups": ["mode", "source"]
    // },
    {
      "name": "insert",
      "groups": ["insert"]
    },

    {
      "name": "editing",
      "groups": ["find", "selection", "spellchecker", "editing"]
    },
    {
      "name": "exportpdf"
    },
  ]
};
