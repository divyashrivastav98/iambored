import { useEffect, useRef, useState } from "react"
import Card from "./components/Card";

export default function App() {
  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);
  const typeRef = useRef();
  const participantsRef = useRef();

  useEffect(() => {
    const response = fetch("http://localhost:4000")
      .then(response => response.json())
      .then(data => setActivity(data))
      .catch(err => console.error(err));
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    fetch("http://localhost:4000/submit", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: typeRef.current.value,
        participants: participantsRef.current.value
      })
    })
    .then(response => response.json())
    .then(data => {
      setError(null);
      setActivity(null);

      if (data.err) {
        setError(data.err);
        return;
      }

      const randomIndex = Math.floor(Math.random() * data.length);
      if (randomIndex !== 'NaN') {
        setActivity(data[randomIndex]);
      } else {
        setActivity(data);
      }
    })
    .catch(err => console.error(err));
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center gap-5">
      <h1>Lets find something for you to do!</h1>
      <form onSubmit={submitHandler} className="flex gap-4">
        <select name="type" ref={typeRef}>
          <option value="random" defaultValue>Random type</option>
          <option value="education">Education</option>
          <option value="charity">Charity</option>
          <option value="recreational">Recreational</option>
          <option value="relaxation">Relaxation</option>
          <option value="busywork">Busywork</option>
          <option value="social">Social</option>
          <option value="diy">DIY</option>
          <option value="music">Music</option>
        </select>
        <select name="participants" ref={participantsRef}>
          <option value="random" defaultValue>Any Number of participants</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <button type="submit" className="p-2 bg-slate-400">Go</button>
      </form>
      {error && <p>{error}</p>}
      {activity !== null && <Card activity={activity.activity} 
                                  type={activity.type} 
                                  participants={activity.participants}>
                            </Card>
      }
    </div>    
  )
}