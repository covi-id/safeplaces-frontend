import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import {
  pointContextMenu,
  pointContextMenuHeader,
  pointContextMenuClose,
} from './PointContextMenu.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faMinusCircle,
  faTrash,
  faTimes,
} from '@fortawesome/pro-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import pointsActions from 'ducks/points/actions';
import applicationActions from 'ducks/application/actions';
import applicationSelectors from 'ducks/application/selectors';

const PointContextMenu = ({
  pointId: id,
  closeAction,
  time,
  latitude,
  longitude,
  renderDateTime = false,
}) => {
  const containerRef = useRef();
  const dispatch = useDispatch();
  const appStatus = useSelector(state => applicationSelectors.getStatus(state));

  const handleClick = e => {
    const _Target = e.target;

    if (!containerRef.current) return;

    if (!containerRef.current.contains(_Target)) {
      closeAction();
      // dispatch(applicationActions.updateStatus(''));
      // dispatch(pointsActions.setSelectedPoint(null));
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  if (appStatus === 'EDIT POINT') {
    return null;
  }

  return (
    <div className={pointContextMenu} ref={containerRef}>
      <button
        className={pointContextMenuClose}
        type="button"
        onClick={() => {
          closeAction();
          dispatch(applicationActions.updateStatus(''));
          dispatch(pointsActions.setSelectedPoint(null));
        }}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
      {renderDateTime && (
        <div className={pointContextMenuHeader}>
          <span>{moment.utc(time).format('ddd, MMM d, yyyy')}</span>
          <span>{moment.utc(time).format('HH:mm')}</span>
        </div>
      )}
      <ul>
        <li>
          <button
            type="button"
            onClick={() =>
              dispatch(applicationActions.updateStatus('EDIT POINT'))
            }
          >
            <FontAwesomeIcon icon={faEdit} />
            Edit
          </button>
        </li>
        {/* <li>
          <button type="button" onClick={() => editAction(id)}>
            <FontAwesomeIcon icon={faMinusCircle} />
            Unselect
          </button>
        </li> */}
        <li>
          <button
            type="button"
            onClick={() => dispatch(pointsActions.deletePoint(id))}
          >
            <FontAwesomeIcon icon={faTrash} />
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
};

PointContextMenu.propTypes = {
  deleteAction: PropTypes.func,
  editAction: PropTypes.func,
  deselectAction: PropTypes.func,
};

export default PointContextMenu;
