import { Pagination } from 'react-bootstrap';

export default function OrderPagination(props) {
  let paginationItems = [];
  // const perPage = 5;
  const pagesCount = props.orderLength / props.perPage;

  // const [currentPage, setCurrentPage] = useState(1);

  const paginationClick = (e) => {
    // console.log(props.page);
    props.page.setCurrentPage(e.target.getAttribute('data-page'));
    // setCurrentPage(e.target.getAttribute('data-page'));
    props.changePage(e.target.getAttribute('data-page'), props.perPage);
  };

  for (let number = 1; number <= Math.ceil(pagesCount); number++) {
    // console.log(currentPage + ' = ' + number);
    // console.log(Number(currentPage) === number);
    paginationItems.push(
      <Pagination.Item
        onClick={paginationClick}
        key={number}
        active={Number(props.page.currentPage) === number}
        data-page={number}
      >
        {number}
      </Pagination.Item>
    );
  }

  return <Pagination className="d-flex justify-content-center">{paginationItems}</Pagination>;
}
