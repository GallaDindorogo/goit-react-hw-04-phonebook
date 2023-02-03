import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import styles from './my-books.module.scss';
import ContactList from './ContactList/ContactList';
import ContactFilter from './ContactFilter/ContactFilter';

import ContactForm from './ContactForm/ContactForm';

const MyBooks = () => {
  const [items, setItems] = useState(() => {
    const items = JSON.parse(localStorage.getItem('my-contact'));
    return items ? items : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('my-contact', JSON.stringify(items));
  }, [items]);

  const isDublicate = (name, number) => {
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();
    const contact = items.find(({ name, number }) => {
      return (
        name.toLowerCase() === normalizedName &&
        number.toLowerCase() === normalizedNumber
      );
    });
    return Boolean(contact);
  };

  const addContact = ({ name, number }) => {
    if (isDublicate(name, number)) {
      return alert(`${name} tel.${number} is already in contacts`);
    }
    setItems(prevItems => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return [newContact, ...prevItems];
    });
  };

  const removeContact = id => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleFilter = ({ target }) => setFilter(target.value);

  const getVisibleContacts = () => {
    if (!filter) {
      return items;
    }
    const normalizedFilter = filter.toLowerCase();
    const resalt = items.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(normalizedFilter) ||
        number.toLowerCase().includes(normalizedFilter)
      );
    });
    return resalt;
  };

  const filtredContacts = getVisibleContacts();
  // const isContacts = Boolean(filtredContacts.length);

  return (
    <div>
      <h3>Phonebook</h3>
      <div className={styles.wrapper}>
        <div className={styles.block}>
          <h4>Add new contact</h4>
          <ContactForm onSubmit={addContact} />
        </div>
        <div className={styles.block}>
          <h4 className={styles.titleContacts}>Contacts:</h4>
          <h4 className={styles.allContacts}>All contacts: {items.length}</h4>
          <ContactFilter handleChange={handleFilter} />

          <ContactList removeContact={removeContact} items={filtredContacts} />
        </div>
      </div>
    </div>
  );
};
export default MyBooks;
