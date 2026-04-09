import React from 'react';
import styles from './Contact.module.css';
import storeVisitGif from '../assets/store-visit.gif';

const CONTACT_DETAILS = [
  {
    label: 'Phone',
    value: '+91 98765 43210',
    href: 'tel:+919876543210'
  },
  {
    label: 'Email',
    value: 'hello@princevegetables.in',
    href: 'mailto:hello@princevegetables.in'
  },
  {
    label: 'Address',
    value: 'Prince Vegetables, Main Sabzi Mandi, Your City'
  },
  {
    label: 'Timing',
    value: 'Daily: 6:00 AM - 9:00 PM'
  }
];

const Contact = () => {
  return (
    <main className={styles.contactPage}>
      <img src={storeVisitGif} alt="Visit Prince Vegetables" className={styles.visitGif} />
      
      <section className={`${styles.heroCard} glass`}>
        <h1>Contact Prince Vegetables</h1>
        <p>
          Fresh vegetables ke liye direct humse baat karein. Bulk order, daily supply ya general enquiry ke liye
          niche diye gaye details use karein.
        </p>
      </section>

      <section className={styles.contentGrid}>
        <article className={`${styles.infoCard} glass`}>
          <h2>Get in Touch</h2>
          <ul className={styles.infoList}>
            {CONTACT_DETAILS.map((item) => (
              <li key={item.label}>
                <span>{item.label}</span>
                {item.href ? (
                  <a href={item.href}>{item.value}</a>
                ) : (
                  <p>{item.value}</p>
                )}
              </li>
            ))}
          </ul>
        </article>

        <article className={`${styles.infoCard} glass`}>
          <h2>Quick Message</h2>
          <form className={styles.contactForm}>
            <label>
              Name
              <input type="text" placeholder="Apna naam likhiye" />
            </label>
            <label>
              Phone
              <input type="tel" placeholder="10 digit number" />
            </label>
            <label>
              Message
              <textarea rows="4" placeholder="Aapki requirement likhiye" />
            </label>
            <button type="submit">Send Message</button>
          </form>
        </article>
      </section>
    </main>
  );
};

export default Contact;
