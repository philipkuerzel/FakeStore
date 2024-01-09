fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then((data) => {
        products = data;
        displayProducts(data);
    })
    .catch((err) => console.log(err));

let productContainer = document.querySelector(".product-container");
let products;

const displayProducts = (products) => {
    productContainer.innerHTML = "";

    products.forEach((product) => {
        const productTitle = product.title;
        const productImg = product.image;
        const productPrice = product.price;

        let productItem = document.createElement("article");
        let priceAndCard = document.createElement("div");

        const img = document.createElement("img");
        img.setAttribute("src", productImg);
        productItem.appendChild(img);

        let title = document.createElement("h4");
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

const sortProducts = (sortType) => {
    if (sortType === "priceUp") {
        products.sort((a, b) => a.price - b.price);
    } else if (sortType === "priceDown") {
        products.sort((a, b) => b.price - a.price);
    }

    displayProducts(products);
};

const filterProducts = (category) => {
    const filteredProducts = category === 'all' ? products : products.filter(
        (product) => product.category.toLowerCase().includes(category)
    );
    displayProducts(filteredProducts);
};

const searchProducts = () => {
    const searchInput = document.getElementById("search").value.toLowerCase();
    const searchedProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchInput)
    );
    displayProducts(searchedProducts);
};

document.getElementById("sort").addEventListener("change", (event) => {
    const selectedSort = event.target.value;
    sortProducts(selectedSort);
});

document.getElementById("search").addEventListener("keyup", (event) => {
    event.preventDefault();
    searchProducts();
});


