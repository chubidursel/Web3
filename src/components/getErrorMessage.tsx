
type err= {
  code: string,
  message: string
}

const getErrorMessage = (error:err) => {
  if (error.code === "INSUFFICIENT_FUNDS") {
    return "Not Enough Funds 😢";
  }

  if (error.code === "INVALID_ARGUMENT") {
    return "Invalid Input ❌";
  }

  if (error.code === "UNSUPPORTED_OPERATION") {
    return "Opps, you can't sign tx! Install MetaMask 🦊";
  }

  if (error.code === "ACTION_REJECTED") {
    return "Transaction was Rejected ❌";
  }

  return 'Oii wei, we got problem! 😞'
};

export default getErrorMessage;

// set err in try-catch block