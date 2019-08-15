'use strict';

//checkbox
function toggleCheckbox() {
    const checkbox = document.querySelectorAll('.filter-check_checkbox');
    //1st variant
    // for (let i = 0; i < checkbox.length; i++) {
    //     checkbox[i].addEventListener('change', function () {
    //         if (this.checked) {
    //             this.nextElementSibling.classList.add('checked');
    //         } else {
    //             this.nextElementSibling.classList.remove('checked');
    //         }
    //     });
    // }

    //2d variant
    checkbox.forEach((elem) => {
        elem.addEventListener('change', function () {
            if (this.checked) {
                this.nextElementSibling.classList.add('checked');
            } else {
                this.nextElementSibling.classList.remove('checked');
            }
        });
    });
}
//end checkbox

//bucket
function toggleCart() {
    const btnCArt = document.getElementById('cart'),
        modalCart = document.querySelector('.cart'),
        cartClose = document.querySelector('.cart-close');

    btnCArt.addEventListener('click', function () {
        modalCart.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    cartClose.addEventListener('click', function () {
        modalCart.style.display = 'none';
        document.body.style.overflow = '';
    });
}
//end bucket

//add order
function addCart() {
    const cards = document.querySelectorAll('.goods .card'),
        cartWrapper = document.querySelector('.cart-wrapper'),
        cartEmpty = document.getElementById('cart-empty'),
        countGoods = document.querySelector('.counter');

    cards.forEach((card) => {
        const btn = card.querySelector('button');

        btn.addEventListener('click', () => {
            const cardClone = card.cloneNode(true); //копия новой карточки уже в корзине
            cartWrapper.appendChild(cardClone);

            showData();

            const removeBtn = cardClone.querySelector('.btn'); //получили кнопку из клонированной карточки
            removeBtn.textContent = 'Удалить из корзины'; //переименовали кнопку на удаление 
            removeBtn.addEventListener('click', () => {
                cardClone.remove(); //удаляем карточку по нажатию на кнопку
                showData(); //обновляет показ суммы 
            });
        });
    });

    function showData() {
        const cardsCart = cartWrapper.querySelectorAll('.card'),
            cardPrice = cartWrapper.querySelectorAll('.card-price'),
            cardTotal = document.querySelector('.cart-total span');

        countGoods.textContent = cardsCart.length; //получение текста, содержащегося в єлементе

        let sum = 0;
        cardPrice.forEach((elem) => {
            let price = parseFloat(elem.textContent); //выбираем только числа из цены, приводя строку в число
            sum += price; //суммируем товары
        });
        cardTotal.textContent = sum; //Выводим на страницу вместо 0
        if (cardsCart.length !== 0) {
            cartEmpty.remove(); // удаляем надпись о пустой корзине, если она не пустая
        } else {
            cartWrapper.appendChild(cartEmpty); //возвращаем надпись, если с нее все удалили
        }
    }
}
//end adding order

//filter sale and search
function actionPage() {
    const cards = document.querySelectorAll('.goods .card'),
        discountCheckbox = document.getElementById('discount-checkbox'),
        //goods = document.querySelector('.goods'),
        min = document.getElementById('min'),
        max = document.getElementById('max'),
        search = document.querySelector('.search-wrapper_input'), //получаем инпут поиска
        searchBtn = document.querySelector('.search-btn');

    discountCheckbox.addEventListener('click', filter);
    min.addEventListener('change', filter);
    max.addEventListener('change', filter);

    function filter() {
        cards.forEach((card) => { //перебираем каждую карточку
            const cardPrice = card.querySelector('.card-price'),
                price = parseFloat(cardPrice.textContent),
                discount = card.querySelector('.card-sale');
            //проверяем введено ли какое-то значение и меньше ли оно от минимального значения, аналогично с макс.
            if (min.value && price < min.value || (max.value && price > max.value)) {
                card.parentNode.style.display = 'none';
            } else if (discountCheckbox.checked && !discount) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = ''; //возвращаем все карточки с товарами, убирая галоку с акций
            }
        });
    }
    //end filter sale and search

    searchBtn.addEventListener('click', () => {
        const searchText = new RegExp(search.value.trim(), 'i');
        //получаем значение введенного текста в поиск преобразуя в регулярное выражение для игнора регистра ('i')
        //применяя метод трим для удаления ненужных пробелов
        cards.forEach((card) => {
            const title = card.querySelector('.card-title');
            //у заголовка карточки получаем текст и методом Тест проверяем нет ли в тексте наше регулярное выражение
            if (!searchText.test(title.textContent)) {
                card.parentNode.style.display = 'none'; //прячем несоответствующие карточки
            } else {
                card.parentNode.style.display = '';
                //console.dir(cards[0]); -метод вывода в консоль всех свойств и методов элемента
            }
        });
        search.value = '';
    });
}

//get data from server

function getData() {
    const goodsWrapper = document.querySelector('.goods');

    return fetch('../db/db.json') //метод получения данных
        .then((response) => { //получаем доступ к базе данных на сервере или локально
            //с помощью then обработали промис и проверили статусы
            if (response.ok) { // если все ок, то выводим данные
                return response.json(); //метод работающий с json форматом
            } else {
                throw new Error('Данные не были получены, ошибка: ', +response.status); //если не все ок, то выдаем ошибку
            }
        })
        .then((data) => { //получение данных - обработка данных
            return data;
        })
        .catch((err) => { //метод перехвата ошибок
            console.warn(err); //вывод ошибки для разработчика
            goodsWrapper.innerHTML = '<div style="font-size: 30px">Упс, что-то пошло не так...</div>'; //информация об ошибке для пользователя
        });
    //.catch(err => console.warn(err)); - упрощенный вариант записи
}


//rendering card
function renderCards(data) {
    const goodsWrapper = document.querySelector('.goods');
    data.goods.forEach((good) => { //переберем все товары в массиве goods (взято из базы данных, свойства обьекта)
        const card = document.createElement('div'); //создали элемент - див карточки в которой будет верстка для товара
        card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';
        //далее проверяем есть ли у товара скидка (распродажа) и выводим соответствующий стикер на товаре
        //и добавляем атрибут для того чтобі потом открівать по категориям
        card.innerHTML = ` <div class="card" data-category="${good.category}">
                        ${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''} 
                            <div class="card-img-wrapper">
                            <span class="card-img-top"
            style="background-image: url('${good.img}')"></span>
                            </div>
                            <div class="card-body justify-content-between">
                            <div class="card-price" style="${good.sale ? 'color:red' : ''}">${good.price} UAH</div>
                            <h5 class="card-title">${good.title}</h5>
                            <button class="btn btn-primary">В корзину</button>
                             </div>
                         </div>`;

        goodsWrapper.appendChild(card);
    });

}

//end of rendering func
//end getting data

//Catalog
function renderCatalog() {
    const cards = document.querySelectorAll('.goods .card'),
        catalogList = document.querySelector('.catalog-list'),
        catalogBtn = document.querySelector('.catalog-button'),
        catalogWrapper = document.querySelector('.catalog');
    const categories = new Set(); //создаем Коллекцию методом Set

    cards.forEach((card) => {
        categories.add(card.dataset.category); //датасет - свойство взятое из ДОМ дерева через console.dir
    });

    categories.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        catalogList.appendChild(li);
    });

    catalogBtn.addEventListener('click', (event) => {
        if (catalogWrapper.style.display) {
            catalogWrapper.style.display = '';
        } else {
            catalogWrapper.style.display = 'block';
        }

        if (event.target.tagName === 'LI') {
            cards.forEach((card) => {
                if (card.dataset.category === event.target.textContent) {
                    card.parentNode.style.display = '';
                } else {
                    card.parentNode.style.display = 'none';
                }
            });
        }
    });
}
//end catalog

getData().then((data) => {
    renderCards(data);
    toggleCheckbox();
    toggleCart();
    addCart();
    actionPage();
    renderCatalog();
});