import React, { useEffect } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuotes } from "../redux/quotesSlice";

function Quotes() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.characters.personas);
  const status = useSelector((state) => state.quotes.status);
  const error = useSelector((state) => state.quotes.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchQuotes());
    }
  }, [dispatch, status]);

  console.log(data);
  return (
    <div style={{ margin: "4rem 0 0 1rem" }}>
      {status === "succeeded" && (
        <h1 className="quotesHeading">
          Quotes from the legendary TV Series Breaking Bad
        </h1>
      )}
      {status === "succeeded" &&
        data.map((saying) => <div>{saying.quote}</div>)}

      {status === "loading" && (
        <div className="loading">
          <BounceLoader
            color={"#2FE9E9"}
            loading={status}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      {error && status === "failed" && (
        <div className="error">Error: {error}</div>
      )}
    </div>
  );
}

export default Quotes;
