import React, { useRef, useEffect, useState } from 'react';
// import IPFS from 'ipfs-http-client'
// const ipfs = new IPFS('https://ipfs.infura.io:5001');
// import { useStorageUpload } from "@thirdweb-dev/react";

interface DrawableCanvasProps {
}

const DrawableCanvas: React.FC<DrawableCanvasProps> = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lastX, setLastX] = useState(0);
    const [lastY, setLastY] = useState(0);
    const [color, setColor] = useState("#000000"); // Initial color is black
  
    useEffect(() => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        setContext(ctx);
      }
    }, []);
  
    const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
      setIsDrawing(true);
      setLastX(event.clientX);
      setLastY(event.clientY);
    };
  
    const stopDrawing = () => {
      setIsDrawing(false);
    };
  
    const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing) {
        return;
      }
  
      if (context) {
        const rect = canvasRef.current!.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(x, y);
        context.strokeStyle = color;
        context.stroke();
        setLastX(x);
        setLastY(y);
      }
  
    };
  
    const erase = () => {
      if (context) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      }
    };
  
    const save = () => {
      if (canvasRef.current) {
        const dataUrl = canvasRef.current.toDataURL();
        // Generating a link to trigger download of the image
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'image.png';
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    };

    //const { mutateAsync: upload } = useStorageUpload();
    const saveToIpfs = async () => {
        if (canvasRef.current) {
          const dataUrl = canvasRef.current.toDataURL();
          const buffer = new Buffer(dataUrl.split(',')[1], 'base64');
          
          try {
            // const files = await ipfs.files.add(buffer);
            // console.log(`Image saved to IPFS: ${files[0].path}`);
            
          } catch (err) {
            console.error(err);
          }
        }

        // ThirdWEB solution!!!!!!!!!!!!!!!!!!!!!
    // const uploadUrl = await upload({data: [file], options: { uploadWithGatewayUrl: true, uploadWithoutDirectory: true },
    // });
    // alert(uploadUrl);
      };

    return (
        <div className="relative h-screen flex flex-col items-center justify-center">
            <canvas
                ref={canvasRef}
                width={400}
                height={400}
                className="m-auto cursor-pointer bg-white"
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseMove={draw}
            />
            <div className="flex justify-center items-center m-4">
                <button className="bg-blue-500 text-white rounded-full p-2 mr-2" onClick={save}>Save</button>
                <button className="bg-red-500 text-white rounded-full p-2 mr-2" onClick={erase}>Erase</button>
                <input type="color" className="bg-gray-300 p-2 rounded-full" value={color} onChange={e => setColor(e.target.value)} />
            </div>
        </div>
    );
            };
            


export default DrawableCanvas;



//  --------------- FUNCTION TO SAVE ipfs CID as new NFT TOKEN -------------------------
// import { contractPaintNFT } from '../../components/smart_contract/PaintNFT';
// import conectSigner from '../../components/smart_contract/SIGNER';

// const[result, setResult ] = useState('')

// const ipfsCID = 'Qxnoifknep534i5nn3jnljnkj'

// const handleCreateNFT = async(headOrTail : boolean)=>{
//     try {
//       setResult('Pls sign the tx and we will flip the coin! 📝')

//       const contractWithSigner = conectSigner(contractPaintNFT)
//       const txTransfer = await contractWithSigner.mint({
//         value: 10000000000000000,
//       }, ipfsCID);
//       const res2 = await txTransfer.wait()

//       console.log("👨‍💻 DEV >>>", res2)

//       setResult('Congrat!')

//     } catch (error) {
//       console.log("❌ ❌ ❌ DEV >>>", error)
//     }
//   }
