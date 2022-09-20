const Modal = ({ children, active, setActive}) => {

    
    const handleStopPropag =(e) => {
    e.stopPropagation()
    }
    const handleOverlayClick = () => {setActive(false)}

      return active ? (
        <div
          className='h-full w-full bg-black opacity-100 fixed top-0 left-0 flex items-center justify-center scale-100'
          onClick={handleOverlayClick}
        >
          <div
            className="p-5 rounded-md bg-white w-auto h-auto opacity-100 text-black"
            onClick={handleStopPropag}
          >
              <div className="opacity-100">{children}</div>
           </div>
        </div>
      ) : null
    }
    
    export default Modal
    
    