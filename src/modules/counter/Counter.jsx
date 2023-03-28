import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset, incrementByAmount } from "./counterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  const [incrementAmount, setIncrementAmount] = useState(0);
  const addValue = Number(incrementAmount) || 0;

  const resetAll = () => {
    setIncrementAmount(0);
    dispatch(reset());
  };

  return (
    <div>
      <p>{count}</p>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>
      <div>
        <input
          type="text"
          value={incrementAmount || 0}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
      </div>
      <div>
        <button onClick={resetAll}>Reset</button>
        <button onClick={() => dispatch(incrementByAmount(addValue))}>
          Add mount
        </button>
      </div>
    </div>
  );
};

export default Counter;
