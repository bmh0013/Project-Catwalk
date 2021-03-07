import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { addAnswer } from './helperFunctions';

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

const AddAnswer = ({ question_id, refresh }) => {
  const classes = useStyles();
  const [modalStyle] = useState({
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  });
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ question_id: question_id });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addAnswer(formData)
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
      <h2 id="add-answer-title">Add an Answer</h2>
      <form onSubmit={handleSubmit}>
        <InputLabel htmlFor="add-answer-answer">Answer</InputLabel>
        <Input id="add-answer-answer" onChange={(e) => handleChange('body', e.target.value)} fullWidth/>
        <InputLabel htmlFor="add-answer-name">Name</InputLabel>
        <Input id="add-answer-name" onChange={(e) => handleChange('name', e.target.value)} fullWidth/>
        <InputLabel htmlFor="add-answer-email">Email</InputLabel>
        <Input id="add-answer-email" onChange={(e) => handleChange('email', e.target.value)} fullWidth/>
        <Button type="submit" color="primary" variant="outlined">ADD</Button>
      </form>
    </div>
  );

  return (
    <div>
      <Link
        color="primary"
        onClick={handleOpen}>
        Add Answer
      </Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-answer-title"
      >
        {body}
      </Modal>
    </div>
  );
}

export default AddAnswer;