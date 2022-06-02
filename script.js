const search = document.querySelector(".search");
const showItems = document.querySelector(".show-items");
const searchInput = document.querySelector(".search-input");

//Search function
const searchData = async (searchText) => {
  const res = await fetch("/quick-search/db/data.json");
  const data = await res.json();

  //Test
  //console.log(data)

  //Filter the data as per input
  let matches = data.filter((dat) => {
   const regularExpression = new RegExp(`^${searchText}`, "gi");
    return (
      dat.name.match(regularExpression) || dat.second.match(regularExpression)
    );
  });

  if(searchText.length === 0){
    matches = []
  }

  console.log(matches);
  renderData(matches)
  
};

//Dom output
const renderData = (matches) => {
  if(matches.length > 0){
    const data = matches.map(match => `
      <div class="results">
        <h4>${match.name}</h4>
      </div>
    `).join(''); //This join method converts the data into string
    showItems.innerHTML = data
  }
}


searchInput.addEventListener("input", () => searchData(searchInput.value));
