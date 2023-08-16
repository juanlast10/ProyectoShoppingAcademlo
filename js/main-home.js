/* DARK MODE TOGGLE */
function dark_mode(){
    const preferedColorScheme = window.matchMedia('(prefers-color-scheme: dark').matches ? 'dark' : 'light';
    const slider = document.getElementById('dark_mode_toggle');

    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }
        slider.addEventListener('click', ()  => {
        let switchToTheme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
        setTheme(switchToTheme);
    });
    setTheme(localStorage.getItem('theme') || preferedColorScheme);
};

/* HAMBURGER MENU */
function hamburgerMenu(){
    const selectBtn = document.querySelector('#hamburger_menu_select');
    const text = document.querySelector('#hamburger_menu_text');
    const option = document.getElementsByClassName('product_category_option');
    const menu = document.querySelector('.hamburger_menu');

    selectBtn.addEventListener('click', function(){
        selectBtn.classList.toggle('active');
        menu.classList.toggle('active');
    });

    for(options of option){
        options.onclick = function(){
            text.innerHTML = this.textContent;
            selectBtn.classList.remove('active');
        };
    };
};



/* CALL MODAL PRODUCT CATALOG */
function callModalCatalog(){
    const modalProduct = document.querySelector('.modal_product_catalog');
    
/*     modalProduct.addEventListener('click', function(){      
        modalProduct.classList.remove('active');
    }); */

    modalProduct.addEventListener('click', function(event){
        if(event.target.classList.contains('modal_product_btn_close')){
            modalProduct.classList.remove('active');
        };
    });
};

/* CALL MODAL CART */
function callModalCart(){
    const cartButton = document.querySelector('.header_icon_cart');
    const hamburger_cart = document.querySelector('.hamburger_cart');
    const menu_cart = document.querySelector('.modal_menu_cart');

    cartButton.addEventListener('click', function(){
        menu_cart.classList.toggle('active');
    });

    hamburger_cart.addEventListener('click', function(){
        menu_cart.classList.toggle('active');
    });
    
    menu_cart.addEventListener('click', function(event){
        if(event.target.classList.contains('modal_btn_close')){
            menu_cart.classList.remove('active');
        };
    });
}



/* MODAL PRODUCT CATALOG */
function modalProductCatalog(apiInfo){
    const oneProductCatalogHTML = document.querySelector('.main_article_container');
    const fourProductCatalogHTML = document.querySelector('.new_product_container');
    const modalProduct = document.querySelector('.modal_product_catalog');

    oneProductCatalogHTML.addEventListener('click', function(event){ 
        if(event.target.classList.contains('main_catalog_img')){
            const id = Number(event.target.id);
            const productFind = apiInfo.products.find(function (product) {
                return product.id === id;
            });
            if (productFind) {
                openModal(productFind);
            };
        };
    });

    fourProductCatalogHTML.addEventListener('click', function (event) {
        if (event.target.classList.contains('product_catalog_img')) {
            const id = Number(event.target.id);
            const productFind = apiInfo.products.find(function (product) {
                return product.id === id;
            });
            if (productFind) {
                openModal(productFind);
            };
        };
    });

    function openModal(productFind) {
        modalProduct.innerHTML = `  
        <div class="modal_product_description_info">

            <div class="modal_product_img">
                <img src="${productFind.image}" alt="image product">
            </div>

            <div class="modal_product_info">

                <div class="modal_product_description">
                    <p>Description: ${productFind.description}</p>
                </div>

                <div class="modal_product_color">
        
                    <div class="modal_product_button rojo">
                        <button></button>
                        <p>Red</p>
                    </div>
                    <div class="modal_product_button negro">
                        <button></button>
                        <p>Black</p>
                    </div>
                    <div class="modal_product_button blanco">
                        <button></button>
                        <p>White</p>
                    </div>
        
                </div>
            
            </div>

        </div>

        <div class="modal_product_tallas_container">
        
            <div class="modal_product_tallas">
                <h3>Tallas: </h3>

                    <button>S</button>
                    <button>M</button>
                    <button>L</button>
                    <button>XL</button>
                    <button>2XL</button>
                    <button>3XL</button>    
            </div>

            <button id=${productFind.id} class="modal_product_add_cart">Add Cart</button>

        </div>

        <div class="modal_product_price_container">

            <button class="modal_product_btn_close">Close</button>

            <div class="modal_product_price">
                <h3>Nombre:${productFind.name}</h3>
                <h4>Precio: $${productFind.price}</h4>
                <h4>Stock: ${productFind.quantity}</h4>
            </div>

        </div>
            
        `;
        modalProduct.classList.add('active');
    };
};

/* MODAL CART PRODUCt */
function modalCart(apiInfo){
    const cart_productos = document.querySelector('.modal_cart_products');
    let html = '';
    for (const product in apiInfo.cart) {
        const {quantity, price, name, image, id, amount} = apiInfo.cart[product];
        html +=`
            <div class="modal_cart_product">
                    
                <div class="modal_cart_product_img">
                    <img src="${image}" alt="image product">
                </div>

                <div class="modal_cart_product_container">
            
                    <div class="modal_cart_product_description">
                        <h3>${name}</h3>
                        <h4>$${price}</h4>
                        <p>Stock: ${quantity}</p>
                    </div>

                    <div id="${id}" class="modal_cart_counter">
                        <button class="less">-</button>
                        <span>${amount}</span>
                        <button class="plus">+</button>
                        <button class="trash">Delete</button>                   
                    <div>

                </div>
        
            </div>
        `;
    };
    cart_productos.innerHTML = html;
}



/* ONE PRODUCT CATALOG */
function oneProductCatalog(apiInfo){
    const productsHTML = document.querySelector('.main_article_container');
    let html = '';
    const randomIndices = [];
    while (randomIndices.length < 1 && randomIndices.length < apiInfo.products.length) {
        const randomIndex = Math.floor(Math.random() * apiInfo.products.length);
        if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex);
        };
    };

    for (const randomIndex of randomIndices) {
        const product = apiInfo.products[randomIndex];
        html += `
        <article class="main_article">

            <div class="main_image">
                <img class="main_catalog_img" src="${product.image}" id="${product.id}" alt="">
            </div>
           
        </article>

        <article class="main_product">

            <div class="main_product_name">
                <p>${product.name}</p>
            </div>

            <div class="main_price">Price: $${product.price}</div>

            <div class="main_product_text">
                <p>${product.description}</p>
            </div>

            <div class="main_button_product">

                <a href="./products.html"><button class="button_store">Products</button></a>
                
                <button id=${product.id} class="main_catalog_add_cart">Add Cart</button>

            </div>

        </article>
        `;
    };
    productsHTML.innerHTML = html;
};

/* FOUR PRODUCT CATALOG */
function fourProductCatalog(apiInfo){
    const productsHTML = document.querySelector('.new_product_container');
    let html = '';

    const randomIndices = [];
    while (randomIndices.length < 4 && randomIndices.length < apiInfo.products.length) {
        const randomIndex = Math.floor(Math.random() * apiInfo.products.length);
        if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex);
        };
    };

    for (const randomIndex of randomIndices) {
        const product = apiInfo.products[randomIndex];
        html += `
            <div class="product_catalog_box box1">
                    
                <img class="product_catalog_img" src="${product.image}" id="${product.id}" alt="">
                
                <div  class="product_catalog_conteiner">
                
                    <spam class="product_catalog_text">Tipo: ${product.name}</span>
                
                    <div class="product_catalog_info">
                
                        <div class="product_color">
                
                            <div class="product_button rojo">
                                <button></button>
                                <p>Red</p>
                            </div>
                            <div class="product_button negro">
                                <button></button>
                                <p>Black</p>
                            </div>
                            <div class="product_button blanco">
                                <button></button>
                                <p>White</p>
                            </div>
                
                        </div>
                
                        <spam class="product_price">Price: $${product.price}</span>

                        <button id=${product.id} class="product_catalog_add_cart">Add Cart</button>
                
                    </div>
                
                </div>
            
            </div>
        `;
    };
    productsHTML.innerHTML = html;
};



/* CATALOG PRODUCTO ADD TO CART */
function catalogAddToCart(apiInfo){
    const oneProductsCatalog = document.querySelector('.main_article_container');
    const fourProductsCatalog = document.querySelector('.new_product_container');

    oneProductsCatalog.addEventListener('click', function(event){
        if(event.target.classList.contains('main_catalog_add_cart')){
            const id = Number(event.target.id);
            const productFind = apiInfo.products.find(function (product) {
                return product.id === id;
            });
            if (productFind) {
                addModal(productFind);
            };
        };
    });

    fourProductsCatalog.addEventListener('click', function(event){
        if(event.target.classList.contains('product_catalog_add_cart')){
            const id = Number(event.target.id);                
            const productFind = apiInfo.products.find(function(product){              
                return product.id === id;
            });
            if (productFind) {
                addModal(productFind);
            };
        };
    });

    function addModal(productFind) {
        if(productFind.quantify === 0){
            return alert('There are no more products in stock!');
        };
        if(apiInfo.cart[productFind.id]){               
            if(productFind.quantify === apiInfo.cart[productFind].amount){
                return alert('There are no more products in stock!');
            };                 
            apiInfo.cart[productFind.id].amount++;               
        }else{
            productFind.amount = 1;
            apiInfo.cart[productFind.id] = productFind;
            
        };
        window.localStorage.setItem('cart', JSON.stringify(apiInfo.cart));
        modalCart(apiInfo);
        totalCart(apiInfo);
    };
};



/* MODAL PRODUCTO ADD TO CART */
function modalProductAddToCart(apiInfo){
    const productsModal = document.querySelector('.modal_product_catalog');
    productsModal.addEventListener('click', function(event){
        if(event.target.classList.contains('modal_product_add_cart')){
            const id = Number(event.target.id);
            const productFind = apiInfo.products.find(function(product){
                return product.id === id;
            });
            if(productFind.quantify === 0){
                return alert('There are no more products in stock!');
            };
            if(apiInfo.cart[productFind.id]){               
                if(productFind.quantify === apiInfo.cart[productFind].amount){
                    return alert('There are no more products in stock!');
                };          
                apiInfo.cart[productFind.id].amount++;
            }else{
                productFind.amount = 1;
                apiInfo.cart[productFind.id] = productFind;
            };
            window.localStorage.setItem('cart', JSON.stringify(apiInfo.cart));
            console.log();
            modalCart(apiInfo);
            totalCart(apiInfo);
        };
    });
};


/* OPERATIONS CART */
function operationsCart(apiInfo){
    const cart_porducts = document.querySelector('.modal_cart_products');
    cart_porducts.addEventListener('click', function(event){
        if(event.target.classList.contains('plus')){
            const id = Number(event.target.parentElement.id);
            const productFind = apiInfo.products.find(function(product){
                return product.id === id;
            });
            if(apiInfo.cart[productFind.id]){
                if(productFind.quantity === apiInfo.cart[productFind.id].amount){
                    return alert('There are no more products in stock!');
                };
            };
            apiInfo.cart[id].amount++;
        };
        if(event.target.classList.contains('less')){
            const id = Number(event.target.parentElement.id);
            if(apiInfo.cart[id].amount === 1 ){
                const response = confirm ("Do you want to delete the product?");  
                if(!response){
                    return;
                };
                delete apiInfo.cart[id];                                 
            }else{
                apiInfo.cart[id].amount--;
            };
        };
        if(event.target.classList.contains('trash')){
            console.log('Hola');
            const id = Number(event.target.parentElement.id);
            const response = confirm ("Do you want to delete the product?");
            if(!response){
                return;
            }
            delete apiInfo.cart[id];
        };
        window.localStorage.setItem('cart', JSON.stringify(apiInfo.cart));
        modalCart(apiInfo)
        totalCart(apiInfo);
    });
};

/* TOTAL CART */
function totalCart(apiInfo){
    const info_span = document.querySelector('.header_cart_counter');
    const info_total = document.querySelector('.info_total');
    const info_amount = document.querySelector('.info_amount');

    let totalProducts = 0;
    let amountProducts = 0;

    for (const product in apiInfo.cart) {
        amountProducts += apiInfo.cart[product].amount;
        totalProducts += (apiInfo.cart[product].amount * apiInfo.
        cart[product].price);
    }
    info_total.textContent = 'Total: $'+ totalProducts;
    info_amount.textContent = 'Amount: '+ amountProducts;
    info_span.textContent = amountProducts;
};

/* BUY CART */
function buyCart(apiInfo){
    const btnBuy = document.querySelector('.modal_btn_buy');
    btnBuy.addEventListener('click', function(){
        console.log(Object.keys(apiInfo.cart).length);
        if(!Object.keys(apiInfo.cart).length){
            return alert('There are no products in the cart!');
        }
        const response = confirm('Confirm the purchase?');
        if(!response){
            return;
        }
        for(const product of apiInfo.products) {
            const cartProduct = apiInfo.cart[product.id];
            if(product.id === cartProduct?.id){
                product.quantity -= cartProduct.amount;
            };
        };
        apiInfo.cart = {};
        window.localStorage.setItem('products', JSON.stringify(apiInfo.products));
        window.localStorage.setItem('cart', JSON.stringify(apiInfo.cart));
        oneProductCatalog(apiInfo);
        fourProductCatalog(apiInfo);
        modalCart(apiInfo);
        totalCart(apiInfo);
    });
};



/* GET API URL*/
async function getApi(){
    const base_url = 'https://ecommercebackend.fundamentos-29.repl.co';
    try {
        const data = await fetch(base_url);
        const res = await data.json();
        return res;
    } catch (error) {
        console.log(error);
    };
};

/* FUNCTION MAIN */
async function main(){
    const apiInfo = {
        products: JSON.parse(window.localStorage.getItem('products')) || await getApi(),
        cart: JSON.parse(window.localStorage.getItem('cart')) || {},
    };
    dark_mode();
    hamburgerMenu();
    callModalCart();
    callModalCatalog();
    modalProductCatalog(apiInfo);
    modalCart(apiInfo);
    catalogAddToCart(apiInfo);
    modalProductAddToCart(apiInfo);
    operationsCart(apiInfo);
    totalCart(apiInfo);
    buyCart(apiInfo);
    oneProductCatalog(apiInfo);
    fourProductCatalog(apiInfo);

};
main();