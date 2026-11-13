const defaultDishes = [
    {
        id: 1,
        keyword: "gazpacho",
        name: "Гаспачо томатный",
        price: 195,
        category: "soup",
        kind: "veg",
        count: "350 г",
        image: "images/soups/gazpacho.jpg"
    },
    {
        id: 2,
        keyword: "mushroom_soup",
        name: "Грибной суп-пюре с сухариками",
        price: 185,
        category: "soup",
        kind: "veg",
        count: "330 г",
        image: "images/soups/mushroom_soup.jpg"
    },
    {
        id: 3,
        keyword: "norwegian_soup",
        name: "Норвежский суп с лососем",
        price: 270,
        category: "soup",
        kind: "fish",
        count: "330 г",
        image: "images/soups/norwegian_soup.jpg"
    },
    {
        id: 4,
        keyword: "ramen",
        name: "Рамен с морепродуктами",
        price: 310,
        category: "soup",
        kind: "fish",
        count: "350 г",
        image: "images/soups/ramen.jpg"
    },
    {
        id: 5,
        keyword: "chicken",
        name: "Куриный суп с лапшой",
        price: 210,
        category: "soup",
        kind: "meat",
        count: "350 г",
        image: "images/soups/chicken.jpg"
    },
    {
        id: 6,
        keyword: "tomyum",
        name: "Том ям с курицей",
        price: 290,
        category: "soup",
        kind: "meat",
        count: "330 г",
        image: "images/soups/tomyum.jpg"
    },

    {
        id: 7,
        keyword: "chicken_cutlets",
        name: "Котлеты из курицы с пюре",
        price: 225,
        category: "main",
        kind: "meat",
        count: "280 г",
        image: "images/main_course/chickencutletsandmashedpotatoes.jpg"
    },
    {
        id: 8,
        keyword: "lasagna",
        name: "Лазанья болоньезе",
        price: 385,
        category: "main",
        kind: "meat",
        count: "310 г",
        image: "images/main_course/lasagna.jpg"
    },
    {
        id: 9,
        keyword: "fishrice",
        name: "Рыбная котлета с рисом",
        price: 260,
        category: "main",
        kind: "fish",
        count: "270 г",
        image: "images/main_course/fishrice.jpg"
    },
    {
        id: 10,
        keyword: "shrimppasta",
        name: "Паста с креветками",
        price: 340,
        category: "main",
        kind: "fish",
        count: "290 г",
        image: "images/main_course/shrimppasta.jpg"
    },
    {
        id: 11,
        keyword: "potatoes_mushrooms",
        name: "Жареная картошка с грибами",
        price: 150,
        category: "main",
        kind: "veg",
        count: "250 г",
        image: "images/main_course/friedpotatoeswithmushrooms1.jpg"
    },
    {
        id: 12,
        keyword: "pizza",
        name: "Пицца Маргарита",
        price: 320,
        category: "main",
        kind: "veg",
        count: "350 г",
        image: "images/main_course/pizza.jpg"
    },

    {
        id: 13,
        keyword: "tunasalad",
        name: "Салат с тунцом",
        price: 250,
        category: "salad",
        kind: "fish",
        count: "220 г",
        image: "images/salads_starters/tunasalad.jpg"
    },
    {
        id: 14,
        keyword: "caesar",
        name: "Цезарь с цыпленком",
        price: 290,
        category: "salad",
        kind: "meat",
        count: "250 г",
        image: "images/salads_starters/caesar.jpg"
    },
    {
        id: 15,
        keyword: "caprese",
        name: "Капрезе с моцареллой",
        price: 230,
        category: "salad",
        kind: "veg",
        count: "200 г",
        image: "images/salads_starters/caprese.jpg"
    },
    {
        id: 16,
        keyword: "frenchfries1",
        name: "Картофель фри с соусом",
        price: 140,
        category: "salad",
        kind: "veg",
        count: "150 г",
        image: "images/salads_starters/frenchfries1.jpg"
    },
    {
        id: 17,
        keyword: "frenchfries2",
        name: "Картофель по-деревенски",
        price: 160,
        category: "salad",
        kind: "veg",
        count: "180 г",
        image: "images/salads_starters/frenchfries2.jpg"
    },
    {
        id: 18,
        keyword: "saladwithegg",
        name: "Салат с овощами и яйцом",
        price: 190,
        category: "salad",
        kind: "veg",
        count: "210 г",
        image: "images/salads_starters/saladwithegg.jpg"
    },

    {
        id: 19,
        keyword: "orangejuice",
        name: "Апельсиновый сок",
        price: 120,
        category: "drink",
        kind: "cold",
        count: "300 мл",
        image: "images/beverages/orangejuice.jpg"
    },
    {
        id: 20,
        keyword: "applejuice",
        name: "Яблочный сок",
        price: 100,
        category: "drink",
        kind: "cold",
        count: "300 мл",
        image: "images/beverages/applejuice.jpg"
    },
    {
        id: 21,
        keyword: "carrotjuice",
        name: "Морковный сок",
        price: 110,
        category: "drink",
        kind: "cold",
        count: "300 мл",
        image: "images/beverages/carrotjuice.jpg"
    },
    {
        id: 22,
        keyword: "cappuccino",
        name: "Капучино",
        price: 180,
        category: "drink",
        kind: "hot",
        count: "250 мл",
        image: "images/beverages/cappuccino.jpg"
    },
    {
        id: 23,
        keyword: "greentea",
        name: "Зеленый чай",
        price: 90,
        category: "drink",
        kind: "hot",
        count: "300 мл",
        image: "images/beverages/greentea.jpg"
    },
    {
        id: 24,
        keyword: "tea",
        name: "Черный чай",
        price: 80,
        category: "drink",
        kind: "hot",
        count: "300 мл",
        image: "images/beverages/tea.jpg"
    },

    {
        id: 25,
        keyword: "donuts",
        name: "Пончики с глазурью",
        price: 130,
        category: "dessert",
        kind: "small",
        count: "100 г",
        image: "images/desserts/donuts.jpg"
    },
    {
        id: 26,
        keyword: "donuts2",
        name: "Пончики шоколадные",
        price: 140,
        category: "dessert",
        kind: "small",
        count: "100 г",
        image: "images/desserts/donuts2.jpg"
    },
    {
        id: 27,
        keyword: "checheesecake",
        name: "Классический чизкейк",
        price: 210,
        category: "dessert",
        kind: "small",
        count: "110 г",
        image: "images/desserts/checheesecake.jpg"
    },
    {
        id: 28,
        keyword: "chocolatecheesecake",
        name: "Шоколадный чизкейк",
        price: 230,
        category: "dessert",
        kind: "medium",
        count: "150 г",
        image: "images/desserts/chocolatecheesecake.jpg"
    },
    {
        id: 29,
        keyword: "chocolatecake",
        name: "Шоколадный торт",
        price: 260,
        category: "dessert",
        kind: "medium",
        count: "180 г",
        image: "images/desserts/chocolatecake.jpg"
    },
    {
        id: 30,
        keyword: "baklava",
        name: "Пахлава восточная",
        price: 290,
        category: "dessert",
        kind: "large",
        count: "250 г",
        image: "images/desserts/baklava.jpg"
    }
];

let dishes = [];

const DISHES_API_URL =
    "https://edu.std-900.ist.mospolytech.ru/labs/api/dishes";

async function loadDishes() {
    try {
        const response = await fetch(DISHES_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        dishes = await response.json();
    } catch (err) {
        console.warn("API unavailable, fallback to default dishes:", err);
        dishes = [...defaultDishes];
    }
    return dishes;
}
