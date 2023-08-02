import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={320}
    height={500}
    viewBox="0 0 320 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="166" cy="151" r="123" />
    <rect x="34" y="299" rx="6" ry="6" width="275" height="19" />
    <rect x="34" y="342" rx="10" ry="10" width="277" height="85" />
    <rect x="31" y="453" rx="18" ry="18" width="102" height="35" />
    <rect x="156" y="448" rx="20" ry="20" width="158" height="45" />
  </ContentLoader>
);

export default Skeleton;
