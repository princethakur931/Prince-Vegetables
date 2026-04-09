import React from 'react';
import { motion } from 'framer-motion';
import styles from './Contact.module.css';

const shopMapUrl =
  'https://www.google.com/maps/place/Prince+Vegetables/@18.6400643,73.7620357,19z/data=!4m6!3m5!1s0x3bc2b9ec5107d9a1:0x12872532b0000000!8m2!3d18.6400846!4d73.7622771!16s%2Fg%2F11rsslnq8q?entry=ttu';

const mapEmbedUrl = 'https://maps.google.com/maps?q=18.6400846,73.7622771&z=17&output=embed';

const weeklyHours = [
  { day: 'Monday', time: '7 am - 10 pm' },
  { day: 'Tuesday', time: '7 am - 10 pm' },
  { day: 'Wednesday', time: '7 am - 10 pm' },
  { day: 'Thursday', time: '7 am - 10 pm' },
  { day: 'Friday', time: '7 am - 10 pm' },
  { day: 'Saturday', time: '7 am - 10 pm' },
  { day: 'Sunday', time: '7 am - 10 pm' }
];

const Contact = () => {
  return (
    <div className={styles.contactPage}>
      <motion.section
        className={`${styles.contactCard} glass`}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <div className={styles.contactInfoWrap}>
          <p className={styles.contactEyebrow}>Visit Our Shop</p>
          <h1>Prince Vegetables</h1>
          <p className={styles.hindiName}>प्रिंस वेजिटेबल्स</p>

          <div className={styles.contactMeta}>
            <span>4.8 rating</span>
            <span>(4 reviews)</span>
            <span>Store</span>
          </div>

          <p className={styles.contactAddress}>
            Street No. 5, Shree Guru Datta Colony 1, Walhekarwadi, Sector No. 30, Nigdi,
            Pimpri-Chinchwad, Maharashtra 411033
          </p>

          <div className={styles.contactActionRow}>
            <a href="tel:+918669193011" className={styles.contactActionButton}>
              Call: 086691 93011
            </a>
            <a href={shopMapUrl} target="_blank" rel="noreferrer" className={styles.contactActionButtonSecondary}>
              Get Directions
            </a>
          </div>

          <p className={styles.plusCode}>Plus Code: JQR6+2W, Pimpri-Chinchwad, Maharashtra</p>

          <div className={styles.hoursBlock}>
            <h2>Open Now - 7 am to 10 pm</h2>
            <ul className={styles.hoursList}>
              {weeklyHours.map((item) => (
                <li key={item.day}>
                  <span>{item.day}</span>
                  <span>{item.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.mapWrap}>
          <iframe
            title="Prince Vegetables Location"
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className={styles.mapFrame}
          />
          <a href={shopMapUrl} target="_blank" rel="noreferrer" className={styles.openMapLink}>
            Open in Google Maps
          </a>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;
