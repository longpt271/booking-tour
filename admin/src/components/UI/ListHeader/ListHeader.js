const { Button } = require('react-bootstrap');
const { Link } = require('react-router-dom');

const ListHeader = ({ name1, name2 }) => {
  return (
    <div className="fw-bold shadow-none p-3 mb-3 bg-light rounded">
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ height: '30px' }}
      >
        <span className="text-capitalize">List {name1}</span>

        {name2 && (
          <Link to={`/${name1.toLowerCase()}/new`}>
            <Button size="sm" className="text-capitalize">
              New {name2}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ListHeader;
