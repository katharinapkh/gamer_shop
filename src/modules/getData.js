export default function getData() {
    const goodsWrapper = document.querySelector('.goods');

    return fetch('./db/db.json') //метод получения данных
        .then((response) => { //получаем доступ к базе данных на сервере или локально
            //с помощью then обработали промис и проверили статусы
            // если все ок, то выводим данные
            if (response.ok) {
                return response.json(); //метод работающий с json форматом
            } else {
                //если не все ок, то выдаем ошибку
                throw new Error('Данные не были получены, ошибка: ', +response.status);
            }
        })
        .then((data) => {
            //получение данных - обработка данных
            return data;
        })
        .catch((err) => {
            //метод перехвата ошибок
            console.warn(err); //вывод ошибки для разработчика
            //информация об ошибке для пользователя
            goodsWrapper.innerHTML = '<div style="font-size: 30px">Упс, что-то пошло не так...</div>';
        });
    //.catch(err => console.warn(err)); - упрощенный вариант записи
}