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

const ingredientList = [{
    name: 'Stone1',
    description: 'Sgdfg hghgfd ggfdsgfh gfgf dgfg gfdgf gfdgf gfdgdf',
    url: '../img/svg/stone.svg'
}, {
    name: 'Stone2',
    description: 'Sgdfg hghgfd ggfdsgfh gfgf dgfg gfdgf gfdgf gfdgdf',
    url: '../img/svg/stone.svg'
}, {
    name: 'Stone3',
    description: 'Sgdfg hghgfd ggfdsgfh gfgf dgfg gfdgf gfdgf gfdgdf',
    url: '../img/svg/stone.svg'
}, {
    name: 'Stone4',
    description: 'Sgdfg hghgfd ggfdsgfh gfgf dgfg gfdgf gfdgf gfdgdf',
    url: '../img/svg/stone.svg'
}, {
    name: 'Stone5',
    description: 'Sgdfg hghgfd ggfdsgfh gfgf',
    url: '../img/svg/stone.svg'
}, {
    name: 'Grass1',
    description: 'Sgdfg hghgfd ggfdsgfh gfgf',
    url: '../img/svg/stone.svg'
}, {
    name: 'Grass2',
    description: 'Sgdfg hghgfd ggfdsgfh gfgf',
    url: '../img/svg/stone.svg'
}, {
    name: 'Grass3',
    description: 'Sgdfg hghgfd ggfdsgfh gfgf',
    url: '../img/svg/stone.svg'
}, {
    name: 'Grass4',
    description: 'Sgdfg hghgfd ggfdsgfh gfgf',
    url: '../img/svg/stone.svg'
}];

const ingredientRowItem = (item, index, arr) => {
    let isEven = index % ingredients.itemPerRow == 0;
    let nextIndex = index + 1;

    return `
        ${index == 0 || isEven ? '<div class="row valign-wrapper">' : ''}
        <div class="col ${isEven ? 'offset-s2' : ''} s2 tooltipped" data-index=${index} data-position="top" data-tooltip="I'm ${item.name}. Drag me!">
            <a id="${item.name}" href="#" class="col s12 clickable">
                <img src="${item.url}" alt=""/>
            </a>
        </div>
        <div class="col ${nextIndex == arr.length && isEven ? 's8' : 's3'}">
            <h5>${item.name}</h5>
            <p class="truncate">${item.description}</p>
        </div>
        ${nextIndex == arr.length || nextIndex % ingredients.itemPerRow == 0 ? `</div>` : `${ingredientRowItem(arr[nextIndex], nextIndex, arr)}`}`;
};
/*
                <object type="image/svg+xml" data="${item.url}">
                    <img src="${item.url}" alt=""/>
                </object>

*/
const getChangesCount = () => {
    let container = $('#ingredients > div:first-child');
    let rowHeight = container.find('.row:first-child').outerHeight(true);
    let parentHeight = $('#ingredients').height();

    return Math.floor(parentHeight / rowHeight) - container.find('.row').length - 1;
};

const getIngredients = () => {
    $.ajax({
            type: 'GET',
            url: '/get/ingredietns',
            dataType: 'json',
            cache: false,
        })
        .always((data, status, xhr) => {
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
            $('#glass').append(`
                <div class="row">
                    <div class="col offset-s1 s2"></div>
                    <div class="col s6">
                <object type="image/svg+xml" data="img/svg/glass.svg">
                    <img src="img/svg/glass.svg" alt=""/>
                </object>
                </div>
                <div class="col s2"></div>
                <div class="col s1"></div>
                </div>
            `);
            $('#glass')// object
                .droppable({
                    // accept: '#ingredients .clickable',
                    // scope: 'ingredients',
                    // tolerance: 'touch',
                    accept: drag => {
                        console.log(333);
                        // var dropId = $(this).attr('data-id');
                        // var dragId = $(drag).attr('data-id');
                        // return dropId === dragId;
                        return true;
                    },
                    drop: (e, ui) => {
                        $('#glass').append(ui.draggable.clone());// object
                        console.log(12);
                        // $.ui.ddmanager.current.cancelHelperRemoval = true;
                        // alert("dropped");
                        // var $item = ui.draggable.clone();
                        // $(ui.draggable).replaceWith();
                        // console.log($item);
                        // $(this).addClass('has-drop').html($item);                        
                    }
                });
            getIngredients();
        });
});

const updatePageButtons = container => {
    let firstIndex = container.find('.row:first > .tooltipped:first').data('index');
    let lastIndex = container.find('.row:last > .tooltipped:last').data('index');

    $('#pagebar .clickable:first').toggleClass('disable', firstIndex == 0);
    $('#pagebar .clickable:last').toggleClass('disable', lastIndex + 1 >= ingredientList.length);
};

const loadIngredients = async (items, startPos = 0, emptied = true) => {
    let container = $('#ingredients > div:first-child');

    const getAvailableRowCount = () => Math.floor($('#ingredients').height() /
        container.find('.row:first-child').outerHeight(true)) - 1;
    const updatePageBar = () => {
        let rowCount = container.find('.row').length;
        let maxRowCount = Math.ceil(ingredientList.length / ingredients.itemPerRow);

        $('#ingredients > div:last-child').toggleClass('hidden', rowCount >= maxRowCount);
    };

    if (emptied) {
        container.empty();
    }
    for (let i = Math.max(0, startPos), j = 0; i < items.length; i += ingredients.itemPerRow, j++) {
        await $(ingredientRowItem(items[i], i, items))
            .hide()
            .appendTo(container)
            .fadeIn(800)
            .find('.clickable')
//            .click(e => {
//                let item = e.target;
//                console.log(item.id);
                // $('.clickable').css('border', '1px solid red');
                // console.log($('.clickable').height());
                // console.log($('.clickable').outerHeight(true));
//            })
            .draggable({
                helper: 'clone',
                revert: 'invalid',
                revertDuration: 200,
                drag: (e, ui) => {
                    let size = $(e.target).outerWidth(true);

                    $(ui.helper).width(size);
                }
            }).promise();
        if (!j) {
            availableRowCount = getAvailableRowCount();
        }
        if (j + 1 + (emptied ? 0 : ingredients.currentRowCount) == availableRowCount) {
            ingredients.currentItemCount = availableRowCount * ingredients.itemPerRow;
            break;
        }
    }
    if ($('#pagebar').length) {
        updatePageButtons(container);
    } else {
        $('#ingredients').append($('<div>').load('parts/pagebar.html', () => {
            $('#pagebar .clickable').click(e => {
                let item = $(e.target);

                if (!item.hasClass('disable')) {
                    let direction = item.data('direction');
                    let itemCount = getAvailableRowCount() * ingredients.itemPerRow;

                    loadIngredients(ingredientList, direction == -1 ?
                        (Math.ceil(container.find('.tooltipped:first').data('index') / itemCount) - 1) * itemCount :
                        container.find('.tooltipped:last').data('index') + 1);
                }
            });
            updatePageButtons(container);
        }));
    }
    updatePageBar(); //--all browsers!
};

$(window).resize(() => {
    let changesCount = getChangesCount();

    if (changesCount) {
        let container = $('#ingredients > div:first-child');

        if (changesCount < 0) {
            while (changesCount) {
                container.find('.row:last-child').remove();
                updatePageButtons(container);
                ingredients.decRow();
                changesCount++;
            }
        } else {
            loadIngredients(ingredientList,
                container.find('.row:first > .tooltipped:first').data('index') +
                ingredients.currentItemCount,
                false);
            changesCount--;
        }
    }
});