'use client';

import React, { useState, useEffect, useRef, useContext } from 'react';
import { IMAGE_BASE_URL } from '../../config';
import axios from '../../config';
import CustomPagination from '../CustomPagination';
import { format } from 'date-fns';
import { AuthContext } from '../../provider/AuthContext';
import { useRouter } from 'next/navigation';

const CommentComponent = ({ post }) => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const textareaRef = useRef(null); // Ref to store reference to the textarea element
  const [isReplyClicked, setIsReplyClicked] = useState(false); // State to track if Reply is clicked
  const [parentComment, setParentComment] = useState(null); // State to track if Reply is clicked
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage, setCommentsPerPage] = useState(10);
  const [totalComments, setTotalComments] = useState(0);
  const [clickedReplyId, setClickedReplyId] = useState(null);
  const router = useRouter(); // Hook for navigation

  useEffect(() => {
    // Fetch data from Laravel backend
    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/user/getComments`, {
          id: post.id,
          currentPage: currentPage,
          commentsPerPage,
        });
        if (commentsPerPage === 'all') {
          setComments(response.data);
          setTotalComments(response.data.length);
        } else {
          setComments(response.data.data);
          setTotalComments(response.data.total);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [post.id, currentPage, commentsPerPage]);

  useEffect(() => {
    if (isReplyClicked && textareaRef.current) {
      textareaRef.current.focus(); // Focus on textarea when isReplyClicked is true
      setIsReplyClicked(false);
    }
  }, [isReplyClicked]); // Dependency array ensures useEffect runs when isReplyClicked changes

  const handleReplyClick = (id, parent_id) => {
    setIsReplyClicked(true);
    setParentComment(`${parent_id}_${id}`);
    setClickedReplyId(id);

    // Ensure smooth scroll for textareaRef
    if (textareaRef.current) {
      textareaRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalPages = Math.ceil(totalComments / commentsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handlePerPageChange = (event) => {
    setCommentsPerPage(event.target.value);
    setCurrentPage(1); // Reset to the first page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const router = useRouter();

    if (!user) {
      router.push('/login');
      return;
    }

    try {
      const response = await axios.post('/api/user/saveComment', {
        parent_id: parentComment,
        post_id: post.id,
        user_id: user.id,
        comment: textareaRef.current.value,
      });


      // Update the comments list without reloading the page
      setComments((prevComments) => [
        ...prevComments,
        response.data.newComment, // Assuming your API returns the newly created comment
      ]);

      // Optionally, clear the textarea
      textareaRef.current.value = '';

    } catch (error) {
      console.error('Error saving comment:', error);
    }
  };

  const renderComments = (comments) => {
    return (
      <div className='latest-comments'>
        {comments.map((comment) => (
          <ul key={comment.id} className='list-wrap'>
            <li>
              <div className='comments-box'>
                <div className='comments-avatar'>
                  <img src={IMAGE_BASE_URL + 'profile/' + comment.user.avatar} alt='img' />
                </div>
                <div className='comments-text'>
                  <div className='avatar-name'>
                    <h6 className='name'>{comment.user.name}</h6>&nbsp;&nbsp;
                    <span className='date'>{format(new Date(comment.updated_at), 'dd MMMM, yyyy')}</span>
                  </div>
                  <p>{comment.content}</p>
                  <p
                    className={clickedReplyId === comment.id ? 'reply-btn-active' : 'reply-btn'}
                    onClick={() => handleReplyClick(comment.id, comment.parent_id)}
                  >
                    Reply
                  </p>
                </div>
              </div>
              {comment.child && comment.child.length > 0 && <ul className='children'>{renderComments(comment.child)}</ul>}
            </li>
          </ul>
        ))}
      </div>
    );
  };

  return (
    <section className='blog-details-area'>
      <div className='author-inner-wrap'>
        <div className='row justify-content-center'>
          <div className='blog-details-wrap'>
            <div className='comments-wrap'>
              {comments.length ? <h3 className='comments-wrap-title'>Comments</h3> : ''}
              {renderComments(comments)}
              {comments.length ? (
                <>
                  <CustomPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                  <form className='form-inline ml-3'>
                    <label htmlFor='per_page' className='mr-2'>
                      Show:
                    </label>
                    <select name='per_page' id='per_page' className='form-control' value={commentsPerPage} onChange={handlePerPageChange}>
                      <option value='10'>10/page</option>
                      <option value='20'>20/page</option>
                      <option value='all'>All</option>
                    </select>
                  </form>
                </>
              ) : (
                ''
              )}
            </div>
            <div className='comment-respond'>
              <h3 className='comment-reply-title'>Post a comment</h3>
              <form action='#' className='comment-form' onSubmit={handleSubmit}>
                <p className='comment-notes'>Your email address will not be published. Required fields are marked *</p>
                <div className='form-grp'>
                  <textarea ref={textareaRef} name='comment' placeholder='Comment'></textarea>
                </div>
                <button type='submit' className='btn btn-two'>
                  {user ? 'Post Comment' : 'Login Comment'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommentComponent;
