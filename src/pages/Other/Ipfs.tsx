import React from "react";
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
import Header from '../../components/headerNew';

// const projectId = '<YOUR PROJECT ID>';
// const projectSecret = '<YOUR PROJECT SECRET>';
// const authorization = "Basic " + btoa(projectId + ":" + projectSecret);


// https://medium.com/building-the-open-data-stack/how-to-run-your-own-ipfs-gateway-7aa13aa9ad45
// https://www.youtube.com/watch?v=jI6wcuY8p2Y&t=772s
//

export function Ipfs() {
  const [images, setImages] = React.useState<{ cid: CID; path: string }[]>([]);
  const [selectUrl, setSelectUrl] = React.useState<any>();
  const [ipfsToFind, setIpfsToFind] = React.useState("");


  const [result, setResult] = React.useState('');
  const [resultSearch, setResultSearch] = React.useState('');

 function ipfsClient(){
    let ipfs: IPFSHTTPClient | undefined;
    try {
      // ipfs = create({
      //   url: "https://ipfs.infura.io:5001/api/v0",
      //   headers: {
      //     authorization,
      //   },
      // });
      ipfs = create(
        {
          host: "ipfs.infura.io",
          port: 5001,
          protocol: "https",
        }
      )
      console.log(ipfs)
      return ipfs
    } catch (error) {
      console.error("IPFS error 😿 ", error); 
      ipfs = undefined;
    }
  }



  const onCreateHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let ipfs = ipfsClient();
    const form = event.target as HTMLFormElement;
    const files = (form[0] as HTMLInputElement).files;

    if (!files || files.length === 0) {
      setResult('No files selected ') 
      setTimeout(() => {setResult('')}, 5000)
      return null
    }

    const file = files[0];
    // upload files
    try {
      
      const result = await (ipfs as IPFSHTTPClient).add(file);

      console.log(result)
      setResult(`Hesh: ${result}`)
      setTimeout(() => {setResult('')}, 5000)
    } catch (error) {
      setResult('Oh oh, Not connected to IPFS. Check out the logs for errors 💀')
      setTimeout(() => {setResult('')}, 5000)
    }

    // const uniquePaths = new Set([
    //   ...images.map((image) => image.path),
    //   result.path,
    // ]);
    // const uniqueImages = [...uniquePaths.values()]
    //   .map((path) => {
    //     return [
    //       ...images,
    //       {
    //         cid: result.cid,
    //         path: result.path,
    //       },
    //     ].find((image) => image.path === path);
    //   });
    
    //   // @ts-ignore
    // setImages(uniqueImages);

    // form.reset();
  };



  const onSearchHash = async (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    try {

      if(ipfsToFind.length < 43){
        setResultSearch("... invalid CID ")
        return null
      }
      let gateway = ''
      if (selectUrl === "AWS") {
        setResultSearch("Opps, unconnected 😩")
        return null
      } else if(selectUrl === "pinata") {
        gateway = "https://gateway.pinata.cloud/ipfs/"
      } else if (selectUrl === "ipfs"){
        gateway = "https://ipfs.io/ipfs/"
      }  else if (selectUrl === "cloudflare"){
        gateway = "https://cloudflare-ipfs.com/ipfs/"
      } 
// https://ipfs.github.io/public-gateway-checker/
// QmNM3ZUzASR78M61PsPF3f63j13ZsXNCACnfMshNroFuKz

      setResultSearch(`${gateway}${ipfsToFind}`)

      setIpfsToFind('')
      setSelectUrl('')

      setTimeout(() => {setResultSearch('')}, 9000)
    } catch (error) {
      console.log(error)
      setResultSearch("Ops, problem 💀")
      setTimeout(() => {setResultSearch('')}, 5000)
    }


  }


  return (
    <>
    
    <Header marginFromTop={'1/3'}>
        <div className='text-center p-4'>
          <h1 className="font-bold text-3xl">Decentralized storage 💾</h1>
          <p>You have some files that you want to store, but you do not trust to centralized service?</p>
          <p>The best soludtion is IPFS</p>
          <h1 className="font-bold text-3xl">How does it work?</h1>
          <p>IPFS uses content-addressing to uniquely identify each file in a global namespace connecting IPFS hosts.</p>

          <p className="text-gray-500">almost like torrent</p>

          <h1 className="mt-3">Update this soon: <a href="https://filecoin.io/" target="_blank" className="font-bold">FILECOIN</a></h1>
          </div>
       </Header>

       <h2 className="flex justify-center text-6xl text-blue-100 font-bold">IPFS</h2>
<div className="flex justify-center">
    <div className="bg-blue-100 m-10 px-5 py-2 text-lg rounded-lg w-1/2 border-4 text-purple-800 border-red-400">

        

       
          <>
            <div className="flex justify-center flex-col">
              <p className="py-2 font-bold text-3xl text-center">Upload File</p>
              <div className="text-start ml-10 mb-3">
                <h2>➡️ Choose the file you want to store</h2>
                <h2>➡️ Get the hash of this file</h2>
                <h2>➡️ Find your content via IPFS gateway</h2>
              </div>
            
            </div>
            <form onSubmit={onCreateHandler} className='flex justify-center'>
              <input name="file" type="file" className="w-1/2 hover:cursor-pointer" />

              <button className="font-bold py-1 text-2xl hover:shadow-xl w-1/3 rounded-xl border-2 border-red-400 px-[15px] hover:bg-red-400" type="submit">save</button>
            </form>
            <div className='flex justify-center'> {result && <h1 className='font-bold mt-3 bg-yellow-100 w-full py-2 text-center  px-1 rounded-xl text-purple-900 text-xl '>{result}</h1>}   </div>
            <div>
              {}
              {/* {images.map((image, index) => (
                <img
                  alt={`Uploaded #${index + 1}`}
                  src={"https://ipfs.infura.io/ipfs/" + image.path}
                  style={{ maxWidth: "400px", margin: "15px" }}
                  key={image.cid.toString() + index}
                />
              ))} */}
            </div>
          </>

    </div>
    </div>

      <div className="flex justify-center">
      <div className="bg-blue-100 m-1 px-5 py-2 text-lg rounded-lg w-1/2 border-4 text-purple-800 border-red-400">
      <p className="py-2 font-bold text-3xl text-center">Search</p>
          <form onSubmit={onSearchHash} >
              {/* <div className="flex justify-center">
                <label htmlFor="gateway" className="text-2xl">Select gateway:</label>  
                <input type="select" id="gateway" className="ml-2 rounded-lg"/>
              </div> */}
              <div className="text-start ml-10 mb-3">
                  <h1>🔹 Select the gateway you want to go thru</h1>
                  <h1>🔹 Paste CID (just hash)</h1>
                  <h1>🔹 Generete the https link</h1>
                  <h1>🔹 Click on it and get your content </h1>
                </div>

              <div className="flex justify-center my-3">
              
              <select value={selectUrl} onChange={(event: React.ChangeEvent<HTMLSelectElement>)=>(setSelectUrl(event.target?.value))} className="ml-2 rounded-xl text-center hover:shadow-xl px-3">
                <option disabled>gateway</option>
                    <option value="ipfs">ipsf</option>
                    <option value="pinata">pinata</option>
                    <option value="cloudflare">cloudflare</option>
                    <option value="AWS">AWS</option>
              </select>
      
                <input value={ipfsToFind} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>(setIpfsToFind(event.target?.value))} type="text" placeholder="ipfs CID" className="mx-2 w-1/2 rounded-xl text-center hover:shadow-xl px-4" />
                <button type="submit" className="w-max font-bold py-1 text-2xl hover:shadow-xl hover:cursor-pointer rounded-xl border-2 border-red-400 px-[15px] hover:bg-red-400 active:bg-red-500 active:text-blue-100"
                >get URL</button>
               
              </div>
              <div className='flex justify-center'> {resultSearch && <h1 className='font-bold mt-3 bg-yellow-100 w-full py-2 text-center  px-1 rounded-xl text-purple-900 text-xl hover:underline'><a href={resultSearch} target="_blank">
              🔎  {resultSearch.toString().slice(0, 25) + "..." + resultSearch.toString().slice(60)}  🔍
                </a> </h1>}   </div>
          </form>
      </div>
      </div>


    </>
  );
}