import styles from './HostPage.module.css';
import React from 'react';
import LayoutPrimary from 'layouts/LayoutPrimary';
import classNames from 'classnames/bind';
import CardList from '../../../components/CardList/CardList';
import Card from '../../../components/Card/Card';
import Button from '../../../components/Button/Button';

const cx = classNames.bind(styles);
function HostPage() {
  return (
    <LayoutPrimary host>
      <div className={cx('banner')}>
        <div className={cx('banner-wrapper')}>
          <h2 className={cx('banner-heading')}>Try Hosting With Us</h2>
          <p className={cx('banner-desc')}>
            Welcome to our Host homepage, the ultimate platform for hotel
            management, room administration, and booking information.
            Efficiently manage your hotels, rooms, and reservations with
            real-time updates, streamlined processes, and comprehensive reports.
          </p>
        </div>
        <Button
          black
          to="/HostProperties"
          rounded
          mediumx
          className={cx('banner-button')}
        >
          Lets Get Started
        </Button>
      </div>
      <div className={cx('body')}>
        <div className={cx('mid-section-container')}>
          <div className={cx('mid-section-card-wrapper')}>
            <Card
              className={cx('custom-card')}
              fragment={cx('second')}
              guide
              featured
              thumbnail="https://contenthub-static.grammarly.com/blog/wp-content/uploads/2021/10/welcome-message-new-employee.jpeg"
            />
          </div>
          <div className={cx('mid-section-information-wrapper')}>
            <div className={cx('mid-section-information')}>
              <h2 className={cx('mid-section-header')}>
                WELCOME HOST HOMEPAGE
              </h2>
              <p className={cx('mid-section-desc')}>
                Welcome to our Host homepage, the ultimate platform for hotel
                management, room administration, and booking information.
                <br />
                With us, you can efficiently manage your hotels, rooms, and
                reservations while staying organized with real-time updates. Our
                intuitive interface allows you to effortlessly add, edit, and
                update room details, ensuring accurate and up-to-date
                information.
                <br />
                Stay informed with comprehensive statistics and reports,
                enabling you to make data-driven decisions for your business.
                Enhance the guest experience by seamlessly integrating our
                booking system, managing guest information and payments with
                ease. Join us as a Host and unlock the full potential of your
                hotel business today.
              </p>
            </div>
          </div>
        </div>
      </div>
    </LayoutPrimary>
  );
}

export default HostPage;
