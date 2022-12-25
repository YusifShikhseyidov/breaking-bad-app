import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCharacters } from "../redux/charactersSlice";
import BounceLoader from "react-spinners/BounceLoader";

function Home() {
  const data = useSelector((state) => state.characters.personas);
  const status = useSelector((state) => state.characters.status);
  const error = useSelector((state) => state.characters.error);
  const nextCharacters = useSelector((state) => state.characters.page);

  const dispatch = useDispatch();

  useEffect(() => {
    if(status === 'idle'){
      dispatch(fetchCharacters());
    }
    
  }, [dispatch, status]);

  console.log(data);

  return (
    <div className="all-container">
      {/* Characters display screen */}
      {data.map((p, index)=>(
        <div className="container" key={index}>
          <div className="card">
            <div className="front">
              <img src={p.img} alt={p.name} />
            </div>
            <div className="back">
              <p>
                {p.name}-<span>{p.nickname}</span>
              </p>
              <p>Portrayed by: {p.portrayed}</p>
              <p>Appeared in following seasons: {p.appearance}</p>
            </div>
          </div>
        </div>
      ))}
      {status === 'loading' && <div className="loading"><BounceLoader
        color={'#2FE9E9'}
        loading={status}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></div>}
      {error && status !== 'loading' && <div className="error">Error: {error}</div>}
      {/* Button to see the other characters */}
      <div className="btn-container">
        {status !== 'loading' && (
          <button onClick={() => dispatch(fetchCharacters(nextCharacters))}>
            See More {nextCharacters}
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;