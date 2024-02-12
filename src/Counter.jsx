import { useState } from "react";
import "./css/Counter.css";

const Counter = () => {

    const [count,setCount] = useState(0)
    return(
        <div>
            <div>
                 <h4>Counter Program</h4>
            </div>
            <div className="counter">
                <div className="group">
                    <button className="counterButton" onClick={() => setCount((count) => count + 1)}>+1</button>
                    <button className="counterButton" onClick={() => setCount((count) => count - 1 )}>-1</button>
                </div>
                <div className="group">
                    <button className="counterButton" onClick={() => setCount((count) => count + 2)}>+2</button>
                    <button className="counterButton" onClick={() => setCount((count) => count - 2)}>-2</button>
                </div>
                <div className="group">
                    <button className="counterButton" onClick={() => setCount((count) => count + 5)}>+5</button>
                    <button className="counterButton" onClick={() => setCount((count) => count - 5)}>-5</button>
                </div>
            </div>

            
            <h4>count is {count}</h4>
        </div>
    );
}

export default Counter;
