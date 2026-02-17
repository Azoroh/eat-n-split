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
  return <button className='button' onClick={onClick}>{children}</button>
}

export default function App() {
  const [friends, setFriends] = useState(initialFriends)
  const [showAddFriend, setShowAddFriend] = useState(false)
  const [selected, setSelected] = useState(null)


  function handleAddFriend(newFriend) {
    setFriends(el => [...el, newFriend])
    setShowAddFriend(prev => !prev)
  }

  function handleSelect(friendObj) {
    // setSelected(friendObj)
    setSelected(el => el?.id === friendObj.id ? null : friendObj)
    setShowAddFriend(false)
  }

  function handleSplitBill(val) {
    setFriends(el => el.map(el => el.id === selected.id ? { ...el, balance: el.balance + val } : el))
    setSelected(null)
  }

  return (
    <div className='app'>
      <div className='sidebar'>

        <FriendList
          friends={friends}
          onSelect={handleSelect}
          selected={selected}
        />

        {showAddFriend && <AddFriendForm
          onAddFriend={handleAddFriend}
        />}

        <Button onClick={() => setShowAddFriend(prev => !prev)}>
          {showAddFriend ? "Close" : 'Add friend'}
        </Button>

      </div>

      {selected && <SplitBillForm
        selected={selected}
        onSplitBill={handleSplitBill}
        key={crypto.randomUUID()}
      />}

    </div>
  )
}

function FriendList({ friends, onSelect, selected }) {
  return (
    <ul>
      {friends.map(el =>
        <Friend
          key={el.id}
          friendObj={el}
          onSelect={onSelect}
          selected={selected}
        />
      )}
    </ul>
  )
}

function Friend({ friendObj, onSelect, selected }) {
  const isOpen = selected?.id === friendObj.id

  function handleSelect(friendObj) {
    onSelect(friendObj)
  }

  return (
    <li className={isOpen ? 'selected' : ''}>
      <img src={friendObj.image} alt={friendObj.name} />
      <h3>{friendObj.name}</h3>

      {friendObj.balance === 0 ?
        <p>you and {friendObj.name} are even</p> :
        friendObj.balance > 0 ?
          <p className='green'>{friendObj.name} owes you ${friendObj.balance}</p> :
          <p className='red'>You owe {friendObj.name} ${Math.abs(friendObj.balance)}</p>}

      <Button onClick={() => handleSelect(friendObj)}>{isOpen ? "Close" : "Select"}</Button>
    </li>
  )
}

function AddFriendForm({ onAddFriend }) {
  const [name, setName] = useState('')
  const [image, setImage] = useState('https://i.pravatar.cc/48')


  function handleSubmit(e) {
    e.preventDefault()

    if (!name || !image) return
    const id = crypto.randomUUID()
    const newFriend = { id, name, image: `${image}?=${id}`, balance: 0 }

    onAddFriend(newFriend)
  }

  return (
    <form className='form-add-friend' onSubmit={e => handleSubmit(e)}>
      <label>🧍🏾Name</label>
      <input
        type='text'
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <label>🖼️Image URL</label>
      <input
        type='text'
        value={image}
        onChange={e => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  )
}

function SplitBillForm({ selected, onSplitBill }) {
  const [paidBy, setPaidBy] = useState('user')
  const [bill, setBill] = useState('')
  const [userBill, setUserBill] = useState('')
  const friendBill = bill - userBill || ''

  function handleSubmit(e) {
    e.preventDefault()
    onSplitBill(paidBy === 'user' ? friendBill : -userBill)
  }

  return (
    <form className='form-split-bill' onSubmit={handleSubmit}>
      <h2>Split a bill with {selected.name}</h2>

      <label>💰Bill Value</label>
      <input
        type='number'
        value={bill}
        onChange={e => setBill(Number(e.target.value))}
      />

      <label>🧍🏾Your Expenses</label>
      <input
        type='number'
        value={userBill}
        onChange={e => setUserBill(Number(e.target.value))}
      />

      <label>🧑🏾‍🤝‍🧑🏼{selected.name}'s Expenses</label>
      <input
        type='text'
        value={friendBill}
        disabled />

      <label>🧾Who is paying the bill</label>
      <select value={paidBy} onChange={e => setPaidBy(e.target.value)}>
        <option value='user'>You</option>
        <option value='friend'>{selected.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  )
}