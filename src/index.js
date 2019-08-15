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

    discountCheckbox.addEventListener('click', () => {
        cards.forEach((card) => { //перебираем карточки для того чтобы отобрать все что с акциеей
            if (discountCheckbox.checked) {
                if (!card.querySelector('.card-sale')) {
                    //card.parentNode.remove();
                    card.parentNode.style.display = 'none'; //убираем ненужные карточки вместе с родителем
                }
            } else {
                //goods.appendChild(card.parentNode);
                card.parentNode.style.display = ''; //возвращаем все карточки с товарами, убирая галоку с акций
            }
        });
    });

    function filterPrice() { 
        cards.forEach((card) => { //перебираем каждую карточку
            const cardPrice = card.querySelector('.card-price'),
                price = parseFloat(cardPrice.textContent);
                //проверяем введено ли какое-то значение и меньше ли оно от минимального значения, аналогично с макс.
            if (min.value && price < min.value || (max.value && price > max.value)) {
                card.parentNode.style.display = 'none'; //прячем несоответствующие карточки
            } else {
                card.parentNode.style.display = '';
            }
        });
    }
    min.addEventListener('change', filterPrice);
    max.addEventListener('change', filterPrice);

    searchBtn.addEventListener('click', () => {
        const searchText = new RegExp(search.value.trim(), 'i');
        //получаем значение введенного текста в поиск преобразуя в регулярное выражение для игнора регистра ('i')
        //применяя метод трим для удаления ненужных пробелов
        cards.forEach((card) => {
            const title = card.querySelector('.card-title');
            //у заголовка карточки получаем текст и методом Тест проверяем нет ли в тексте наше регулярное выражение
            if (!searchText.test(title.textContent)) {
                card.parentNode.style.display = 'none';
            } else {
                card.parentNode.style.display = '';
                //console.dir(cards[0]); -метод вывода в консоль всех свойств и методов элемента
            }
        });
        search.value = '';
    });
}
//end filter sale and search


toggleCheckbox();
toggleCart();
addCart();
actionPage();