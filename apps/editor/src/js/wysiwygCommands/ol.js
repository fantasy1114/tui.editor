/**
 * @fileoverview Implements WysiwygCommand
 * @author Sungho Kim(sungho-kim@nhnent.com) FE Development Team/NHN Ent.
 */

'use strict';

var CommandManager = require('../commandManager');

/**
 * OL
 * Add OL to selected wysiwyg editor content
 * @exports OL
 * @augments Command
 * @augments WysiwygCommand
 */
var OL = CommandManager.command('wysiwyg', /** @lends OL */{
    name: 'OL',
    keyMap: ['CTRL+O', 'CTRL+O'],
    /**
     *  커맨드 핸들러
     *  @param {WysiwygEditor} wwe WYsiwygEditor instance
     */
    exec: function(wwe) {
        var sq = wwe.getEditor();

        if (sq.getSelection().collapsed && !sq.hasFormat('TABLE')) {
            wwe.unwrapBlockTag();
            sq.makeOrderedList();
        }

        sq.focus();
    }
});

module.exports = OL;
