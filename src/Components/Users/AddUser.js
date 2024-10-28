import { useState, useRef } from "react";

import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    const enteredUsername = nameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;

    event.preventDefault();
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age(non-empty valuee).",
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age(> 0).",
      });
      return;
    }

    props.onAddUser(enteredUsername, enteredAge);
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onError={errorHandler}
        />
      )}
      <Card className={classes.addUser}>
        <form onSubmit={addUserHandler}>
          <div className={classes.addUserProfile}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" ref={nameInputRef} />
            <label htmlFor="age">Age(Years)</label>
            <input type="number" id="age" ref={ageInputRef} />
          </div>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
