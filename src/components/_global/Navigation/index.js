import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

import styles from './navigation.module.scss';

const Navigation = () => (
  <nav>
    <ul className={styles.navMenu}>
      <li>
        <NavLink
          className={styles.navMenuItem}
          activeClassName={styles.active}
          to="/trace"
        >
          Contact Trace
        </NavLink>
        <NavLink
          className={styles.navMenuItem}
          activeClassName={styles.active}
          to="/publish"
        >
          Publish Data
        </NavLink>
      </li>
      <li>
        <NavLink
          className={styles.navMenuItem}
          activeClassName={styles.active}
          strict
          to="/settings/"
        >
          Settings
        </NavLink>
      </li>
    </ul>
  </nav>
);

Navigation.propTypes = {};

export default Navigation;
