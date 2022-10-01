const Modal = ({ children, active, setActive, marginFromTop}) => {

    const handleStopPropag =(e) => {
      
    e.stopPropagation()
    }
    const handleOverlayClick = () => {setActive(false)}

      return active ? (<>
        <div
          className='h-full w-full bg-black opacity-70 fixed top-0 left-0 flex items-center justify-center scale-100'
          onClick={handleOverlayClick}
        ></div>
          <div
            className={`z-10 absolute top-${marginFromTop} right-1/3 p-5 w-1/3 h-auto rounded-md bg-white  text-black scale-100`}
            onClick={handleStopPropag}
          >
              {children}
           </div></>
      ) : null
    }
    
    export default Modal
    
    