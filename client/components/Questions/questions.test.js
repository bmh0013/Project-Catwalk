import API from "../../../api";

//successfully retrieves questions and answers for the right product_id
test("successfully retrieves questions", () => {
  let options = {
    product_id: 21111,
    page: 1,
    count: 200,
  };

  API.getQuestions(options).then((response) => {
    expect(response.data.product_id).toBe("21111");
  });
});
