'use strict';

let availableRowCount;
let ingredients;

class Ingredients {
    constructor(itemPerRow) {
        this._itemPerRow = itemPerRow;
        this._currentItemCount = 0;
    }

    get itemPerRow() {
        return this._itemPerRow;
    }

    set itemPerRow(value) {
        this._itemPerRow = value;
    }

    get currentItemCount() {
        return this._currentItemCount;
    }

    set currentItemCount(value) {
        this._currentItemCount = value;
    }

    get currentRowCount() {
        return this._currentItemCount / this._itemPerRow;
    }

    decRow() {
        this._currentItemCount -= this._itemPerRow;
    }
}

let ingredientList = [];

const updatePageBar = container => {
    const rowCount = container.find('.row').length;
    const maxRowCount = Math.ceil(ingredientList.length / ingredients.itemPerRow);
    const firstIndex = container.find('.row:first > .tooltipped:first').data('index');
    const lastIndex = container.find('.row:last > .tooltipped:last').data('index');

    $('#pagebar .clickable:first').toggleClass('disable', firstIndex === 0);
    $('#pagebar .clickable:last').toggleClass('disable', lastIndex + 1 >= ingredientList.length);
    $('#ingredients > div:last-child').toggleClass('hidden', rowCount >= maxRowCount);
};

const ingredientRowItem = (item, index, arr) => {
    const isEven = index % ingredients.itemPerRow === 0;
    const nextIndex = index + 1;
    const nextIndexLast = nextIndex === arr.length;

    return `
        ${index === 0 || isEven ? '<div class="row valign-wrapper">' : ''}
        <div class="col ${isEven ? 'offset-s2' : ''} s2 tooltipped" data-index=${index} 
             data-position="top" data-tooltip="I'm ${item.name}. Drag me!">
            <a id="${item.id}" href="#" class="col s12 clickable" data-glass="${item.glass}">
                <img src="${item.table}" alt=""/>
            </a>
        </div>
        <div class="col ${nextIndexLast && isEven ? 's8' : 's3'}">
            <h5>${item.name}</h5>
            <p class="truncate">${item.description}</p>
        </div>
        ${nextIndexLast || nextIndex % ingredients.itemPerRow === 0 ? 
            "</div>" : 
            ingredientRowItem(arr[nextIndex], nextIndex, arr)}`;
};
/*
                <object type="image/svg+xml" data="${item.url}">
                    <img src="${item.url}" alt=""/>
                </object>

*/
const getChangesCount = () => {
    const container = $('#ingredients > div:first-child');
    const rowHeight = container.find('.row:first-child').outerHeight(true);
    const parentHeight = $('#ingredients').height();

    return Math.floor(parentHeight / rowHeight) - container.find('.row').length - 1;
};

const getAvailableRowCount = container => 
    Math.floor($('#ingredients').height() / container.find('.row:first-child').outerHeight(true)) - 1;

const loadIngredients = async (items, startPos = 0, emptied = true) => {
    const container = $('#ingredients > div:first-child');

    if (emptied) {
        container.empty();
    }

    for (let i = Math.max(0, startPos), j = 0; i < items.length; i += ingredients.itemPerRow, j++) {
        await $(ingredientRowItem(items[i], i, items))
            .hide()
            .appendTo(container)
            .fadeIn(800)
            .find('.clickable')
            .draggable({
                helper: 'clone',
                revert: 'invalid',
                revertDuration: 200,
                zIndex: 100,
                drag: (e, ui) => $(ui.helper).width($(e.target).outerWidth(true))
            }).promise();

        if (!j) {
            availableRowCount = getAvailableRowCount(container);
        }

        if (j + 1 + (emptied ? 0 : ingredients.currentRowCount) === availableRowCount) {
            ingredients.currentItemCount = availableRowCount * ingredients.itemPerRow;

            break;
        }
    }

    if ($('#pagebar').length) {
        updatePageBar(container);
    } else {
        $('#ingredients').append($('<div>').load('parts/pagebar.html', () => {
            $('#pagebar .clickable').click(e => {
                const item = $(e.target);

                if (!item.hasClass('disable')) {
                    const direction = item.data('direction');
                    const itemCount = getAvailableRowCount(container) * ingredients.itemPerRow;

                    loadIngredients(ingredientList, direction === -1 ?
                        (Math.ceil(container.find('.tooltipped:first').data('index') / itemCount) - 1) * itemCount :
                        container.find('.tooltipped:last').data('index') + 1);
                }
            });

            updatePageBar(container);
        }));
    }
    //--all browsers!
};

const getIngredients = () => {
    $.ajax({
            type: 'GET',
            url: '/api/ingredients',
            dataType: 'json',
            cache: false
        })
        .always((data, status) => {
            if (status === 'success') {
                ingredientList = data.ingredients;
            }

            ingredients = new Ingredients(2);
            loadIngredients(ingredientList);
        });
};

$(document).ready(() => {
    const loadScripts = async () => {
        await $.getScript('js/materialize/materialize.min.js', () => {
            $('.sidenav').sidenav();
            $('.tooltipped').tooltip();
            $('.modal').modal();
        });

        await $.getScript('js/jquery/jquery-ui.min.js');
    };

    loadScripts()
        .then(() => {
            $('#glass .layer')
                .droppable({
                    tolerance: 'pointer',
                    accept: drag => $(drag).hasClass('clickable'),
                    drop: (e, ui) => {
                        const glass = $(ui.draggable).data('glass');
                        const item = $(e.target);

                        if (glass) {
                            $(item)
                                .find('.layer-ingredient')
                                .css('background-image', `url("${glass}")`).addClass('tooltipped').attr({
                                        ['data-position']: 'bottom',
                                        ['data-tooltip']: 'tooltip'
                                    });
                            $(item)
                                .find('.layer-cross')
                                .removeClass('hidden');
                        }
                    }
                });

            getIngredients();
        });

    $('.layer-cross').click(e => {
        const item = $(e.target);
        $(item).prev().css('background-image', '');
        $(item).prev().removeClass('tooltipped');
        $(item).addClass('hidden');

    });
});

$(window).resize(() => {
    let changesCount = getChangesCount();

    if (changesCount) {
        const container = $('#ingredients > div:first-child');

        if (changesCount < 0) {
            while (changesCount) {
                container.find('.row:last-child').remove();
                ingredients.decRow();
                changesCount++;
            }

            updatePageBar(container);
        } else {
            loadIngredients(ingredientList,
                container.find('.row:first > .tooltipped:first').data('index') +
                ingredients.currentItemCount,
                false);
                
            changesCount--;
        }
    }
});