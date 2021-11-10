import React from 'react';
import { useParams } from 'react-router-dom';

const index: React.FC = () => {
  let { id } = useParams<{ id: string }>();

  return <p>this is {id}/user.tsx</p>;
};

export default index;
