const bcrypt = require('bcryptjs');

const data = {
    users: [
        {
            name: "ramzi",
            email: "ramziinfo2001@gmail.com",
            password: bcrypt.hashSync("1234", 8),
            isAdmin: true,
        },
        {
            name: "chiheb",
            email: "chiheb@gmail.com",
            password: bcrypt.hashSync("1234", 8),
            isAdmin: false,
        }
    ],

    products: [
        {
            //id: "1",
            name: "1er type de fourrage",
            category: "first cat",
            image: "/images/fourrage.jpg",
            price: 20,
            description: "high quality product",
        },
        {
            //id: "2",
            name: "2eme type de fourrage",
            category: "first cat",
            image: "/images/fourrage.jpg",
            price: 25,
            description: "high quality product",

        },
        {
            //id: "3",
            name: "3eme type de fourrage",
            category: "first cat",
            image: "/images/fourrage.jpg",
            price: 30,
            description: "high quality product",
        },
    ]

}

module.exports = data;