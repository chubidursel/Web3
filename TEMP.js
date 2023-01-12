import IPFS from 'ipfs-http-client'
const ipfs = new IPFS('https://ipfs.infura.io:5001');

const saveToIpfs = async () => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL();
      const buffer = new Buffer(dataUrl.split(',')[1], 'base64');
      
      try {
        const files = await ipfs.files.add(buffer);
        console.log(`Image saved to IPFS: ${files[0].path}`);
      } catch (err) {
        console.error(err);
      }
    }
  };