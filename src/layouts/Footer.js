import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { SOCIAL_FB, SOCIAL_INSTA, SOCIAL_TWITTER } from '../config/constant';
import { faFacebookF, faTwitter, faTelegram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const { setting } = useSelector((state) => state.setting);

  const handleFacebookShare = () => {
    const currentUrl = window.location.href;
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(shareUrl, '_blank');
  };

  const handleTwitterShare = () => {
    const currentUrl = window.location.href;
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`;
    window.open(shareUrl, '_blank');
  };

  const handleTelegramShare = () => {
    const currentUrl = window.location.href;
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}`;
    window.open(shareUrl, '_blank');
  };

  const handleWhatsappShare = () => {
    const currentUrl = window.location.href;
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(currentUrl)}`;
    window.open(shareUrl, '_blank');
  };

  return (
    <footer>
      <div className='footer-area'>
        <div className='footer-top'>
          <div className='container'>
            <div className='row'>
              <div className='col-12'>
                <div className='footer-widget mb-30'>
                  <div className='footer-title mb-30'>
                    <h2 className='title text-lines-1' style={{ fontSize: '50px', fontFamily: 'cursive' }}>வாசகர்கள்</h2>
                    <h3 className='title text-lines-1' style={{ fontWeight: '300', fontSize: '17px' }}>Powered by <b style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Times Interest</b></h3>
                  </div>
                  <div className='footer-title'>
                    <h4 className='title text-lines-1' style={{ fontSize: '15px', fontWeight: '300', color: 'var(--tg-paragraph-color)' }}>Follow Us On</h4>
                  </div>
                  <div className='footer-link-wrap d-flex justify-content-center'>
                    <div className='blog-details-social'>
                      <ul className='list-wrap'>
                        <li>
                          <Link href='#' onClick={handleFacebookShare}>
                            <FontAwesomeIcon icon={faFacebookF} />
                          </Link>
                        </li>
                        <li>
                          <Link href='#' onClick={handleTwitterShare}>
                            <FontAwesomeIcon icon={faTwitter} />
                          </Link>
                        </li>
                        <li>
                          <Link href='#' onClick={handleTelegramShare}>
                            <FontAwesomeIcon icon={faTelegram} />
                          </Link>
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                          <Link href='#' onClick={handleWhatsappShare}>
                            <FontAwesomeIcon icon={faPhone} />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='footer-bottom'>
          <div className='container'>
            <div className='footer-bottom-menu'>
              <div className=''>
                <h4 style={{ fontSize: '15px' }}>This website follows DNPA's code of Conduct</h4>
              </div>
              <div className=''>
              <h3 style={{ fontWeight: '300', fontSize: '17px' }}>© 2024 TodayTalks Digitech Media Pvt.Ltd. All Rights Reserved</h3>
            </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
