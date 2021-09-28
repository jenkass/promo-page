document.addEventListener('DOMContentLoaded', () => {
    'use strict';


    const getData = (url, callback) => {
        const request = new XMLHttpRequest();
        request.open('GET', url);
        request.send();
        request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 200){
                const response = JSON.parse(request.response);
                callback(response);
            } else {
                console.error(new Error('Ошибка: ' + request.status));
            }
        })  
    }




    const tabs = () => {
        const cardDetailChangeElems = document.querySelectorAll('.card-detail__change');
        const cardDetailsTitleElem = document.querySelector('.card-details__title');
        const cardImageItemElem = document.querySelector('.card__image_item');
        const cardDetailsPriceElem = document.querySelector('.card-details__price');
        const descriptionMemory = document.querySelector('.description__memory');

        const data = [
            {
                name: 'Смартфон Apple iPhone 12 Pro 128GB Graphite',
                img: "img/iPhone-graphite.png",
                price: 95990,
                memory: 128,
            },
            {
                name: 'Смартфон Apple iPhone 12 Pro 256GB Silver',
                img: "img/iPhone-silver.png",
                price: 120990,
                memory: 256,
            },
            {
                name: 'Смартфон Apple iPhone 12 Pro 128GB Pacific Blue',
                img: "img/iPhone-blue.png",
                price: 99990,
                memory: 128,
            },
        ];
        

        const deactive = () => {
            cardDetailChangeElems.forEach(btn => btn.classList.remove('active'))
        }

        cardDetailChangeElems.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                if (!btn.classList.contains('active')){
                    deactive();
                    btn.classList.add('active');
                    cardDetailsTitleElem.textContent = data[i].name;
                    cardImageItemElem.src = data[i].img;
                    cardImageItemElem.alt = data[i].name;
                    cardDetailsPriceElem.textContent = data[i].price + '₽';
                    descriptionMemory.textContent = `Встроенная память (ROM) ${data[i].memory} ГБ`;
                }
            });
        })
    };
/*       const cardImageElems = document.querySelectorAll('.card__image');

        const hideAll = () => {
            for (let i = 0; i < cardDetailChangeElems.length; i++){
                    cardDetailChangeElems[i].classList.remove('active');
                    cardDetailsTitleElems[i].classList.remove('active');
                    cardImageElems[i].classList.remove('active');
                }
        };

        for (let i = 0; i < cardDetailChangeElems.length; i++){
            cardDetailChangeElems[i].addEventListener('click', () => {
                hideAll();
                cardDetailChangeElems[i].classList.add('active');
                cardDetailsTitleElems[i].classList.add('active');
                cardImageElems[i].classList.add('active');
            })
        }*/

/*   const accordion = () => {
        const characteristicsTitle = document.querySelectorAll('.characteristics__title');
        const characteristicsDescription = document.querySelectorAll('.characteristics__description');

        characteristicsTitle.forEach((elem, i) => {
            elem.addEventListener('click', () => {
                elem.classList.toggle('active');
                characteristicsDescription[i].classList.toggle('active');
            });
        });




    };
*/
    const accordion = () => {
        const characteristicsListElem = document.querySelector('.characteristics__list');
        const characteristicsItemElems = document.querySelectorAll('.characteristics__item');


        const open = (btn, dropDown) => {
            closeAllDrops();
            dropDown.style.height = `${dropDown.scrollHeight}px`;
            btn.classList.add('active');
            dropDown.classList.add('active');
        };

        const close = (btn, dropDown) => {
            btn.classList.remove('active');
            dropDown.classList.remove('active');
            dropDown.style.height = '';
        };

        const closeAllDrops = (btn, dropDown) => {
            characteristicsItemElems.forEach((elem) => {
                if (elem.children[0].classList.contains('active')) {
                    close(elem.children[0], elem.children[1]);
                }
            })
        }
        characteristicsListElem.addEventListener('click', (event) => {
                const target = event.target;
                if (target.classList.contains('characteristics__title')) {
                    const parent = target.closest('.characteristics__item');
                    const description = parent.querySelector('.characteristics__description');
                    description.classList.contains('active') ? close(target, description) : open(target, description);
                }
        })

        document.body.addEventListener('click', (even) => {
            const target = even.target;
            if (!target.closest('.characteristics__list')) {
                closeAllDrops();
            }
        })
    }

    const modal = () => {
        const cardDetailsButtonBuy = document.querySelector('.card-details__button_buy');
        const cardDetailsButtonDelivery = document.querySelector('.card-details__button_delivery');
        const modal = document.querySelector('.modal');
        const cardDetailsTitle = document.querySelector('.card-details__title');
        const modalTitle = document.querySelector('.modal__title');
        const modalTitleSubmit = document.querySelector('.modal__title-submit');
        const modalSubtitle = document.querySelector('.modal__subtitle');
        const openModal = (event) => {
            const target = event.target;
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', escapeHadler);
            modalTitle.textContent = cardDetailsTitle.textContent;
            modalTitleSubmit.value = cardDetailsTitle.textContent;
            modalSubtitle.textContent = target.dataset.buttonBuy;
        }

        const closeModal = () => {
            modal.classList.remove('open');
            document.body.style.overflow = 'auto';
            document.removeEventListener('keydown', escapeHadler);

        }

        const escapeHadler = event => {
            if (event.code === 'Escape') {
                closeModal();
            }
        }

        cardDetailsButtonBuy.addEventListener('click', openModal);
        cardDetailsButtonDelivery.addEventListener('click', openModal);

        modal.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('modal__close') || target === modal) {
                closeModal();
            }
        })
        
    }

    const renderCrossSell = () => {
        const allGoods = [];
        const сrossSellAdd = document.querySelector('.сross-sell__add');
        const shuffle = arr => arr.sort(() => Math.random() - 0.5)

        const crossSellList = document.querySelector('.cross-sell__list');
        const createCrossSellItem = ({ photo: picture, name, price}) => {
            const liItem = document.createElement('li');
            liItem.innerHTML = `<article class="cross-sell__item">
                <img class="cross-sell__image" src="${picture}" alt="${name}">
                <h3 class="cross-sell__title">${name}</h3>
                <p class="cross-sell__price">${price}₽</p>
                <button type="button" class="button button_buy cross-sell__button">Купить</button>
                </article>`;
            return liItem;
            
        }

        const render = arr => {
            arr.forEach(item => {
                crossSellList.append(createCrossSellItem(item));
            })
        }
        
        const createCrossSellList = (goods = []) => {
            allGoods.push(...shuffle(goods));
            const fourItems = allGoods.splice(0,4);
            render(fourItems);
        };

        сrossSellAdd.addEventListener('click', () => {
            render(allGoods); 
            сrossSellAdd.remove();
        })

        

        getData('cross-sell-dbase/dbase.json', createCrossSellList);
    }

    tabs();
    accordion();
    renderCrossSell();
    modal();
    amenu('.header__menu', '.header-menu__list', '.header-menu__item', '.header-menu__burger');
});

