import Metric from "./components/Metric";
import store from "./assets/store.jpg";
import { Button } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";

function App() {
  const handleUndo = () => {};
  const handleSave = () => {};
  const handleClose = () => {};

  const [borderCoordinates, setBorderCoordinates] = useState([]);
  const [startCoords, setStartCoords] = useState({ x: 0, y: 0 });
  const [endCoords, setEndCoords] = useState({ x: 0, y: 0 });
  const [currentCoords, setCurrentCoords] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [metrics, setMetrics] = useState([]);

  const canvasRef = useRef(null);

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setBorderCoordinates([]);
    setMetrics([]);
    setStartCoords({ x: 0, y: 0 });
    setEndCoords({ x: 0, y: 0 });
    setCurrentCoords({ x: 0, y: 0 });
    setIsDragging(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 1000;
    canvas.height = 550;
    const ctx = canvas.getContext("2d");

    //clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the saved borders
    borderCoordinates.forEach((border) => {
      const { startCoords, endCoords } = border;
      const left = Math.min(startCoords.x, endCoords.x);
      const top = Math.min(startCoords.y, endCoords.y);
      const width = Math.abs(startCoords.x - endCoords.x);
      const height = Math.abs(startCoords.y - endCoords.y);
      ctx.strokeStyle = "green";
      ctx.strokeRect(left, top, width, height);
      //write a text beneath the border
      ctx.fillStyle = "red";
      ctx.font = "13px Arial";
      ctx.fillText(
        `Bay ${borderCoordinates.indexOf(border) + 1}`,
        left + width / 2 - 20,
        top + height + 20
      );
    });

    // Draw the current border
    if (isDragging) {
      const left = Math.min(startCoords.x, currentCoords.x);
      const top = Math.min(startCoords.y, currentCoords.y);
      const width = Math.abs(startCoords.x - currentCoords.x);
      const height = Math.abs(startCoords.y - currentCoords.y);
      ctx.strokeStyle = "green";
      ctx.strokeRect(left, top, width, height);
    }
  }, [borderCoordinates, startCoords, endCoords, currentCoords, isDragging]);

  const handleMouseDown = (event) => {
    event.preventDefault(); // Prevent default behavior to avoid text selection
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setStartCoords({ x, y });
    setCurrentCoords({ x, y }); // Set current coordinates initially to start coordinates
    setIsDragging(true);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setCurrentCoords({ x, y });
  };

  const handleMouseUp = (event) => {
    setIsDragging(false);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setEndCoords({ x, y }); // Set end coordinates when mouse is released
    // Save the drawn border coordinates
    setBorderCoordinates([
      ...borderCoordinates,
      { startCoords, endCoords: { x, y } },
    ]);
    // Calculate metrics
    const width = Math.abs(startCoords.x - endCoords.x);
    const height = Math.abs(startCoords.y - endCoords.y);
    setMetrics([...metrics, { width, height }]);
    console.log(metrics);
    console.log(borderCoordinates);
  };

  return (
    <main className="container overflow-hidden">
      <div className="flex justify-between py-4 mb-10 bg-yellow-200">
        <div className="font-bold text-left ml-9">NeoPhyte Store</div>
        <div className="flex justify-between items-center text-right gap-5 mr-7">
          <Button variant="light" onClick={handleClear}>
            Clear
          </Button>
          <Button variant="light" onClick={handleUndo}>
            Undo
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </div>
      </div>

      <div className="flex mt-10">
        <div className="w-4/6 relative">
          <div
            className="relative w-full h-full"
            onMouseDown={(event) => handleMouseDown(event)}
            onMouseMove={(event) => handleMouseMove(event)}
            onMouseUp={(event) => handleMouseUp(event)}
          >
            <img alt="store" src={store} className="relative w-full h-auto" />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 pointer-events-none"
            />
          </div>
        </div>
        <div className="ml-16 flex flex-col w-fit">
          <div className="flex flex-row p-3 font-bold gap-14 w-full bg-slate-400">
            <h4>Bay No.</h4>
            <h4>Brand</h4>
            <h4>Actions</h4>
          </div>
          {metrics.map((metric, index) => (
            <Metric
              key={index}
              index={index + 1}
              width={metric.width}
              height={metric.height}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
