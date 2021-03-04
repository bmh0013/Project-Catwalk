import React from 'react';
import TextField from '@material-ui/core/TextField';

const QuestionSearch = () => (
  <div>
    <form className="qa-search" noValidate autoComplete="off">
      <TextField id="qa-search-bar" label="Search..." variant="filled" size="small" style={{width: 400}}/>
    </form>
  </div>
);

export default QuestionSearch;