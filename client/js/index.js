'use strict';

let currentItemCount = 0;
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
    }
    , {
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
        }
];

const ingredientRowItem = (item, index, arr) => {
    return `
        ${index == 0 || index % itemPerRow == 0 ? '<div class="row valign-wrapper">' : ''}
        <div class="col ${index % itemPerRow == 0 ? 'offset-s2' : ''} s2 tooltipped" data-index=${index} data-position="top" data-tooltip="I'm ${item.name}. Drag me!">
            <object type="image/svg+xml" data="${item.url}" class="clickable">
                <img src="${item.url}" alt=""/>
            </object>
        </div>
        <div class="col ${index == arr.length - 1 && index % itemPerRow == 0 ? 's8' : 's3'}">
            <h5>${item.name}</h5>
            <p class="truncate">${item.description}</p>
        </div>
        ${index == arr.length - 1 || (index + 1) % itemPerRow == 0 ? `</div>` : `${ingredientRowItem(arr[index + 1], index + 1, arr)}`}`;
};
/*
const ingredients = items => {
    return `
        <div id="ingredients" class="col s6">
            ${items.map((item, index, arr) => `
                ${index == 0 || index % 2 == 0 ? '<div class="row valign-wrapper">' : ''}
                <div class="col ${index % 2 == 0 ? 'offset-s2' : ''} s2 tooltipped" data-position="top" data-tooltip="I'm ${item.name}. Drag me!">
                    <object type="image/svg+xml" data="${item.url}" class="clickable">
                        <img src="${item.url}" alt=""/>
                    </object>
                </div>
                <div class="col ${index == arr.length - 1 && index % 2 == 0 ? 's8' : 's3'}">
                    <h5>${item.name}</h5>
                    <p class="truncate">${item.description}</p>
                </div>
                ${index == arr.length - 1 || (index + 1) % 2 == 0 ? '</div>' : ''}
            `)
            .join('')}
        </div>`;
};
*/
//<h5>${item.name}</h5><p class="truncate">${item.description}</p>
// const getIngredients = items => {
//     const promises = items.map(async item => {
//         const response = await $.get({
//             url: item.url,
//             dataType: 'text'
//         });

//         return {
//             name: item.name,
//             description: item.description,
//             svg: response
//         };
//     });

//     return promises;
// };
// Promise.all(getIngredients(ingredientList))
//     .then(data => $('#ingredients').replaceWith(ingredients(data)));

$(document).ready(() => {
    // $('header').load('parts/header.html', () => {
    $.getScript('js/materialize/materialize.min.js', () => {
        $('.sidenav').sidenav();
        $('.tooltipped').tooltip(); //{delay: 50});
        // $('svg').on('hover', () => {
        //     $('.tooltipped').open();
        // });
    });
    //});

    //$('footer').load('parts/footer.html', () => {});
    // $('.preloader').load('en/parts/preloader.html', function () {
    //     $(this).addClass('center-align');
    // });
    // $('#glass').load('img/svg/glass.svg', () => {});
    // $('#glass').append(`
    //     <object type="image/svg+xml" data="img/svg/glass.svg">
    //         <img src="img/svg/glass.svg" alt=""/>
    //     </object>
    // `);
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
    //    $('#ingredients').replaceWith(ingredients(ingredientList));

    loadIngredients(ingredientList);
    // $('#ingredients').append($('<div>').load('parts/pagebar.html', () => {
    //     let firstIndex = $('#ingredients > .row:first > .tooltipped:first').data('index');
    //     let lastIndex = $('#ingredients > .row:last > .tooltipped:last').data('index');
    //     $('#pagebar > object:first').toggleClass('disable', firstIndex === 0);
    //     $('#pagebar > object:last').toggleClass('disable', lastIndex + 1 >= ingredientList.length);
    // }));

    // let rowCount = $('#ingredients > .row').length;
    // let maxRowCount = Math.ceil(ingredientList.length / itemPerRow);
    // $('#ingredients > div:last-child').toggleClass('hidden', rowCount >= maxRowCount);
    // $(window).resize();//delete    
});

const loadIngredients = (items, startPos = 0) => {
    // $('#ingredients').empty();
//    console.log('start: ' + startPos);
    const updatePageButtons = () => {
        let firstIndex = $('#ingredients > div:first-child > .row:first > .tooltipped:first').data('index');
        let lastIndex = $('#ingredients > div:first-child > .row:last > .tooltipped:last').data('index');
        $('#pagebar .clickable:first').toggleClass('disable', firstIndex === 0);
        $('#pagebar .clickable:last').toggleClass('disable', lastIndex + 1 >= ingredientList.length);
    };
    const updatePageBar = () => {
        let rowCount = $('#ingredients > div:first-child > .row').length;
        let maxRowCount = Math.ceil(ingredientList.length / itemPerRow);
        $('#ingredients > div:last-child').toggleClass('hidden', rowCount >= maxRowCount);
    };
    
    $('#ingredients > div:first-child').empty();
    for (let i = startPos, j = 0, rowHeight, parentHeight; i < items.length; i += itemPerRow, j++) {
        $('#ingredients > div:first-child').append(ingredientRowItem(items[i], i, items));
        if (!j) {
            rowHeight = $('#ingredients > div:first-child > .row:first-child').height();
            parentHeight = $('#ingredients').height();
        }
        if (parentHeight < (j + 2) * rowHeight) {
            currentItemCount = (j + 1) * itemPerRow;
            break;
        }
    }
    if ($('#pagebar').length) {
        updatePageButtons();
    } else {
        $('#ingredients').append($('<div>').load('parts/pagebar.html', () => {
            $('#pagebar .clickable').click(e => {
                let btn = $(e.target);
                if (!btn.hasClass('disable')) {
                    let firstIndex = $('#ingredients > div:first-child > .row:first > .tooltipped:first').data('index');
                    
                    // console.log(`${firstIndex}, ${btn.data('direction')}, ${currentItemCount}`);
                    loadIngredients(ingredientList, firstIndex + btn.data('direction') * currentItemCount);
                    //console.log($('#ingredients > .row').length * itemPerRow);
                    //console.log($('#ingredients > .row:first > .tooltipped:first').data('index'));
                }
            });
            updatePageButtons();
        }));
    }
    updatePageBar();
};

$(window).resize(() => {
    //console.log($('#pagebar > object').length);
    // let rowCount = $('#ingredients > .row').length;
    // let maxRowCount = Math.ceil(ingredientList.length / itemPerRow);

    // if (rowCount < maxRowCount) {
    //     $('#ingredients > div:last-child').removeClass('hidden');
        // let index = $('#ingredients .row:first-child .col:first-child').data('index');
    // } else {
    //     $('#ingredients > div:last-child').addClass('hidden');
    // }
    // $('#pagebar object:first-child').addClass('disable');//toggleClass('disable', index === 0);
    // console.log($('#pagebar object:first-child').html());

    // loadIngredients(ingredientList);
});    

