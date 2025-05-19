import React from 'react';
import { Icon } from '../Icon/icon';
import logger from '../../services/logger/logger';
import { InlineStyleObjectModel } from '../../utils/models/inline-style-model';
import "./empty-data.css"

interface EmptyDataProps {

}

/**
 * Display a nice "No Data Found" message wherver required
 * @returns React functional component tsx
 */
export const EmptyData: React.FC<EmptyDataProps> = () => {
  try {
    return (
      <div className="centered full-width full-height flex-column">
        <div>
          <Icon name='alert-triangle' externalStyle={styles.iconStyle}/>
        </div>
        <div className='centered'>
          <span className='empty-data-text'>No Data Found</span>
        </div>
      </div>
    )
  } catch (err) {
    logger.logError(`Error rendering Empty Data Component => empty-data.tsx`, err)
  }
}

const styles: InlineStyleObjectModel = {
  iconStyle: {
    color: "blue",
  }
}