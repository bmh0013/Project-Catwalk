import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { addQuestion } from './helperFunctions';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const AddQuestion = ({ productId, refresh }) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ product_id: productId });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addQuestion(formData)
    .catch(err => console.log(err))
    .then(() => {
      setOpen(false);
      refresh();
    })
  };

  const handleChange = (prop, value) => {
    let data = JSON.parse(JSON.stringify(formData));
    data[prop] = value;
    setFormData(data);
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="add-question-title">Add a Question</h2>
      <form onSubmit={handleSubmit}>
        <InputLabel htmlFor="add-question-question">Question</InputLabel>
        <Input id="add-question-question" onChange={(e) => handleChange('body', e.target.value)} fullWidth/>
        <InputLabel htmlFor="add-question-name">Name</InputLabel>
        <Input id="add-question-name" onChange={(e) => handleChange('name', e.target.value)} fullWidth/>
        <InputLabel htmlFor="add-question-email">Email</InputLabel>
        <Input id="add-question-email" onChange={(e) => handleChange('email', e.target.value)} fullWidth/>
        <Button type="submit" color="primary" variant="outlined">ADD</Button>
      </form>
    </div>
  );

  return (
    <div>
      <Button
        color="primary"
        onClick={handleOpen}
        size="small"
        variant="outlined"
        endIcon={<AddIcon>add</AddIcon>}>
          ADD A QUESTION
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
      >
        {body}
      </Modal>
    </div>
  );
}

export default AddQuestion;