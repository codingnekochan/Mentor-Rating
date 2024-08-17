const params = 9;
console.log(params);

let buttonList = document.querySelector("#fetch-list");
let buttonItem = document.querySelector("#fetch-item");

buttonList.addEventListener("click", fetchCategories);

buttonItem.addEventListener("click", async () => {
  let data = await fetchSubMentors();
  console.log(data);
});

async function fetchCategories() {
  try {
    const response = await fetch(
      "https://rate-your-mentor.fly.dev/api/categories"
    );
    const categories = await response.json();

    return console.log(handleResponse(categories));
  } catch (error) {
    console.log(error);
    console.log("not found");
  }

}
async function fetchSubCategories() {
  try {
    const response = await fetch(
      `https://virtserver.swaggerhub.com/AbdulbakiSuraj/RateYourMentor/1.0.0/categories/${params}`
    );
    const subcategory = await response.json();
    console.log(subcategory);
    return handleSubCategoryResponse(subcategory);
  } catch (error) {
    console.log(error);
    console.log("not found");
  }
}

async function fetchMentors() {
  try {
    const response = await fetch(
      `https://virtserver.swaggerhub.com/AbdulbakiSuraj/RateYourMentor/1.0.0/mentors`
    );
    const mentors = await response.json();
    console.log(mentors);
    return mentors
  } catch (error) {
    console.log(error);
    console.log("not found");
  }
}
async function fetchSubMentors() {
  try {
    const response = await fetch(
      `https://virtserver.swaggerhub.com/AbdulbakiSuraj/RateYourMentor/1.0.0/mentor/${params}`
    );
    const subcategory = await response.json();
    console.log(subcategory);
    return subcategory;
  } catch (error) {
    console.log(error);
    console.log("not found");
  }
}

function handleResponse(response) {
  return (responseObject = response.map((response) => {
    return {
      id: response?.id,
      name: response?.name,
      slug: response?.slug,
      votes: response?.total_votes,
    };
  }));
}

function handleSubCategoryResponse(response) {
  return  responseObject = {
    id: response?.id,
    name: response?.name,
    slug: response?.slug,
    votes: response?.total_votes,
  };
}
document.querySelector('form').onsubmit = ()=>{
    console.log('success!')
}