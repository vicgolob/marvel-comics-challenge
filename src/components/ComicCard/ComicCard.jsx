import PropTypes from 'prop-types';

import './ComicCard.scss';

function ComicCard({ image, title, year }) {
  return (
    <div className="comic-card">
      <div className="comic-image-container">
        <img src={image} role="presentation" />
      </div>
      <p className="text-small text-bold comic-title">{title}</p>
      <p className="text-xs">{year}</p>
    </div>
  );
}

export default ComicCard;

ComicCard.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  year: PropTypes.string,
};
