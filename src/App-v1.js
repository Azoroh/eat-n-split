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

function Button({ children, onClick }) {
  return (
    <button className='button' onClick={onClick}>{children}</button>
  )
}


export default function App() {
  const [friendsArray, setFriendsArray] = useState(initialFriends)
  const [showAddFriend, setShowAddFriend] = useState(false)
  const [selected, setSelected] = useState(null)

  function handleShowAddFriend() {
    setShowAddFriend(prev => !prev)
  }

  function handleAddFriend(friend) {
    setFriendsArray(el => [...el, friend])
    setShowAddFriend(false)
  }

  function handleSelect(friend) {
    setSelected((el) => (el?.id === friend.id ? null : friend))
    setShowAddFriend(false)
    console.log(selected)
  }

  function handleSplitBill(value) {
    console.log(value)
    setFriendsArray(friendsArray => friendsArray.map(friend => friend.id === value.id ? { ...friend, balance: value.balance } : friend))
  }

  return (
    <div className="app">
      <div className='sidebar'>
        <FriendList
          friendsArray={friendsArray}
          onSelection={handleSelect}
          selected={selected}
        />

        {showAddFriend && <AddFriend onAddFriend={handleAddFriend} />}

        <Button className='button' onClick={() => setShowAddFriend(el => el = !el)}>
          {showAddFriend ? 'Close' : 'Add friend'}
        </Button>
      </div>

      {selected && (
        <SplitBill
          selected={selected}
          onSplitBill={handleSplitBill}
        // splitOpen={splitBillOpen} 
        />
      )}
    </div>
  );
}

function FriendList({ friendsArray, onSelection, selected }) {

  return (
    <ul>
      {friendsArray.map(el => (
        <Friend
          key={el.id}
          friend={el}
          selected={selected}
          onSelection={onSelection}
        />
      ))}
    </ul>
  )
}

function Friend({ onSelection, selected, friend }) {
  const isOpen = selected === friend.id
  // console.log(isOpen)


  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      <p className={(friend.balance < 0 ? `red` : friend.balance > 0 ? `green` : '')}>
        {friend.balance < 0 ? `You owe ${friend.name} $${Math.abs(friend.balance)}` : friend.balance > 0 ? `${friend.name} owes you $${friend.balance}` : `You and ${friend.name} are even`}
      </p>

      <Button onClick={() => onSelection(friend)}>{isOpen ? 'close' : 'Select'}</Button>

    </li>
  )
}

function AddFriend({ onAddFriend }) {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')


  function handleSubmit(e) {
    e.preventDefault()

    if (name && image) {
      const newFriend = { id: Date.now(), name, image, balance: 0 }
      console.log(newFriend)

      setName('')
      setImage('')

      onAddFriend(newFriend)
    }
  }

  function onSetName(e) {
    setName(e.target.value)
  }
  function onSetImage(e) {
    setImage(e.target.value)
  }

  return (
    <form className='form-add-friend'>
      <label>🧑🏾‍🤝‍🧑🏼Name</label>
      <input type='text' value={name} onChange={onSetName} />

      <label>🖼️Img URL</label>
      <input type='text' value={image} onChange={onSetImage} placeholder='https://i.pravatar.cc/48' />

      <Button onClick={e => handleSubmit(e)}>Add</Button>
    </form>
  )
}

function SplitBill({ selected, onSplitBill }) {
  const [totalBill, setTotalBill] = useState('')
  const [myBill, setMyBill] = useState('')
  const [payer, setPayer] = useState('friend')

  const friendBill = totalBill - myBill

  function handleSubmit(e) {
    e.preventDefault()

    if (!totalBill || !myBill) return

    onSplitBill({ ...selected, balance: selected.balance + (payer === 'friend' ? friendBill : -myBill) })
    // onSetFriendsArray(el => el.id === selected.id ? { ...el, selected } : el)
  }

  return (

    <form className='form-split-bill'>
      <h2>split a bill with {selected.name}</h2>

      <label>💰Bill Value</label>
      <input type='number' value={totalBill} onChange={e => setTotalBill(Number(e.target.value) > 0 ? Number(e.target.value) : '')} />

      <label>🧍🏾Your Expenses</label>
      <input type='number' value={myBill} onChange={e => setMyBill(Number(e.target.value) > 0 ? Number(e.target.value) : '')} />

      <label>🧑🏾‍🤝‍🧑🏼{selected.name}'s expense</label>
      <input type='number' value={friendBill} disabled />

      <label>🤑Who is paying the bill</label>
      <select value={payer} onChange={e => setPayer(e.target.value)}>
        <option value='you'>You</option>
        <option value='friend'>{selected.name}</option>
      </select>

      <Button onClick={e => handleSubmit(e)}>Split bill</Button>
    </form>
  )
}
