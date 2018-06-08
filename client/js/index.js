'use strict';

let currentItemCount = 0;
let currentItemPage = 0;
let ingredients;

const itemPerRow = 2;
const ingredientList = [{
    name: 'Stone',
    description: 'Sgdfg hghgfd ggfdsgfh gfgf dgfg gfdgf gfdgf gfdgdf',
    url: '../img/svg/stone.svg'
}, {
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
    let isEven = index % itemPerRow == 0;
    let nextIndex = index + 1;

    return `
        ${index == 0 || isEven ? '<div class="row valign-wrapper">' : ''}
        <div class="col ${isEven ? 'offset-s2' : ''} s2 tooltipped" data-index=${index} data-position="top" data-tooltip="I'm ${item.name}. Drag me!">
            <a id="${item.name}" href="#" class="col s12 clickable">
                <object type="image/svg+xml" data="${item.url}">
                    <img src="${item.url}" alt=""/>
                </object>
            </a>
        </div>
        <div class="col ${nextIndex == arr.length && isEven ? 's8' : 's3'}">
            <h5>${item.name}</h5>
            <p class="truncate">${item.description}</p>
        </div>
        ${nextIndex == arr.length || nextIndex % itemPerRow == 0 ? `</div>` : `${ingredientRowItem(arr[nextIndex], nextIndex, arr)}`}`;
};

const getChangesCount = () => {
    let container = $('#ingredients > div:first-child');
    let rowHeight = container.find('.row:first-child').outerHeight(true);
    let parentHeight = $('#ingredients').height();

    console.log(Math.floor(parentHeight / rowHeight) - 1, container.find('.row').length, Math.ceil(ingredientList.length / itemPerRow),
        Math.floor(parentHeight / rowHeight) - container.find('.row').length - 1
    );
    console.log(currentItemCount);//currentItemCount / itemPerRow
    return Math.floor(parentHeight / rowHeight) - container.find('.row').length - 1;
};

$(document).ready(() => {
    // $('header').load('parts/header.html', () => {
    $.getScript('js/materialize/materialize.min.js', () => {
        $('.sidenav').sidenav();
        $('.tooltipped').tooltip();
    });
    //});

    //$('footer').load('parts/footer.html', () => {});
    // $('.preloader').load('en/parts/preloader.html', function () {
    //     $(this).addClass('center-align');
    // });
    // $('#glass').append(`
    //     <div class="row">
    //         <div class="col offset-s1 s2"></div>
    //         <div class="col s6">
    //     <object type="image/svg+xml" data="img/svg/glass.svg">
    //         <img src="img/svg/glass.svg" alt=""/>
    //     </object>
    //     </div>
    //     <div class="col s2"></div>
    //     <div class="col s1"></div>
    //     </div>
    // `);

    loadIngredients(ingredientList);
});

const loadIngredients = (items, startPos = 0) => {
    let container = $('#ingredients > div:first-child');

    const updatePageButtons = () => {
        let firstIndex = container.find('.row:first > .tooltipped:first').data('index');
        let lastIndex = container.find('.row:last > .tooltipped:last').data('index');
        $('#pagebar .clickable:first').toggleClass('disable', firstIndex == 0);
        $('#pagebar .clickable:last').toggleClass('disable', lastIndex + 1 >= ingredientList.length);
    };
    const updatePageBar = () => {
        let rowCount = container.find('.row').length;
        let maxRowCount = Math.ceil(ingredientList.length / itemPerRow);
        $('#ingredients > div:last-child').toggleClass('hidden', rowCount >= maxRowCount);
    };

    container.empty();
    for (let i = startPos, j = 0, rowHeight, parentHeight; i < items.length; i += itemPerRow, j++) {
        $(ingredientRowItem(items[i], i, items))
            .hide()
            .appendTo(container)
            .fadeIn(1000);
        if (!j) {
            rowHeight = container.find('.row:first-child').outerHeight(true);
            parentHeight = $('#ingredients').height();
        }
        if (parentHeight < (j + 1) * rowHeight) {
            currentItemCount = (j + 1) * itemPerRow;
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
                    let firstIndex = container.find('.row:first > .tooltipped:first').data('index');
                    let direction = item.data('direction');

                    currentItemPage += direction;
                    loadIngredients(ingredientList, firstIndex + direction * currentItemCount);
                }
            });
            updatePageButtons();
        }));
    }
    updatePageBar();
};

$(window).resize(() => {
    let changesCount = getChangesCount();

    if (changesCount) {
        if (changesCount < 0) {
            // console.log(getChangesCount());//delete
        } else {
            //append
        }
    }
    // loadIngredients(ingredientList);
});