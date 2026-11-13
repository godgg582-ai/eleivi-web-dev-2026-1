const dishes = [
    {
        keyword: "gazpacho",
        name: "Гаспачо томатный",
        price: 195,
        category: "soup",
        kind: "veg",
        count: "350 г",
        image: "images/soups/gazpacho.jpg"
    },
    {
        keyword: "mushroom_soup",
        name: "Грибной суп-пюре с сухариками",
        price: 185,
        category: "soup",
        kind: "veg",
        count: "330 г",
        image: "images/soups/mushroom_soup.jpg"
    },
    {
        keyword: "norwegian_soup",
        name: "Норвежский суп с лососем",
        price: 270,
        category: "soup",
        kind: "fish",
        count: "330 г",
        image: "images/soups/norwegian_soup.jpg"
    },
    {
        keyword: "ramen",
        name: "Рамен с морепродуктами",
        price: 310,
        category: "soup",
        kind: "fish",
        count: "350 г",
        image: "images/soups/ramen.jpg"
    },
    {
        keyword: "chicken",
        name: "Куриный суп с лапшой",
        price: 210,
        category: "soup",
        kind: "meat",
        count: "350 г",
        image: "images/soups/chicken.jpg"
    },
    {
        keyword: "tomyum",
        name: "Том ям с курицей",
        price: 290,
        category: "soup",
        kind: "meat",
        count: "330 г",
        image: "images/soups/tomyum.jpg"
    },

    {
        keyword: "chicken_cutlets",
        name: "Котлеты из курицы с пюре",
        price: 225,
        category: "main",
        kind: "meat",
        count: "280 г",
        image: "images/main_course/chickencutletsandmashedpotatoes.jpg"
    },
    {
        keyword: "lasagna",
        name: "Лазанья болоньезе",
        price: 385,
        category: "main",
        kind: "meat",
        count: "310 г",
        image: "images/main_course/lasagna.jpg"
    },
    {
        keyword: "fishrice",
        name: "Рыбная котлета с рисом",
        price: 260,
        category: "main",
        kind: "fish",
        count: "270 г",
        image: "images/main_course/fishrice.jpg"
    },
    {
        keyword: "shrimppasta",
        name: "Паста с креветками",
        price: 340,
        category: "main",
        kind: "fish",
        count: "290 г",
        image: "images/main_course/shrimppasta.jpg"
    },
    {
        keyword: "potatoes_mushrooms",
        name: "Жареная картошка с грибами",
        price: 150,
        category: "main",
        kind: "veg",
        count: "250 г",
        image: "images/main_course/friedpotatoeswithmushrooms1.jpg"
    },
    {
        keyword: "pizza",
        name: "Пицца Маргарита",
        price: 320,
        category: "main",
        kind: "veg",
        count: "350 г",
        image: "images/main_course/pizza.jpg"
    },

    {
        keyword: "tunasalad",
        name: "Салат с тунцом",
        price: 250,
        category: "salad",
        kind: "fish",
        count: "220 г",
        image: "images/salads_starters/tunasalad.jpg"
    },
    {
        keyword: "caesar",
        name: "Цезарь с цыпленком",
        price: 290,
        category: "salad",
        kind: "meat",
        count: "250 г",
        image: "images/salads_starters/caesar.jpg"
    },
    {
        keyword: "caprese",
        name: "Капрезе с моцареллой",
        price: 230,
        category: "salad",
        kind: "veg",
        count: "200 г",
        image: "images/salads_starters/caprese.jpg"
    },
    {
        keyword: "frenchfries1",
        name: "Картофель фри с соусом",
        price: 140,
        category: "salad",
        kind: "veg",
        count: "150 г",
        image: "images/salads_starters/frenchfries1.jpg"
    },
    {
        keyword: "frenchfries2",
        name: "Картофель по-деревенски",
        price: 160,
        category: "salad",
        kind: "veg",
        count: "180 г",
        image: "images/salads_starters/frenchfries2.jpg"
    },
    {
        keyword: "saladwithegg",
        name: "Салат с овощами и яйцом",
        price: 190,
        category: "salad",
        kind: "veg",
        count: "210 г",
        image: "images/salads_starters/saladwithegg.jpg"
    },

    {
        keyword: "orangejuice",
        name: "Апельсиновый сок",
        price: 120,
        category: "drink",
        kind: "cold",
        count: "300 мл",
        image: "images/beverages/orangejuice.jpg"
    },
    {
        keyword: "applejuice",
        name: "Яблочный сок",
        price: 100,
        category: "drink",
        kind: "cold",
        count: "300 мл",
        image: "images/beverages/applejuice.jpg"
    },
    {
        keyword: "carrotjuice",
        name: "Морковный сок",
        price: 110,
        category: "drink",
        kind: "cold",
        count: "300 мл",
        image: "images/beverages/carrotjuice.jpg"
    },
    {
        keyword: "cappuccino",
        name: "Капучино",
        price: 180,
        category: "drink",
        kind: "hot",
        count: "250 мл",
        image: "images/beverages/cappuccino.jpg"
    },
    {
        keyword: "greentea",
        name: "Зеленый чай",
        price: 90,
        category: "drink",
        kind: "hot",
        count: "300 мл",
        image: "images/beverages/greentea.jpg"
    },
    {
        keyword: "tea",
        name: "Черный чай",
        price: 80,
        category: "drink",
        kind: "hot",
        count: "300 мл",
        image: "images/beverages/tea.jpg"
    },

    {
        keyword: "donuts",
        name: "Пончики с глазурью",
        price: 130,
        category: "dessert",
        kind: "small",
        count: "100 г",
        image: "images/desserts/donuts.jpg"
    },
    {
        keyword: "donuts2",
        name: "Пончики шоколадные",
        price: 140,
        category: "dessert",
        kind: "small",
        count: "100 г",
        image: "images/desserts/donuts2.jpg"
    },
    {
        keyword: "checheesecake",
        name: "Классический чизкейк",
        price: 210,
        category: "dessert",
        kind: "small",
        count: "110 г",
        image: "images/desserts/checheesecake.jpg"
    },
    {
        keyword: "chocolatecheesecake",
        name: "Шоколадный чизкейк",
        price: 230,
        category: "dessert",
        kind: "medium",
        count: "150 г",
        image: "images/desserts/chocolatecheesecake.jpg"
    },
    {
        keyword: "chocolatecake",
        name: "Шоколадный торт",
        price: 260,
        category: "dessert",
        kind: "medium",
        count: "180 г",
        image: "images/desserts/chocolatecake.jpg"
    },
    {
        keyword: "baklava",
        name: "Пахлава восточная",
        price: 290,
        category: "dessert",
        kind: "large",
        count: "250 г",
        image: "images/desserts/baklava.jpg"
    }
];
