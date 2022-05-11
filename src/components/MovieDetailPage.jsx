import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_URL, IMAGE_SIZE } from "../config";
import { Button, Typography } from "@material-ui/core";
import GridPart from "./GridPart";
import MainImage from "./MainImage";
import { useSelector, useDispatch } from "react-redux";
import { getFavorite } from "../redux/favorite/favoriteAction";
import { db } from "../firebase";

const MovieDetailPage = (props) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const movieId = props.match.params.movieId;
  const [movies, setMovies] = useState([]);
  const [cast, setCast] = useState([]);
  const [toggleCast, setToggleCast] = useState(false);
  const useruid = user?.uid;
  const [favorites, setFavorites] = useState([]);
  const newtime = new Date().toLocaleString();

  useEffect(() => {
    fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
      .then((response) => response.json())
      .then((response) => {
        setMovies(response);

        fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
          .then((response) => response.json())
          .then((response) => {
            setCast(response.cast);
          });
      });
  }, [props.match.params.movieId]);

  function hanldeCast() {
    setToggleCast(!toggleCast);
  }
  const addToFavorite = () => {
    dispatch(
      getFavorite({
        movieId: movieId,
      })
    );

    db.collection(`${useruid}`).add({
      userId: user.uid,
      movieId: movieId,
      movieTitle: movies.original_title,
      movieRuntime: movies.runtime,
      movieImage: movies.backdrop_path,
      timestamp: newtime
    });
  };

  useEffect(() => {
    db.collection(`${useruid}`).onSnapshot((snapshot) => {
      setFavorites(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
    });
  }, [useruid]);

  const removeFavorite = async (id) => {
    await db.collection(`${useruid}`).doc(id).delete();
  };

  const elementIndex = favorites.find((element) => element.movieId === movieId);

  return (
    <div>
      {movies && (
        <MainImage
          image={`${IMAGE_URL}${IMAGE_SIZE}${movies.backdrop_path}`}
          title={movies.original_title}
          text={movies.overview}
        />
      )}

      <div style={{ width: "85%", margin: "1rem auto" }}>
        {user && (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {elementIndex ? (
              <Button
                variant="contained"
                onClick={() => removeFavorite(elementIndex?.id)}
                type="button"
              >
                Remove from favorites
              </Button>
            ) : (
              <Button variant="contained" onClick={addToFavorite} type="button">
                Add to favorite
              </Button>
            )}
          </div>
        )}
        <div>
          <p style={{ display: "flex", justifyContent: "flex-start" }}>
            {" "}
            More info
          </p>
        </div>
      </div>

      <div
        style={{
          width: "85%",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          padding: "2rem",
        }}
      >
        <div>
          <Typography variant="h5">Title: {movies.original_title}</Typography>
          <Typography style={{ color: "gray" }}>{movies.tagline}</Typography>
        </div>
        <div>
          <Typography>Runtime: {movies.runtime} minutes</Typography>
          <Typography>Budget: ${movies.budget}</Typography>
          <Typography>Release date: {movies.release_date}</Typography>
          <Typography>Status: {movies.status}</Typography>
        </div>
      </div>

      {toggleCast && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {cast &&
            cast.map((crew, index) => (
              
              <React.Fragment key={index}>
                {crew.profile_path && (
                  <GridPart
                  crew={crew}
                    actor
                    image={`${IMAGE_URL}w500${crew.profile_path}`}
                  />
                )}
              </React.Fragment>
            ))}
        </div>
      )}

      <div
        style={{ display: "flex", justifyContent: "center", padding: "2rem" }}
      >
        <Button variant="contained" onClick={hanldeCast}>
          {!toggleCast ? "Show Cast" : "Hide Cast"}
        </Button>
      </div>
    </div>
  );
};

export default MovieDetailPage;
