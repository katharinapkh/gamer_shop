export default function renderCards(data) {
    const goodsWrapper = document.querySelector('.goods');
    //переберем все товары в массиве goods (взято из базы данных, свойства обьекта)
    data.goods.forEach((good) => {
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