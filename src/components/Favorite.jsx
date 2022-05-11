import React from "react";
import { Button, Typography, Divider } from "@material-ui/core";
import { useEffect } from "react";
import { db } from "../firebase";
import { useState } from "react";
import { useSelector } from "react-redux";
import { IMAGE_URL, POSTER_SIZE } from "../config";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const user = useSelector((state) => state.user.user);
  const useruid = user?.uid;
  const [count, setCount] = useState(0)

  useEffect(() => {
    db.collection(`${useruid}`).orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
      setFavorites(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
    });
    
  }, [useruid]);


  useEffect(()=>{
    setCount(favorites.length)
  },[favorites])

  const handleDelete = async (id) => {
    await db.collection(`${useruid}`).doc(id).delete();
  };

  const renderCards = favorites.map((favorite, index) => {
    return (
      <tr key={index}>
        <td style={{ textAlign: "center" }}>
          <Link to={`/movie/${favorite.movieId}`}>
            <img
              src={`${IMAGE_URL}${POSTER_SIZE}${favorite.movieImage}`}
              style={{ maxWidth: "100%", maxHeight: "200px" }}
              alt='poster'
            />
          </Link>
        </td>
        <td style={{ textAlign: "center" }}>{favorite.movieTitle}</td>
        <td style={{ textAlign: "center" }}>{favorite.movieRuntime} mins</td>
        <td style={{ textAlign: "center" }}>
          <Button onClick={() => handleDelete(favorite.id)}>
            <DeleteIcon color="secondary" />
          </Button>
        </td>
      </tr>
    );
  });



  return (
    <div>
      <div style={{ width: "95%", margin: "0 auto", padding: "1rem" }}>
        <Typography variant="h4" style={{ paddingBottom: "10px" }}>
          {user?.displayName}'s favorite movies
        </Typography>
        <Typography>{count} {count > 1 ? 'movies on the list.' : 'movie on the list.'}  </Typography>
        <Divider />
        <table>
          <thead>
            <tr>
              <th>Poster</th>
              <th>Movie title</th>
              <th>Movie Runtime</th>
              <th>Remove from favorites</th>
            </tr>
          </thead>
          <tbody>{renderCards}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Favorite;
