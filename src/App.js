import './App.css';
import {useState , useEffect}  from 'react'
import axios  from 'axios';
function App() {
  //this useState is used to store item and then push it to database
  const [item, setItem] = useState({
    _id:"",
    itemTitle: "",
    itemDescription: ""
  })

  //this useState is used to store items that are fetched from database using useEffection hook
  const [storedItems, setStoredItems] = useState({ 
    _id: '',
    itemTitle:'',
    itemDescription:''
  })
  //this is a boolean state for updating
  const [isPut, setIsPut] = useState(false)
  const [updatedItem, setUpdatedItem] = useState({
    _id:'',
    itemTitle:'',
    itemDescription:''
  })
  
  //in this useEffection hook, we fectch data from database
useEffect(()=>{
    fetch('/newoperation').then((response)=>{
      if(response.ok){
      return response.json();
    }}).then((jsonRes)=>{
      setStoredItems(jsonRes)
    }).catch(err=> console.log(err))
  }, [storedItems])
  

  const handleChange=(event)=>{
    setItem(()=>{
      return{
        // ...item,
        [event.target.name] : event.target.value
        }
    })}

  const addOperation = (e)=>{
      e.preventDefault();
      const newoperation = {
        itemTitle :item.itemTitle,
        itemDescription : item.itemDescription
      }
      axios.post('/newoperation', newoperation)
      alert('Item Added')
      setItem({
        itemTitle:"",
        itemDescription:""
      })}

      const deleteItem=(id)=>{
       axios.delete('/newoperation/'+id)
       alert('Item Deleted')
       console.log(`Item delete with id no: ${id}`)

     }
     //Updating section
     //updating button to update
     function changeBtnToUpdate(id){
       setIsPut(true)
       setUpdatedItem(prev=>{
        return{
          updateItem,
          id:id
        }       })
     }
     //updating item in database
     function updateItem(id){
       axios.put('/newoperation/'+ id , updatedItem)
       alert('Item Updated')
       console.log(`Item with id ${id} is updated...!`)
     }
     //handling change while updating
     function handleUpdate(event)
     {  
       event.preventDefault()
       setUpdatedItem(()=>{
         return{
           ...updatedItem,
          [event.target.name] : event.target.value
        }
      } ) }  
      

  return (
    <>
    <div className="App">      
    {!isPut ? (
       <div> 
       <h1>CURD OPERATIONS USING MERN STACK</h1>
      <div className='box'>
        <div className='fields'>
    <input onChange = {handleUpdate} value= {item.itemTitle}    name = 'itemTitle' placeholder = 'Title'/><br></br>
    <input onChange = {handleUpdate} value= {item.itemDescription}  name = 'itemDescription' placeholder = 'Description'/><br></br>
    <button onClick = {addOperation} >ADD</button>    
       </div>
    </div> 
     </div>

    ) : ( <div> 
      <h1>CURD OPERATIONS USING MERN STACK</h1>
     <div className='box'>
       <div className='fields'>
      <input onChange = {handleChange} value= {updatedItem.itemTitle}    name = 'itemTitle' placeholder = 'Update Title'/><br></br>
      <input onChange = {handleChange} value= {updatedItem.itemDescription}  name = 'itemDescription' placeholder = 'Update Description'/><br></br>
      <button onClick = {()=> updateItem()} >UPDATE</button>  
          
      </div>
   </div> 
    </div>)}
    
   <div className='Items'>
    {storedItems.map(item=>{
      
      return(
      <div key={item._id}  className = 'item'>
      <p><b>Title:</b>     {item.itemTitle}</p>
      <p><b>Description:</b>      {item.itemDescription}</p> 
      <span ><button onClick= {()=>deleteItem(item._id)}>Delete</button> </span>
      <span><button onClick = {()=> changeBtnToUpdate(item._id)}>Update</button> </span>
      </div>
      )   })
      }
   </div>
 </div>      
      
  </>
  );
}
export default App;
