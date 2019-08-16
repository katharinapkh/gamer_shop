export default function filter() {
    const cards = document.querySelectorAll('.goods .card'),
        discountCheckbox = document.getElementById('discount-checkbox'),
        min = document.getElementById('min'),
        max = document.getElementById('max'),
        activLi = document.querySelector('.catalog-list li.active');

    cards.forEach((card) => { //перебираем каждую карточку
        const cardPrice = card.querySelector('.card-price'),
            price = parseFloat(cardPrice.textContent),
            discount = card.querySelector('.card-sale');
        //проверяем введено ли какое-то значение и меньше ли оно от минимального значения, аналогично с макс.
        if (min.value && price < min.value || (max.value && price > max.value)) {
            card.parentNode.style.display = 'none';
        } else if (discountCheckbox.checked && !discount) {
            card.parentNode.style.display = 'none';
        } else if(activLi) {
            if(card.dataset.category !== activLi.textContent) {
                card.parentNode.style.display = 'none';
            }
        } else {
            card.parentNode.style.display = ''; //возвращаем все карточки с товарами, убирая галоку с акций
        }
    });
}