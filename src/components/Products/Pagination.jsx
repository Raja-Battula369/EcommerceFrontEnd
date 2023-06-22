const Pagination = ({ setPage, page }) => {
  const btnArray = Array.from('1234');

  return (
    <div>
      {btnArray.map((item, i) => (
        <button
          className={page === i + 1 ? 'btnActive' : 'btn'}
          onClick={() => setPage(i + 1)}
          key={item + i}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

Pagination.prototype = {
  setPage: () => '',
  page: Number,
};
export default Pagination;
