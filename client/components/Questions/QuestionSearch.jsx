import React from 'react';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

const QuestionSearch = () => (
  <div>
    <form className="qa-search" noValidate autoComplete="off">
      <Input
        id="qa-search-bar"
        label="Search..."
        variant="outlined"
        size="small"
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

export default QuestionSearch;