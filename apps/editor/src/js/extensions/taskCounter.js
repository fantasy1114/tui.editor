/**
 * @fileoverview Implements Task counter
 * @author Sungho Kim(sungho-kim@nhnent.com) FE Development Team/NHN Ent.
 */

const extManager = require('../extManager');

const FIND_TASK_RX = /^\s*\* \[[xX ]\] [^\n]*/mg;
const FIND_CHECKED_TASK_RX = /^\s*\* \[[xX]\] [^\n]*/mg;

extManager.defineExtension('taskCounter', editor => {
    editor.getTaskCount = () => {
        let found, count;

        if (editor.isViewOnly()) {
            count = editor.preview.$el.find('.task-list-item').length;
        } else if (editor.isMarkdownMode()) {
            found = editor.mdEditor.getValue().match(FIND_TASK_RX);
            count = found ? found.length : 0;
        } else {
            count = editor.wwEditor.get$Body().find('.task-list-item').length;
        }

        return count;
    };

    editor.getCheckedTaskCount = () => {
        let found, count;

        if (editor.isViewOnly()) {
            count = editor.preview.$el.find('.task-list-item.checked').length;
        } else if (editor.isMarkdownMode()) {
            found = editor.mdEditor.getValue().match(FIND_CHECKED_TASK_RX);
            count = found ? found.length : 0;
        } else {
            count = editor.wwEditor.get$Body().find('.task-list-item.checked').length;
        }

        return count;
    };
});
