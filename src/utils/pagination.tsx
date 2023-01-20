import { useState } from "react"

const usePagination = ({inArr}: any) => {
    const[currentPage, setCurrentPage] = useState(1)
    const [txPerPage] = useState(10)
    const lastTxId = currentPage * txPerPage
    const firstTxId = lastTxId - txPerPage
    const currentTx = inArr.reverse().slice(firstTxId, lastTxId)
    const pageNum = []
    for (let i=1; i <= Math.ceil(inArr.length/txPerPage); i++){
      pageNum.push(i)
    }
    const paginate = (pageNumber: any) => setCurrentPage(pageNumber)
    const pages = pageNum.map(page => <p onClick={() => paginate(page)} key={page} 
    className='font-semibold text-2xl m-2 text-center md:hover:text-yellow-700'>{page}</p>)
    
    return {pages, currentTx};
}
 
export default usePagination;