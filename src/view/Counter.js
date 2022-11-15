import { increment, decerment, reset, incrementByAmount } from "../features/counter/sliceCounter"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";

const Counter = () => {
    const { count } = useSelector(state => state.counter);
    const [incrementAmount, setIncrementAmount] = useState(0);


    const addValue = Number(incrementAmount) || 0;
    const dispatch = useDispatch();

    return (
        <section>
            <h3>{count}</h3>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decerment())}>-</button>
            <button onClick={() => dispatch(reset())}>reset</button>


            <input type="text" onChange={(e) => setIncrementAmount(e.target.value)} />
            <button onClick={() => dispatch(incrementByAmount(addValue))}>Add</button>
        </section>
    )
}

export default Counter