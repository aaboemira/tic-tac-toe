import { useState } from "react"
export default function Player ({initialName,symbol,isActive,onChangeName}){
    
    const[isEditing,setIsEditing]=useState(false);

    const [editedName,setEditedName]=useState(initialName);

    function handleEditClick(){
        setIsEditing(editing=>!editing)
        if(isEditing)onChangeName(symbol,editedName)
    }
    function handleNameChange({target}){
        setEditedName(target.value)
    }
    
    let playerName=<span className='player-name'>{editedName}</span>
    if (isEditing) {
        playerName=<input type="text" value={editedName} onChange={handleNameChange}/>
    }


    return(
        <li className={isActive?'active':undefined}> 
            <span className="player">
                {playerName}
                <span className='player-symbol'>{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing?'Save':'Edit'}</button>

        </li>
    )
}