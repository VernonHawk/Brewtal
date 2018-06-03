'use strict';

const ingredientList = [{
    name: 'Stone',
    description: 'dasdadsadas',
    url: '../img/svg/stone.svg'
}, {
    name: 'Stone1',
    description: 'dasdadsadas1',
    url: '../img/svg/stone.svg'
}, {
    name: 'Stone2',
    description: 'da<strong>sdadsa</strong>das2',
    url: '../img/svg/stone.svg'
}];

const ingredients = items => {
    return `
        <div id="ingredients" class="col s4">
            ${items.map(item => `
            <div class="row valign-wrapper">
                <div class="col offset-s2 s3 tooltipped" data-position="left" data-tooltip="I'm ${item.name}. Drag me!">
                    ${item.svg}
                </div>
                <div class="col s7">
                    <h6 class="truncate">${item.description}</h6>
                </div>
            </div>`)
            .join('')}
        </div>`;
};

const getIngredients = items => {
    const promises = items.map(async item => {
        const response = await $.get({
            url: item.url,
            dataType: 'text'
        });

        return {
            name: item.name,
            description: item.description,
            svg: response
        };
    });

    return promises;
};

$(document).ready(() => {
    $('header').load('parts/header.html', () => {
        $.getScript('../js/materialize/materialize.min.js', () => {
            $('.sidenav').sidenav();
            $('.tooltipped').tooltip(); 
        });
    });

    $('footer').load('parts/footer.html', () => {});
    // $('.preloader').load('en/parts/preloader.html', function () {
    //     $(this).addClass('center-align');
    // });
    $('#glass').load('../img/svg/glass.svg', () => {});
    Promise.all(getIngredients(ingredientList))
        .then(data => $('#ingredients').replaceWith(ingredients(data)));
})
