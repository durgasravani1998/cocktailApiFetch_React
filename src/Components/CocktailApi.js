import React, { useState, useEffect } from "react";
// const URL = "www.thecocktaildb.com/api/json/v1/1/search.php?f=a";

const CocktailApi = () => {
  const [drinksData, setDrinksData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({ status: false, msg: "" });

  const fetchDrink = async (apiURL) => {
    setLoading(true);
    setIsError({ status: false, msg: "" });
    try {
      const response = await fetch(apiURL);

      const { drinks } = await response.json();

      console.log(drinks);

      setDrinksData(drinks);
      setLoading(false);
      setIsError({ status: false, msg: "" });

      if (!drinks) {
        throw new Error("data not found");
      }
    } catch (error) {
      setLoading(false);
      setIsError({
        status: true,
        msg: error.message || "Something went wrong",
      });
    }
  };

  useEffect(() => {
    // fetchDrink(URL)}, []);
    const correctURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${
      searchTerm || "margarita"
    }`;

    fetchDrink(correctURL);
  }, [searchTerm]);

  return (
    <div>
      <form>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="search something new"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
      </form>

      {loading && !isError?.status && <h3>Loading..</h3>}
      {isError?.status && <h3 style={{ color: "red" }}>{isError.msg}</h3>}

      {!loading && !isError?.status && (
        <ul className="cocktail-data">
          {drinksData.map((eachDrink) => {
            const { idDrink, strDrink, strDrinkThumb } = eachDrink;
            return (
              <li key={idDrink}>
                <div className="drinkimg">
                  <img src={strDrinkThumb} alt={strDrink} />
                </div>

                <div className="text">
                  <h3>{strDrink}</h3>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CocktailApi;
