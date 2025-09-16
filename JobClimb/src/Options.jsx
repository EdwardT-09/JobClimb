import Edit from './assets/Edit.svg'
import Delete from './assets/Delete.svg'

function Options({job}){
    return(        
        <div className="options-container">
            <button className="edit-container">
                <img src={Edit} alt="Edit Icon"></img>
                <p>Edit</p>
            </button>
            <button className="delete-container">
                <img src={Delete} alt="Delete Icon"></img>
                <p>Delete</p>
            </button>
        </div>
    )
}

export default Options