import * as React from "react";
import QRCode from "qrcode.react";

// const icon = require("../../static/assets/images/code-icon.png");

export default function QrCode({address}) {
  const qrRef = React.useRef();
  const [url, setUrl] = React.useState("");

  const downloadQRCode = (evt: React.FormEvent) => {
    evt.preventDefault();
    // @ts-ignore
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setUrl("");
  };



  const qrCode = (
    <QRCode
      id="qrCodeElToRender"
      size={300}
      value={address}
      bgColor="white"
      fgColor="#141926"
      level="H"
    //   imageSettings={{
    //     src: icon,
    //     excavate: true,
    //     width: 500 * 0.1,
    //     height: 500 * 0.1,
    //   }}
    />
  );

  return (
    <div className="flex flex-col items-center">
        {/*
		<form onSubmit={downloadQRCode}>
		<input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
        /> 
		</form>
		*/}

      <div className="flex justify-center items-center mt-10" ref={qrRef}>
        {qrCode}
      </div>
	  <button onClick={downloadQRCode} className="mt-5 w-max font-bold py-1 text-2xl hover:shadow-xl hover:cursor-pointer rounded-xl border-2 border-red-400 px-[15px] hover:bg-red-400 active:bg-red-500 active:text-blue-100"
	  >Download 💾</button>
    </div>
  );
}