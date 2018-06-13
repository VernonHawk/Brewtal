'use strict';

<<<<<<< HEAD
=======
let currentItemPage = 0;
>>>>>>> dev
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
<<<<<<< HEAD
            <a id="${item.name}" href="#" class="col s12 clickable draggable1">
=======
            <a id="${item.name}" href="#" class="col s12 clickable">
>>>>>>> dev
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

<<<<<<< HEAD
=======
    // console.log(Math.floor(parentHeight / rowHeight) - 1, container.find('.row').length, Math.ceil(ingredientList.length / ingredients.itemPerRow),
    //     Math.floor(parentHeight / rowHeight) - container.find('.row').length - 1
    // );
>>>>>>> dev
    return Math.floor(parentHeight / rowHeight) - container.find('.row').length - 1;
};

$(document).ready(() => {
    $.getScript('js/materialize/materialize.min.js', () => {
        $('.sidenav').sidenav();
        $('.tooltipped').tooltip();
        $('.modal').modal();
    });

<<<<<<< HEAD
    // $('.preloader').load('parts/preloader.html', function () {
    //     $(this).addClass('center-align');
    // });
    
    $("#glass object").droppable({
        // drop: function (event, ui) {
        //     $(this)
        //         .addClass("ui-state-highlight")
        //         .find("p")
        //         .html("Dropped!");
        // }
    });

=======
>>>>>>> dev
    ingredients = new Ingredients(2);
    loadIngredients(ingredientList);
});

<<<<<<< HEAD
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
        .fadeIn(1000)
        .find('.clickable')
        .click(e => {
            let item = e.target;
            console.log(item.id);
        })
        .draggable({
            helper: 'clone',
            containment: [10, 10, 20, 20],
            // opacity: 0.35,
            // snap: true,
            revert: 'invalid'
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
=======
const loadIngredients = async (items, startPos = 0, emptied = true) => {
    return new Promise(resolve => {
        let container = $('#ingredients > div:first-child');

        const updatePageButtons = () => {
            let firstIndex = container.find('.row:first > .tooltipped:first').data('index');
            let lastIndex = container.find('.row:last > .tooltipped:last').data('index');

            $('#pagebar .clickable:first').toggleClass('disable', firstIndex == 0);
            $('#pagebar .clickable:last').toggleClass('disable', lastIndex + 1 >= ingredientList.length);
        };
        const updatePageBar = () => {
            let rowCount = container.find('.row').length;
            let maxRowCount = Math.ceil(ingredientList.length / ingredients.itemPerRow);

            $('#ingredients > div:last-child').toggleClass('hidden', rowCount >= maxRowCount);
        };

        if (emptied) {
            container.empty();
        }
        for (let i = startPos, j = 0, rowHeight, parentHeight; i < items.length; i += ingredients.itemPerRow, j++) {
            $(ingredientRowItem(items[i], i, items))
                .hide()
                .appendTo(container)
                .fadeIn(1000);
            if (!j) {
                rowHeight = container.find('.row:first-child').outerHeight(true);
                parentHeight = $('#ingredients').height();
                availableRowCount = Math.floor(parentHeight / rowHeight) - 1;
            }
            if (j + 1 + (emptied ? 0 : ingredients.currentRowCount) == availableRowCount) {
                console.log(startPos, j, emptied, ingredients.currentRowCount, availableRowCount);
                ingredients.currentItemCount = availableRowCount * ingredients.itemPerRow;
                break;
            }
        }
        container.find('.clickable').click(e => {
            let item = e.target;
            console.log(item.id);
        });
        if ($('#pagebar').length) {
            updatePageButtons();
        } else {
            $('#ingredients').append($('<div>').load('parts/pagebar.html', () => {
                $('#pagebar .clickable').click(e => {
                    let item = $(e.target);

                    if (!item.hasClass('disable')) {
                        let direction = item.data('direction');
                        let firstIndex = container.find('.row:first > .tooltipped:first').data('index');

                        currentItemPage += direction;
                        // if (direction == -1)
                        //     console.log(firstIndex, direction, ingredients.currentItemCount);
                        loadIngredients(ingredientList, firstIndex + direction * ingredients.currentItemCount);
                    }
                });
                updatePageButtons();
            }));
        }
        updatePageBar(); //--all browsers!
    });
>>>>>>> dev
};

$(window).resize(() => {
    let changesCount = getChangesCount();

    if (changesCount) {
        let container = $('#ingredients > div:first-child');

<<<<<<< HEAD
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
=======
        console.log('changes: ' + changesCount);
        if (changesCount < 0) {
            while (changesCount != 0) {
                container.find('.row:last-child').fadeOut('fast', function () {
                    $(this).remove();
                    ingredients.decRow();
                });
                changesCount++;
            }
        } else {
            while (changesCount != 0) {
                loadIngredients(ingredientList,
                    container.find('.row:first > .tooltipped:first').data('index') +
                    ingredients.currentItemCount,
                    false)
                .then(() => {ingredients.decRow();});

                changesCount--;
            }
>>>>>>> dev
        }
    }
});