fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then((data) => {
        products = data;
        displayProducts(data);
    })
    .catch((err) => console.log(err));

let productContainer = document.querySelector(".product-container");    //section for the products
let products;

const displayProducts = (products) => {     // function to render and show the products
    productContainer.innerHTML = "";        

    products.forEach((product) => {
        const productTitle = product.title;     //set the elements from api 
        const productImg = product.image;
        const productPrice = product.price;

        let productItem = document.createElement("article");
        let priceAndCard = document.createElement("div");

        const img = document.createElement("img");
        img.setAttribute("src", productImg);
        productItem.appendChild(img);

        let title = document.createElement("p");
        title.textContent = productTitle;
        productItem.appendChild(title);

        let price = document.createElement("p");
        price.textContent = `$ ${productPrice}`;
        priceAndCard.appendChild(price);

        let addToCartBtn = document.createElement("button");
        addToCartBtn.textContent = "Add to cart";
        priceAndCard.appendChild(addToCartBtn);

        productItem.appendChild(priceAndCard);
        productContainer.appendChild(productItem);
    });
};

const sortProducts = (sortType) => {        // function to sort the products by price (ascending or descending)
    if (sortType === "priceUp") {
        products.sort((a, b) => a.price - b.price);
    } else if (sortType === "priceDown") {
        products.sort((a, b) => b.price - a.price);
    }

    displayProducts(products); // show sorted products
};

const filterProducts = (category) => {      //function to filter products by category (electronics, jewelery, men's clothing or women's clothing)
    const filteredProducts = category === 'all' ? products : products.filter(   // function is called by clicking on the button
        (product) => product.category.toLowerCase().includes(category)
    );
    displayProducts(filteredProducts);  // show filtered products
};

const searchProducts = () => {      // function to search products by given text
    const searchInput = document.getElementById("search").value.toLowerCase();
    const searchedProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchInput)
    );
    displayProducts(searchedProducts);
};

document.getElementById("sort").addEventListener("change", (event) => {     // function sortProducts is called bei changing the select element
    const selectedSort = event.target.value;
    sortProducts(selectedSort);
});

document.getElementById("search").addEventListener("keyup", (event) => {    //function searchProducts is called by typing text into the input field
    event.preventDefault();
    searchProducts();
});