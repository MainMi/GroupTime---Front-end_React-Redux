import { useState } from "react";

const emptyValidFn = (vl) => vl;

const useInput = (initialValue, validateFn = emptyValidFn) => {
    const [enteredValue, setEnteredValue] = useState(initialValue)
    const [didEdit, setDidEdit] = useState(false)

    const validValue = validateFn(enteredValue);

    const inputChangeHandler = (event) => {
        setEnteredValue(event.target.value)
    }

    const inputBlurHandler = (event) => {
        setDidEdit(true);
    }

    const resetFn = () => {
        setEnteredValue('');
        setDidEdit(false);
    }

    return {
        value: enteredValue,
        isValidInput: !(validValue.lenght),
        error: didEdit && validValue,
        inputChangeHandler,
        inputBlurHandler,
        resetFn
    }
}

export default useInput;