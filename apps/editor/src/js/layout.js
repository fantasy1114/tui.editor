/**
 * @fileoverview
 * @author FE개발팀 김성호 sungho-kim@nhnent.com
 */

'use strict';

var Toolbar = require('./toolbar.js');

/**
 * Layout
 * @exports Layout
 * @extends {}
 * @constructor
 * @class
 */
function Layout(options, eventManager, commandManager) {
    this.$el = $(options.el);
    this.previewStyle = options.previewStyle === 'tab' ? 'tab' : 'column';
    this.height = options.height;
    this.eventManager = eventManager;
    this.commandManager = commandManager;
}

Layout.prototype.init = function() {
    console.log('Layout Init');

    this.$containerEl = this._initContainerEl();

    this.toolbar = new Toolbar(this.eventManager, this.commandManager);
    this.$containerEl.append(this.toolbar.$el);

    if (this.previewStyle === 'tab') {
        this._initTabEl();
    }

    this.$editorContainerEl = this._initEditorEl();
    this.$previewEl = this._initPreviewEl();
};

Layout.prototype._initContainerEl = function() {
    return $('<div>')
        .addClass('editor-container')
        .addClass('preview-style-' + this.previewStyle)
        .appendTo(this.$el);
};

Layout.prototype._initTabEl = function() {
    var self = this;
    var $editorButton = $('<button type="button" class="active">Editor</button>');
    var $previewButton = $('<button type="button">Preview</button>');

    $editorButton.on('click', function() {
        self.$editorContainerEl.addClass('active');
        self.$previewEl.removeClass('active');
        $editorButton.addClass('active');
        $previewButton.removeClass('active');
    });

    $previewButton.on('click', function () {
        self.$editorContainerEl.removeClass('active');
        self.$previewEl.addClass('active');
        $editorButton.removeClass('active');
        $previewButton.addClass('active');
    });

    return $('<div>')
        .addClass('tab')
        .append($editorButton)
        .append($previewButton)
        .appendTo(this.$containerEl);
};

Layout.prototype._initEditorEl = function() {
    return $('<div>')
        .addClass('editor')
        .addClass('active')
        .height(this.height)
        //.attr('contenteditable', 'true')
        .appendTo(this.$containerEl);
};

Layout.prototype._initPreviewEl = function() {
    return $('<div>')
        .addClass('preview')
        .height(this.height)
        .appendTo(this.$containerEl);
};

Layout.prototype.getEditorEl = function() {
    return this.$containerEl;
};

Layout.prototype.getPreviewEl = function() {
    return this.$previewEl;
};

Layout.prototype.getStatusbarLeftAreaEl = function() {
    return this.$statusbarLeftAreaEl;
};

Layout.prototype.getStatusbarRightAreaEl = function() {
    return this.$statusbarRightAreaEl;
};

Layout.prototype.getEditorContainerEl = function() {
    return this.$editorContainerEl;
};

module.exports = Layout;
