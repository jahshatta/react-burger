import ingredientReducer, {
  initialState,
  fetchIngredients,
} from "./IngredientsSlice";

describe("ingredients reducer", () => {
  it("should handle initial state", () => {
    expect(ingredientReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle addIngredient", () => {
    const payload = {
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
      uuid: "a8bc3d1f-e1b1-4033-b2f3-b1f5f427c444",
    };
    expect(
      ingredientReducer(initialState, {
        type: "ingredients/addIngredient",
        payload,
      })
    ).toEqual({
      ...initialState,
      selectedIngredients: [payload],
      countMap: {
        [payload._id]: 1,
      },
    });
  });
  it("should handle resetConstrutor", () => {
    expect(
      ingredientReducer(initialState, {
        type: "ingredients/resetConstrutor",
      })
    ).toEqual({
      ...initialState,
      selectedBuns: [],
      selectedIngredients: [],
      countMap: {},
    });
  });

  it("should handle addBun", () => {
    const payload = {
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
      uuid: "a8bc3d1f-e1b1-4033-b2f3-b1f5f427c444",
    };
    const top = {
      ...payload,
      name: "Флюоресцентная булка R2-D3 (верх)",
    };
    const bottom = {
      ...payload,
      name: "Флюоресцентная булка R2-D3 (низ)",
    };
    expect(
      ingredientReducer(initialState, {
        type: "ingredients/addBun",
        payload,
      })
    ).toEqual({
      ...initialState,
      selectedBuns: [top, bottom],
      countMap: {
        [payload._id]: 1,
      },
    });
  });

  it("should handle removeIngredient", () => {
    const payload = {
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
      uuid: "a8bc3d1f-e1b1-4033-b2f3-b1f5f427c444",
    };
    const state = {
      ...initialState,
      selectedIngredients: [payload],
      countMap: {
        [payload._id]: 1,
      },
    };
    expect(
      ingredientReducer(state, {
        type: "ingredients/removeIngredient",
        payload,
      })
    ).toEqual({
      ...initialState,
      selectedIngredients: [],
      countMap: {},
    });
  });

  it("should handle setCurrentIngredient", () => {
    const payload = "60d3b41abdacab0026a733c9";
    expect(
      ingredientReducer(initialState, {
        type: "ingredients/setCurrentIngredient",
        payload,
      })
    ).toEqual({
      ...initialState,
      currentIngredientId: payload,
    });
  });

  it("should handle fetchIngredients.pending", () => {
    expect(
      ingredientReducer(initialState, {
        type: fetchIngredients.pending,
      })
    ).toEqual({
      ...initialState,
      status: "loading",
    });
  });

  it("should handle fetchIngredients.fulfilled", () => {
    const payload = [
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
    ];
    expect(
      ingredientReducer(initialState, {
        type: fetchIngredients.fulfilled,
        payload,
      })
    ).toEqual({
      ...initialState,
      status: "succeeded",
      ingredients: payload,
    });
  });

  it("should handle fetchIngredients.rejected", () => {
    const error = new Error("Something went wrong.");
    expect(
      ingredientReducer(initialState, {
        type: fetchIngredients.rejected,
        error,
      })
    ).toEqual({
      ...initialState,
      status: "failed",
      error: error.message,
    });
  });
});
