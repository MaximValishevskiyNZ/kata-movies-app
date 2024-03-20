// Rate.jsx
import React, { useState } from 'react';
import { StarFilled, StarOutlined } from '@ant-design/icons';

const Rate = ({ initialRating = 0 }) => {
  const [rating, setRating] = useState(initialRating);

  const handleRate = (newRating) => {
    setRating(newRating);
    // Здесь можно добавить логику для сохранения рейтинга (например, отправка на сервер)
  };

  return (
    <div className="rate">
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          onClick={() => handleRate(value)}
          style={{ cursor: 'pointer' }}
        >
          {value <= rating ? <StarFilled /> : <StarOutlined />}
        </span>
      ))}
    </div>
  );
};

export default Rate;
