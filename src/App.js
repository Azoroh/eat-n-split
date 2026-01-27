import { useState } from 'react';
import './App.css';

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];


export default function App() {
  return (
    <div className="app">
      <FriendList />
    </div>
  );
}

function FriendList() {
  const [friendsArray, setFriendsArray] = useState([{
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
  ])
  const [isOpen, setIsOpen] = useState(true)

  const [name, setName] = useState('')
  const [image, setImage] = useState('')


  function handleSubmit(e) {
    e.preventDefault()

    if (name && image) {
      const newFriend = { id: Date.now(), name, image, balance: 0 }
      console.log(newFriend)
      setFriendsArray(el => [...el, newFriend])

      setName('')
      setImage('')

      setIsOpen(false)
    }


  }

  function onSetName(e) {
    setName(e.target.value)
  }
  function onSetImage(e) {
    setImage(e.target.value)
  }

  return (
    <div className='sidebar'>

      {friendsArray.map(el => (
        <Friend
          key={el.id}
          name={el.name}
          image={el.image}
        >
          <img src={el.image} alt={el.name} />
          <h3>{el.name}</h3>
          <p className={(el.balance < 0 ? `red` : el.balance > 0 ? `green` : '')}>
            {el.balance < 0 ? `You owe ${el.name} $${Math.abs(el.balance)}` : el.balance > 0 ? `${el.name} owes you $${el.balance}` : `You and ${el.name} are even`}
          </p>

          <button className='button'>Select</button>
        </Friend>
      ))}

      {isOpen &&
        <AddFriend
          onSubmit={handleSubmit}
          name={name}
          image={image}
          onSetName={onSetName}
          onSetImage={onSetImage}
        />
      }


      <button className='button' onClick={() => setIsOpen(el => el = !el)}>{isOpen ? 'Close' : 'Add friend'}</button>
    </div>
  )
}

function Friend({ children }) {
  return (
    <ul>
      <li>
        {children}
      </li>
    </ul>
  )
}

function AddFriend({ onSubmit, name, image, onSetName, onSetImage }) {
  return (
    <form className='form-add-friend'>
      <label>🧑🏾‍🤝‍🧑🏼Name</label>
      <input type='text' value={name} onChange={onSetName} />

      <label>🖼️Image URL</label>
      <input type='text' value={image} onChange={onSetImage} placeholder='https://i.pravatar.cc/48' />

      <button onClick={e => onSubmit(e)} className='button'>Add</button>
    </form>
  )
}

function SplitBill() {
  return (
    <form></form>
  )
}