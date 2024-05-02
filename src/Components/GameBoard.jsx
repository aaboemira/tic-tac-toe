
export default function GameBoard({onSelectSquare,gameBoard}) {


    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) =>
                <li key={rowIndex}>
                    <ol>
                        {row.map((col, colIndex) =>
                            <li key={colIndex}>
                                <button onClick={()=>onSelectSquare(rowIndex,colIndex)} disabled={col!=null}>{col}</button>
                            </li>
                        )}
                    </ol>
                </li>
            )}
        </ol>
    )
}