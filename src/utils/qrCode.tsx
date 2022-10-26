import QRCode from 'qrcode'
import { useState } from 'react'

	const generateQRCode = ({address}) => {
     
        const [qr, setQr] = useState('')

		QRCode.toDataURL(address, {
			width: 800,
			margin: 2,
			color: {
				dark: '#335383FF',
				light: '#EEEEEEFF'
			}
		}, (err, address) => {
			if (err) return console.error(err)

			console.log(address)
			setQr(address)
		})

        return (
	        <>
			{qr && <>
				<img src={qr} />
				{/* <a href={qr} download="qrcode.png">Download</a> */}
			</>}
            </>
	)
	}

export default generateQRCode