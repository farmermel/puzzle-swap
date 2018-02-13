import React from 'react';

const PostPuzzleForm = () => {
  return (
    <form>
      <input type='text' placeholder='puzzle title' />
      <p>upload photo of puzzle</p>
      <p>also number of pieces, pieces missing, description</p>
    </form>
  )
}

export default PostPuzzleForm;