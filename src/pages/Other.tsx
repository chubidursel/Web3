
import Header from '../components/headerNew'
import Sidebar from '../components/Sidebar'
import Welcome from '../components/Other/welcome'

export function Other() {
  return (<>
   <Header />
   <div className='flex justify-center'>
   <Sidebar />
   </div>
   <div className='flex justify-center'>  <Welcome /></div>
 
  
  
  </>
  )
}

//<Header />