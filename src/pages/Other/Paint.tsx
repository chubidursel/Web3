import React, { useState, useRef, useEffect } from 'react';
//import * as ipfsClient from 'ipfs-http-client';

const Paint: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      setContext(canvasRef.current.getContext('2d'));
    }
  }, []);
  const [color, setColor] = useState('black');
  const [brushSize, setBrushSize] = useState(10);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isPainting, setIsPainting] = useState(false);
  const [prevPos, setPrevPos] = useState({ offsetX: 0, offsetY: 0 });

  const startPaint = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (context) {
      setIsPainting(true);
      setPrevPos({ offsetX: event.clientX, offsetY: event.clientY });
    }
  };

  const finishPaint = () => {
    setIsPainting(false);
  };

  const paint = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isPainting) {
      if (context) {
        context.strokeStyle = color;
        context.lineWidth = brushSize;
        context.beginPath();
        context.moveTo(prevPos.offsetX, prevPos.offsetY);
        context.lineTo(event.clientX, event.clientY);
        context.stroke();
        setPrevPos({ offsetX: event.clientX, offsetY: event.clientY });
        }
        }
        };
        
        const erase = () => {
        if (context) {
        context.clearRect(0, 0, canvasRef.current?.width, canvasRef.current?.height);
        }
        };
        
        const save = async () => {
          console.log("Shalom!")
          // // const ipfs = ipfsClient('cloudflare-ipfs.com', '443', { protocol: 'https' });
          // const ipfs = ipfsClient('ipfs.io', '443', { protocol: 'https' });
          // const canvas = canvasRef.current;
          // const data = canvas.toDataURL();
          // const buffer = Buffer.from(data.split(',')[1], 'base64');
        
          // const results = await ipfs.add(buffer);
          // console.log(results[0].cid.toString());
        }
        
        return (
          <div className="h-screen">
            <h1 className='bg-yellow-300 text-center'>BETA</h1>
            <div className="relative" style={{background:"white", height:"100%"}}>
              <canvas
                ref={canvasRef}
                className="border hover:cursor-crosshair border-gray-400 h-full w-full absolute top-0 left-0"
                onMouseDown={startPaint}
                onMouseUp={finishPaint}
                onMouseLeave={finishPaint}
                onMouseMove={paint}
              />
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-gray-200 p-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={save}>Save</button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full my-2" onClick={erase}>Erase</button>
              <div className="flex mt-2">
                <label className="text-gray-700">Brush size: </label>
                <input type="range" min="1" max="100" value={brushSize} onChange={(e) => setBrushSize(parseInt(e.target.value))} className="ml-2" />
                <span className="ml-2">{brushSize}px</span>
              </div>
              <div className="flex mt-2">
                <label className="text-gray-700">Color: </label>
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="ml-2" />
              </div>
              <h1 className='bg-yellow-300 text-center'>Save to IPFS and then toss CID as a link to generete NFT</h1>

            </div>
          </div>
        );
};

export default Paint;