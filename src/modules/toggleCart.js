export default function toggleCart() {
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