export default function addCart() {
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