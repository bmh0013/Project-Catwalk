import React, { useState, useEffect } from "react";
import Input from "@material-ui/core/Input";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";

const QuestionSearch = ({ handleSearch }) => {
  return (
    <div>
      <form
        className="qa-search"
        noValidate
        autoComplete="off"
        style={{ resize: { fontSize: 16 } }}
      >
        <Input
          id="qa-search-bar"
          defaultValue="Have a question? Search for answers..."
          variant="outlined"
          size="large"
          onChange={(e) => handleSearch(e.target.value)}
          fullWidth
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon></SearchIcon>
            </InputAdornment>
          }
        />
      </form>
    </div>
  );
};

export default QuestionSearch;
