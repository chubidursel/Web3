import React from "react";
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
import Header from '../../components/headerNew';

// const projectId = '<YOUR PROJECT ID>';
// const projectSecret = '<YOUR PROJECT SECRET>';
// const authorization = "Basic " + btoa(projectId + ":" + projectSecret);

export function Ipfs() {
  const [images, setImages] = React.useState<{ cid: CID; path: string }[]>([]);


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
      console.error("IPFS error ", error);
      ipfs = undefined;
    }
  }



  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let ipfs = await ipfsClient();
    const form = event.target as HTMLFormElement;
    const files = (form[0] as HTMLInputElement).files;

    if (!files || files.length === 0) {
      return alert("No files selected");
    }

    const file = files[0];
    // upload files
    const result = await (ipfs as IPFSHTTPClient).add(file);

    console.log(result)
    const uniquePaths = new Set([
      ...images.map((image) => image.path),
      result.path,
    ]);
    const uniqueImages = [...uniquePaths.values()]
      .map((path) => {
        return [
          ...images,
          {
            cid: result.cid,
            path: result.path,
          },
        ].find((image) => image.path === path);
      });
    
      // @ts-ignore
    setImages(uniqueImages);

    form.reset();
  };

  console.log("images ", images);

  return (
    <>
    
    <Header marginFromTop={'1/3'}>
        <div className='text-center p-4'>
          <h1 className="font-bold text-3xl">Decentralized storage 💾</h1>
          <p>You have some files that you want to store, bu you do not trust to centralized service?</p>
          <p>The best soludtion is IPFS</p>
          <h1 className="font-bold text-3xl">How does it work?</h1>
          <p>Choose the file which you want to store, than press Upload button</p>
          </div>
       </Header>

    <div className="bg-blue-200 m-10 px-5 py-2 text-lg rounded-lg w-max">
      <header>
        
          <>
            <p className="text-center pb-3 font-bold text-xl">Upload File using IPFS</p>

            <form onSubmit={onSubmitHandler}>
              <input name="file" type="file" />

              <button className="bg-pink-100 px-2 rounded-lg" type="submit">Upload File</button>
            </form>

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
        

        {/* {!ipfs && (
          <p>Oh oh, Not connected to IPFS. Checkout out the logs for errors</p>
        )} */}
      </header>
    </div>

        <div className="bg-blue-100 w-max text-xl">
          <h1>Upload IPFS link as NFT</h1>

          <form action="">
          <input type="text" placeholder="ipfs link" />
          <button className="bg-red-100">create</button>
          </form>
          
        </div>

    </>
  );
}