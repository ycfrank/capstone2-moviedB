import React from "react";
import { useState } from "react";
import { API_URL, API_KEY } from "../config";

import { TextField, InputAdornment } from "@material-ui/core";
import { getResults } from "../redux/search/searchAction";
import { handleList } from "../redux/handleOpen/listAction";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Search = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetch(`${API_URL}search/movie/?api_key=${API_KEY}&query=${search}`)
      .then((response) => response.json())
      .then((response) => dispatch(getResults(response.results)))
      .catch((error) => setError(error));
    dispatch(handleList(true));

    setSearch("");
    history.push("/");
  };

  return (
    <div>
      <TextField
        variant="outlined"
        value={search}
        type="text"
        onChange={handleInput}
        label="Search movie..."
        style={{ width: "100%" }}
        fullWidth={true}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                type="submit"
                onClick={handleSearch}
                style={{ cursor: "pointer" }}
              />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default Search;
