import { addDays, format, subDays, formatISO } from 'date-fns';
import { useState } from 'react';

import { Icon } from '~/components/Icon';

export const DateSelect = ({ currentDate, onChange }) => {
  const date = new Date(currentDate);

  const prevDay = () => {
    const prevDate = subDays(date, 1);
    onChange(formatISO(prevDate));
  };

  const nextDay = () => {
    const nextDate = addDays(date, 1);
    onChange(formatISO(nextDate));
  };

  return (
    <div className='p-4 flex space-x-4 items-center justify-center'>
      <Icon name='leftArrow' className='w-6 text-red-500' onClick={prevDay} />

      <span className='font-bold'>{format(date, "MMMM d")}</span>

      <Icon name='rightArrow' className='w-6 text-red-500' onClick={nextDay} />
    </div>
  );
};