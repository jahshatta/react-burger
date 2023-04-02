const createOrderIngredients = [
  {
    _id: "60d3b41abdacab0026a733c7",
    name: "Флюоресцентная булка R2-D3",
    type: "bun",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    __v: 0,
  },
  {
    _id: "60d3b41abdacab0026a733cc",
    name: "Соус Spicy-X",
    type: "sauce",
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: "https://code.s3.yandex.net/react/code/sauce-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
    __v: 0,
  },
  {
    _id: "60d3b41abdacab0026a733c9",
    name: "Мясо бессмертных моллюсков Protostomia",
    type: "main",
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: "https://code.s3.yandex.net/react/code/meat-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
    __v: 0,
  },
  {
    _id: "60d3b41abdacab0026a733d1",
    name: "Плоды Фалленианского дерева",
    type: "main",
    proteins: 20,
    fat: 5,
    carbohydrates: 55,
    calories: 77,
    price: 874,
    image: "https://code.s3.yandex.net/react/code/sp_1.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sp_1-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/sp_1-large.png",
    __v: 0,
  },
  {
    _id: "60d3b41abdacab0026a733c7",
    name: "Флюоресцентная булка R2-D3",
    type: "bun",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    __v: 0,
  },
];
const createOrderResponse = {
  success: true,
  name: "Бессмертный spicy флюоресцентный фалленианский бургер",
  order: {
    ingredients: [
      {
        _id: "60d3b41abdacab0026a733c7",
        name: "Флюоресцентная булка R2-D3",
        type: "bun",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/bun-01.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
        __v: 0,
      },
      {
        _id: "60d3b41abdacab0026a733cc",
        name: "Соус Spicy-X",
        type: "sauce",
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: "https://code.s3.yandex.net/react/code/sauce-02.png",
        image_mobile:
          "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
        __v: 0,
      },
      {
        _id: "60d3b41abdacab0026a733c9",
        name: "Мясо бессмертных моллюсков Protostomia",
        type: "main",
        proteins: 433,
        fat: 244,
        carbohydrates: 33,
        calories: 420,
        price: 1337,
        image: "https://code.s3.yandex.net/react/code/meat-02.png",
        image_mobile:
          "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
        __v: 0,
      },
      {
        _id: "60d3b41abdacab0026a733d1",
        name: "Плоды Фалленианского дерева",
        type: "main",
        proteins: 20,
        fat: 5,
        carbohydrates: 55,
        calories: 77,
        price: 874,
        image: "https://code.s3.yandex.net/react/code/sp_1.png",
        image_mobile: "https://code.s3.yandex.net/react/code/sp_1-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/sp_1-large.png",
        __v: 0,
      },
      {
        _id: "60d3b41abdacab0026a733c7",
        name: "Флюоресцентная булка R2-D3",
        type: "bun",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/bun-01.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
        __v: 0,
      },
    ],
    _id: "642096320905fd001b6236d5",
    owner: {
      name: "Vladimir",
      email: "vovek.zverev@gmail.com",
      createdAt: "2023-02-05T10:31:08.805Z",
      updatedAt: "2023-03-14T22:07:51.924Z",
    },
    status: "done",
    name: "Бессмертный spicy флюоресцентный фалленианский бургер",
    createdAt: "2023-03-26T19:00:02.057Z",
    updatedAt: "2023-03-26T19:00:02.483Z",
    number: 46150,
    price: 4277,
  },
};
const WsOrdersResponse = {
  success: true,
  total: 123,
  totalToday: 456,
  orders: [
    {
      _id: "6429a2450905fd001b626883",
      ingredients: [
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733d3",
        "60d3b41abdacab0026a733d4",
        "60d3b41abdacab0026a733ce",
        "60d3b41abdacab0026a733d0",
        "60d3b41abdacab0026a733ca",
        "60d3b41abdacab0026a733c7",
      ],
      status: "done",
      name: "Экзо-плантаго флюоресцентный минеральный астероидный метеоритный традиционный-галактический бургер",
      createdAt: "2023-04-02T15:41:57.219Z",
      updatedAt: "2023-04-02T15:41:57.783Z",
      number: 47687,
    },
    {
      _id: "6429a2270905fd001b62687f",
      ingredients: ["60d3b41abdacab0026a733cf", "60d3b41abdacab0026a733c7"],
      status: "done",
      name: "Флюоресцентный антарианский бургер",
      createdAt: "2023-04-02T15:41:27.870Z",
      updatedAt: "2023-04-02T15:41:28.388Z",
      number: 47686,
    },
    {
      _id: "6429a2040905fd001b62687c",
      ingredients: ["60d3b41abdacab0026a733cf", "60d3b41abdacab0026a733c7"],
      status: "done",
      name: "Флюоресцентный антарианский бургер",
      createdAt: "2023-04-02T15:40:52.714Z",
      updatedAt: "2023-04-02T15:40:53.258Z",
      number: 47685,
    },
  ],
};

export { createOrderResponse, createOrderIngredients, WsOrdersResponse };