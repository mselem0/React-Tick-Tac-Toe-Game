import { useState } from 'react';

export default function Player({ initalName, symbol, onChangeName }) {
    const [name, setName] = useState(initalName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing((wasEditing) => !wasEditing);
        if (isEditing) {
            onChangeName(symbol, name)
        }
    }
    function handeleInputChange(e) {setName(e.target.value)}

    return (
        <li>
            <span className="player">
                {isEditing
                    ?
                    (<input onChange={handeleInputChange} value={name} required />)
                    :
                    (<span className="player-name">{name}</span>)
                }
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={() => handleEditClick()}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}