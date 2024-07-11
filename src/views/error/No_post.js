import React, { useState, useEffect } from 'react';
import Error from '../../components/Error';

const NoPost = () => {
  const error_message = 'Sorry, No content Found. Try other topics';

  return (
    <>
      <Error title={error_message} />
    </>
  );
};

export default NoPost;
