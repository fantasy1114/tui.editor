/**
 * @fileoverview Implements convertor for tui.grid
 * @author Jiung Kang(jiung.kang@nhnent.com) FE Development Lab/NHN Ent.
 */

import parser from './parser';

const util = tui.util;

const COLUMN_NAME_PREFIX = 'grid-column-';
const DEFAULT_OPTION = {
    toolbar: null,
    autoNumbering: false,
    rowHeight: 30
};

/**
 * Convertor for tui.grid
 * @module convertor
 * @type {object}
 */
const convertor = {
    /**
     * Create columnModelList for grid data.
     * @memberOf module:convertor
     * @param {object} header - parsed header data
     * @param {boolean} isEditMode - whether edit mode or not.
     * @returns {Array.<object>}
     * @private
     */
    _createColumnModelList(header, isEditMode) {
        const editOption = {
            type: isEditMode ? 'text' : 'normal'
        };

        return header.map((headerItem, index) => util.extend({}, headerItem, {
            editOption,
            columnName: COLUMN_NAME_PREFIX + index
        }));
    },

    /**
     * Create rowList for grid data.
     * @memberOf module:convertor
     * @param {object} body - parsed body data
     * @returns {Array.<object>}
     * @private
     */
    _createRowList(body) {
        return body.map(line => {
            const rowItem = {};

            line.forEach((cell, index) => {
                rowItem[COLUMN_NAME_PREFIX + index] = cell.data;
            });

            return rowItem;
        });
    },

    /**
     * Create conditional options.
     * @memberOf module:convertor
     * @param {number} rowCount - row count of grid data
     * @param {number} rowHeight - row height user option
     * @returns {object}
     * @private
     */
    _createConditionalOptions(rowCount, rowHeight) {
        const conditionalOptions = {};

        if (rowCount > 10) {
            rowHeight = rowHeight || (DEFAULT_OPTION.rowHeight + 2);
            conditionalOptions.bodyHeight = 10 * rowHeight;
            conditionalOptions.isFixedHeight = true;
        } else {
            conditionalOptions.scrollY = false;
        }

        return conditionalOptions;
    },

    /**
     * Create options for creating grid.
     * @memberOf module:convertor
     * @param {object} userOptions - user defined options
     * @param {number} rowCount - row count of grid data
     * @returns {object}
     * @private
     */
    _createOptions(userOptions, rowCount) {
        const conditionalOptions = this._createConditionalOptions(rowCount, userOptions.rowHeight);

        return util.extend({}, DEFAULT_OPTION, conditionalOptions, userOptions);
    },

    /**
     * Convert code text to grid data.
     * @memberOf module:convertor
     * @param {string} codeText - code text
     * @param {boolean} isEditMode - whether edit mode or not.
     * @returns {{options: object, columnModelList: Array.<object>, rowList: Array.<object>}}
     */
    convertToGridData(codeText, isEditMode) {
        const parsedData = parser.parseCodeText(codeText);
        const columnModelList = this._createColumnModelList(parsedData.data.header, isEditMode);
        const rowList = this._createRowList(parsedData.data.body);
        const options = this._createOptions(parsedData.options, parsedData.data.body.length);

        return {
            options,
            columnModelList,
            rowList
        };
    }
};

export default convertor;