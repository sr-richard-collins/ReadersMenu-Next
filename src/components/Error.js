const Error = (props) => {
  return (
    <>
      <section className='error'>
        <div className='container'>
          <div className='error-content'>{props.title}</div>
        </div>
      </section>
    </>
  );
};

export default Error;
