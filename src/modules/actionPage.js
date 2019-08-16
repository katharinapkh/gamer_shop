import filter from './filter';

export default function actionPage() {
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