
import { useEffect, useRef, useState } from "react";
import Menu from "./components/Menu.js";
import "./App.css";

function App() {
	const canvasRef = useRef(null);
	const ctxRef = useRef(null);
	const [isDrawing, setIsDrawing] = useState(false);
	const [lineWidth, setLineWidth] = useState(5);
	const [lineColor, setLineColor] = useState("black");
	const [lineOpacity, setLineOpacity] = useState(0.1);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		ctx.globalAlpha = lineOpacity;
		ctx.strokeStyle = lineColor;
		ctx.lineWidth = lineWidth;
		ctxRef.current = ctx;
	}, [lineColor, lineOpacity, lineWidth]);

	const startDrawing = (e) => {
		ctxRef.current.beginPath();
		ctxRef.current.moveTo(
			e.nativeEvent.offsetX,
			e.nativeEvent.offsetY
		);
		setIsDrawing(true);
	};

	
	const endDrawing = () => {
		ctxRef.current.closePath();
		setIsDrawing(false);
	};

	const draw = (e) => {
		if (!isDrawing) {
			return;
		}
		ctxRef.current.lineTo(
			e.nativeEvent.offsetX,
			e.nativeEvent.offsetY
		);

		ctxRef.current.stroke();
	};

	return (
    <>
    
            
		<div className="App">
			<h1>يا تمتص ديك</h1>
      <div className="head">
      <a href="./font/downoload" download="untilted.png" className="downoload">
      <img
  class="fit-picture"
  src="https://cdn4.iconfinder.com/data/icons/essentials-72/24/009_-_Folder-512.png"
/>
      </a>
      
      <a href="https://google.com">
        <img class="fit-picture" src="https://cdn3.iconfinder.com/data/icons/shadcon/512/circle_-_corss-512.png"/>
      </a>
    </div>
			<div className="draw-area">
				<Menu
					setLineColor={setLineColor}
					setLineWidth={setLineWidth}
					setLineOpacity={setLineOpacity}
				/>
				<canvas
					onMouseDown={startDrawing}
					onMouseUp={endDrawing}
					onMouseMove={draw}
					ref={canvasRef}
					width={`1280px`}
					height={`720px`}
				/>
			</div>
		</div>
    
    </>
	);
}

export default App;
