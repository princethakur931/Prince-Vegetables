import React, { useEffect, useState } from 'react';
import styles from './Contact.module.css';
import storeVisitGif from '../assets/store-visit.gif';
import whatsappIcon from '../assets/whatsapp.png';
import callingIcon from '../assets/calling.png';
import gmailIcon from '../assets/gmail.png';

const TYPEWRITER_TEXT = '- Step Into Freshness 💚';
const MAP_DESKTOP_URL = 'https://www.google.com/maps/place/Prince+Vegetables/@18.6400846,73.7597022,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2b9ec5107d9a1:0x12872532b0000000!8m2!3d18.6400846!4d73.7622771!16s%2Fg%2F11rsslnq8q?entry=ttu&g_ep=EgoyMDI2MDQwNy4wIKXMDSoASAFQAw%3D%3D';
const MAP_MOBILE_URL = 'https://maps.app.goo.gl/j6F3K9MrbL2EWhAp8?g_st=aw';
const MAP_EMBED_URL = 'https://www.google.com/maps?q=18.6400846,73.7622771&z=17&output=embed';
const PHONE_NUMBER = '+918669193011';
const EMAIL_ADDRESS = 'princethakur545454@gmail.com';
const WHATSAPP_URL = `https://wa.me/${PHONE_NUMBER.replace('+', '')}?text=Hello%20Prince%20Vegetables%2C%20I%20want%20to%20place%20an%20order.`;
const CALL_URL = `tel:${PHONE_NUMBER}`;
const GMAIL_URL = `mailto:${EMAIL_ADDRESS}?subject=Order%20Enquiry%20-%20Prince%20Vegetables&body=Hi%20Prince%20Vegetables%2C%0A%0AI%20want%20to%20know%20more%20about%20today%27s%20fresh%20stock.`;

const CONTACT_DETAILS = [
  {
    label: 'Phone',
    value: '+91 8669193011',
    href: 'tel:+918669193011'
  },
  {
    label: 'Email',
    value: 'princethakur545454@gmail.com',
    href: 'mailto:princethakur545454@gmail.com'
  },
  {
    label: 'Address',
    value: 'Street No. 5, Shree Guru Datta Colony 1, Walhekarwadi, Sector No. 30, Nigdi, Pimpri-Chinchwad, Maharashtra 411033'
  }
];

const BUSINESS_HOURS = [
  { day: 'Friday', hours: '7 am–10 pm' },
  { day: 'Saturday', hours: '7 am–10 pm' },
  { day: 'Sunday', hours: '7 am–10 pm' },
  { day: 'Monday', hours: '7 am–10 pm' },
  { day: 'Tuesday', hours: '7 am–10 pm' },
  { day: 'Wednesday', hours: '7 am–10 pm' },
  { day: 'Thursday', hours: '7 am–10 pm' }
];

const Contact = () => {
  const [isIntroVisible, setIsIntroVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isOpenNow, setIsOpenNow] = useState(false);
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    let frameId;
    let stopTyping = () => {};
    let statusTimer;

    const introTimer = window.setTimeout(() => {
      setIsIntroVisible(true);
    }, 120);

    const startTypewriter = () => {
      let currentIndex = 0;
      let isDeleting = false;

      const tick = () => {
        if (!isDeleting) {
          currentIndex += 1;
          setTypedText(TYPEWRITER_TEXT.slice(0, currentIndex));

          if (currentIndex >= TYPEWRITER_TEXT.length) {
            isDeleting = true;
            frameId = window.setTimeout(tick, 1100);
            return;
          }

          frameId = window.setTimeout(tick, 70);
          return;
        }

        currentIndex -= 1;
        setTypedText(TYPEWRITER_TEXT.slice(0, currentIndex));

        if (currentIndex <= 0) {
          isDeleting = false;
          frameId = window.setTimeout(tick, 280);
          return;
        }

        frameId = window.setTimeout(tick, 38);
      };

      frameId = window.setTimeout(tick, 60);

      return () => {
        if (frameId) {
          window.clearTimeout(frameId);
        }
      };
    };

    const typeTimer = window.setTimeout(() => {
      stopTyping = startTypewriter();
    }, 520);

    const updateOpenStatus = () => {
      const now = new Date();
      const minutes = now.getHours() * 60 + now.getMinutes();
      const openMinutes = 7 * 60;
      const closeMinutes = 22 * 60;
      setIsOpenNow(minutes >= openMinutes && minutes < closeMinutes);
      setCurrentDay(now.toLocaleDateString('en-US', { weekday: 'long' }));
    };

    updateOpenStatus();
    statusTimer = window.setInterval(updateOpenStatus, 60 * 1000);

    return () => {
      window.clearTimeout(introTimer);
      window.clearTimeout(typeTimer);
      stopTyping();
      if (frameId) {
        window.clearTimeout(frameId);
      }
      if (statusTimer) {
        window.clearInterval(statusTimer);
      }
    };
  }, []);

  return (
    <main className={styles.contactPage}>
      <img src={storeVisitGif} alt="Visit Prince Vegetables" className={styles.visitGif} />

      <div className={styles.visitHeadlineWrap} aria-live="polite">
        <h2 className={`${styles.visitHeadline} ${isIntroVisible ? styles.visitHeadlineVisible : ''}`}>
          <span>Visit Our Shop 🛍️ </span>
          <span className={styles.typewriterText}>{typedText}</span>
          <span className={styles.typeCursor} aria-hidden="true">|</span>
        </h2>
      </div>

      <section className={styles.heroText}>
        <h1>Contact Prince Vegetables</h1>
        <p>
          Reach us directly for fresh vegetables. Use the details below for bulk orders, daily supply,
          or general enquiries.
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

            <li className={styles.timingItem}>
              <span>Timing</span>
              <details className={styles.timingDropdown}>
                <summary className={styles.timingSummary}>
                  <span className={styles.timingStatus}>{isOpenNow ? 'Open now' : 'Closed now'}</span>
                </summary>
                <ul className={styles.timingList}>
                  {BUSINESS_HOURS.map((hour) => (
                    <li
                      key={hour.day}
                      className={`${styles.timingRow} ${hour.day === currentDay ? styles.timingRowActive : ''}`}
                    >
                      <span className={styles.timingDay}>{hour.day}</span>
                      <span className={styles.timingHours}>{hour.hours}</span>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          </ul>
        </article>

        <section className={`${styles.mapCard} glass`}>
          <div className={styles.mapHeader}>
            <div>
              <h2>Find Us On Map</h2>
              <p>Open the exact location for Prince Vegetables.</p>
            </div>
            <a className={styles.mapOpenLink} href={MAP_DESKTOP_URL} target="_blank" rel="noreferrer">
              Open Full Map
            </a>
          </div>

          <div className={styles.mapFrameWrap}>
            <iframe
              className={styles.mapFrame}
              title="Prince Vegetables location map"
              src={MAP_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <a className={styles.mobileMapButton} href={MAP_MOBILE_URL} target="_blank" rel="noreferrer">
            Open Exact Location in Maps
          </a>
        </section>

        <article className={`${styles.infoCard} glass`}>
          <h2>Quick Connect</h2>
          <div className={styles.quickActions}>
            <a className={`${styles.quickActionButton} ${styles.whatsappButton}`} href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              <img src={whatsappIcon} alt="" className={styles.quickActionIcon} aria-hidden="true" />
              <span>WhatsApp</span>
            </a>
            <a className={`${styles.quickActionButton} ${styles.callButton}`} href={CALL_URL}>
              <img src={callingIcon} alt="" className={styles.quickActionIcon} aria-hidden="true" />
              <span>Call Now</span>
            </a>
            <a className={`${styles.quickActionButton} ${styles.gmailButton}`} href={GMAIL_URL}>
              <img src={gmailIcon} alt="" className={`${styles.quickActionIcon} ${styles.gmailActionIcon}`} aria-hidden="true" />
              <span>Gmail</span>
            </a>
          </div>
        </article>
      </section>
    </main>
  );
};

export default Contact;
