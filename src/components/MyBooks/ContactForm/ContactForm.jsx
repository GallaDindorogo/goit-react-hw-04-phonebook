import styles from './contactForm.module.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';
import initialState from './initialState';

const ContactForm = ({ onSubmit }) => {
  const [state, setState] = useState({ ...initialState });

  const { name, number } = state;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({ ...initialState });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label>Name</label>
        <input
          className={styles.inputName}
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Name"
          type="text"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label>Number</label>
        <input
          className={styles.inputNumber}
          name="number"
          value={number}
          onChange={handleChange}
          placeholder="tel.number"
          type="tel"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>
      <button type="submit">Add contact</button>
    </form>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
