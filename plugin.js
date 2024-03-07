tinymce.PluginManager.add('addborder', function (editor, url) {
    var pluginName = '添加边框';
    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var doAct = function () {
        var blocks = editor.selection.getSelectedBlocks();
        global$1.each(blocks, (block) => {
            if (block.innerHTML.indexOf('border') != -1) {
                let str = blocks[0].innerHTML.replace(/<span [^>]*>/g, '').replace(/<\/span>/g, '');
                let p = document.createElement('p');
                p.innerHTML = str
            } else {
                const content = editor.selection.getContent();
                if (content) {
                    const spanNode = `<span has-border="true" style="border:1px solid black;">${content}</span>`
                    editor.insertContent(spanNode);
                }
            }
        })
    };

    editor.ui.registry.addIcon('addborder', '边框');

    var stateSelectorAdapter = function (editor, selector) {
        return function (buttonApi) {
            return editor.selection.selectorChangedWithUnbind(selector.join(','), buttonApi.setActive).unbind;
        };
    };

    editor.ui.registry.addToggleButton('addborder', {
        icon: 'addborder',
        tooltip: pluginName,
        onAction: function () {
            doAct();
        },
        onSetup: stateSelectorAdapter(editor, [
            '*[data-mce-style*="border"]',
        ]),
    });

    editor.ui.registry.addMenuItem('addborder', {
        text: pluginName,
        onAction: function () {
            doAct();
        }
    });

    editor.addCommand('addborder', doAct);

    return {
        getMetadata: function () {
            return {
                name: pluginName,
                url: "",
            };
        }
    };
});
