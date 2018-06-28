import $ from 'jquery';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';
import 'materialize-css/dist/js/materialize.min';
import domtoimage from 'dom-to-image';

import Ingredients from './Ingredients';

const INGREDIENTS_CONTAINER = $('#ingredients');

let availableRowCount;
let ingredients;

let ingredientList = [];

const updatePageBar = container => {
    const rowCount = container.find('.row').length;
    const maxRowCount = Math.ceil(ingredientList.length / ingredients.itemPerRow);
    const firstIndex = container.find('.row:first > .tooltipped:first').data('index');
    const lastIndex = container.find('.row:last > .tooltipped:last').data('index');

    $('#pagebar .clickable:first').toggleClass('disable', firstIndex === 0);
    $('#pagebar .clickable:last').toggleClass('disable', lastIndex + 1 >= ingredientList.length);
    $('#pagebar').toggleClass('hidden', rowCount >= maxRowCount);
};

const ingredientRowItem = (item, index, arr) => {
    const isEven = index % ingredients.itemPerRow === 0;
    const nextIndex = index + 1;
    const nextIndexLast = nextIndex === arr.length;

    return `
        ${index === 0 || isEven ? '<div class="row valign-wrapper">' : ''}
        <div class="col ${isEven ? 'offset-s2' : ''} s2 tooltipped" data-index=${index}
             data-position="top" data-tooltip="Drag me!">
            <a id="${item.id}" href="#" class="col s12 clickable" data-name="${item.name}" data-glass="${item.glass}">
                <img src="${item.table}" alt=""/>
            </a>
        </div>
        <div class="col ${nextIndexLast && isEven ? 's8' : 's3'}">
            <h5 class="ingredient__header">${item.name}</h5>
            <p class="truncate">${item.description}</p>
        </div>
        ${nextIndexLast || nextIndex % ingredients.itemPerRow === 0 ?
            '</div>' :
            ingredientRowItem(arr[nextIndex], nextIndex, arr)}`;
};

const getChangesCount = () => {
    const container = INGREDIENTS_CONTAINER;
    const rowHeight = container.find('.row:first-child').outerHeight(true);
    const parentHeight = $('#table').height();

    return Math.floor(parentHeight / rowHeight) - container.find('.row').length - 1;
};

const getAvailableRowCount = container =>
    Math.floor($('#table').height() / container.find('.row:first-child').outerHeight(true)) - 1;

const loadIngredients = async (items, startPos = 0, emptied = true) => {
    const container = INGREDIENTS_CONTAINER;

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

    updatePageBar(container);

    activateTooltips();
};

const getIngredients = () => {
    return $.ajax({
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

const clearLayers = item => {
    $(item)
        .addClass('hidden')
        .prev().css('background-image', '')
        .removeClass('hoverable tooltipped')
        .tooltip('remove');

    if ($('.layer-cross').length === $('.layer-cross[class~=hidden]').length) {
        $('.glass-btns > a').addClass('disable');
    }
};

function activateTooltips() {
    $('.tooltipped').tooltip();
}

async function initialize() {
    try {
        await getIngredients();
    } catch ({ cause, message }) {
        console.log('ERROR:', cause, message);

        alert('Sorry, something went wrong. Try reloading the page or using another browser.');
    } finally {
        $('.modal').modal();

        $('#glass .layer')
            .droppable({
                tolerance: 'pointer',
                accept: drag => $(drag).hasClass('clickable'),
                drop: (e, ui) => {
                    const item = $(e.target);
                    const glass = $(ui.draggable);

                    if (glass) {
                        item
                            .find('.layer-ingredient')
                            .css('background-image', `url("${glass.data('glass')}")`)
                            .addClass('tooltipped hoverable')
                            .attr({
                                ['data-position']: 'right',
                                ['data-tooltip']: `${glass.data('name')}`
                            });

                        activateTooltips();

                        item
                            .find('.layer-cross')
                            .removeClass('hidden');

                        $('.glass-btns >a').removeClass('disable');
                    }
                }
            });

        $('#pagebar .clickable').click(e => {
            const container = INGREDIENTS_CONTAINER;

            const item = $(e.target);
            const direction = item.data('direction');
            const itemCount = getAvailableRowCount(container) * ingredients.itemPerRow;

            loadIngredients(ingredientList,
                direction === -1 ?
                (Math.ceil(container.find('.tooltipped:first').data('index') / itemCount) - 1) * itemCount :
                container.find('.tooltipped:last').data('index') + 1);
        });

        $('.layer-cross').click(e => clearLayers(e.target));

        $('#clear').click(() => clearLayers('.layer-cross:not(.hidden)'));

        $('#preview').click(() => {
            $('#image-preview').prop('src', '');

            domtoimage.toPng($('#glass')[0], {
                    filter: node => !$(node).hasClass('clickable')
                })
                .then(dataUrl => {
                    $('#image-preview').prop('src', dataUrl);
                })
                .catch(error => {
                    console.error('Oops, something went wrong!', error);
                });
        });

        $('#download').click(() => {
            const img = $('#image-preview').clone();

            const a = $('<a>')
                .prop('href', img.prop('src'))
                .prop('download', 'cocktail.png')
                .append(img);

            img.click();
            a.remove();

            $('#preview-modal').modal('close');
        });

        $('#btn-clear').click(() => {
            $('#clear').click();
            $('#preview-modal').modal('close');
        });
    }
}

function updateTable() {
    let changesCount = getChangesCount();

    if (changesCount) {
        const container = INGREDIENTS_CONTAINER;

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
}

export {
    initialize,
    updateTable
};