import {useState,useEffect} from 'react';
import { InputForm } from './InputForm/InputForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactLList/ContactList';
import Notiflix from 'notiflix';
import { nanoid } from 'nanoid';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' }
];
export function App() {
  const [contacts, setContacts] = useState(() => 
    JSON.parse(window.localStorage.getItem('contacts')) ?? (initialContacts));
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts))

  },[contacts])

const submitHandle = (evt) => {
    const phoneName = contacts.find(el => (el.name.toLowerCase() === evt.name.toLowerCase()));
    if (phoneName) return Notiflix.Notify.failure(phoneName.name + " is already in contacts");
    
    evt.id = nanoid();
    setContacts(contacts => [evt, ...contacts])
  }
  const filterChange = (evt) => {
    evt.preventDefault();
    setFilter(evt.currentTarget.value);
  }
  const onDelete = (id) => {
    setContacts(contacts => contacts.filter(contact => contact.id !== id))
  };
  const filterToLowCase = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact => (contact.name.toLowerCase().includes(filterToLowCase)));
    return (
      <>
        
          <h1>Phonebook</h1>
          <InputForm submitHandle={submitHandle}/>
        
        
          <h2>Contact List</h2>
          <Filter filter={filter} filterChange={filterChange}/>
          {contacts.length ?
            <ContactList contacts={filteredContacts} onDelete={onDelete} /> :
            <p>No any contacts</p>}
        
      </>
    );
  }
