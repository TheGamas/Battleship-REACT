

export function Square ({children, index, updateBoard}) {
  
  const handleClick = () => {
    updateBoard(index)
  }  
  
  return (
      <div className="square" onClick={handleClick}>
        {children}
      </div>
    )
}

