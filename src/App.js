import React from "react";
import { Table, Divider } from "antd";
import { Link } from "react-router-dom";

import "antd/dist/antd.css";
import "./App.css";

const columns = [
  {
    title: "Name",
    key: "name",
    sorter: true,
    render: (data, row) => `${row.first_name} ${row.last_name}`
  },
  {
    title: "Email",
    dataIndex: "email"
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <Link
          to={{
            pathname: `/edit`,
            state: {
              ...record
            }
          }}
        >
          Edit
        </Link>
        <Divider type="vertical" />
        <a>Delete</a>
      </span>
    )
  }
];
const PageSize = 5;

// function App() {
//   const [paginator, setPaginator] = useState({});
//   const [tableData, setTableData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [tableState, setTableState] = useState({
//     data: [],
//     pagination: {},
//     loading: false
//   });

//   useEffect(() => {
//     getData(1);
//   }, []);
//   useEffect(() => {
//     console.log(tableState);
//   }, [tableState]);

//   const handleTableChange = (pagination, filters, sorter) => {
//     // const pager = { ...paginator };
//     // pager.current = pagination.current;
//     // setPaginator(pager);

//     setTableState({
//       ...tableState,
//       pagination: {
//         ...tableState.pagination,
//         current: pagination.current
//       }
//     });
//     getData(pagination.current);
//   };

//   const getData = currentPage => {
//     setTableState({
//       ...tableState,
//       loading: true
//     });
//     fetch(
//       `https://reqres.in/api/users?page=${currentPage}&per_page=${PageSize}`
//     )
//       .then(data => data.json())
//       .then(response => {
//         // const pagination = { ...paginator };
//         // pagination.total = response.total_pages;

//         setTableState({
//           data: response.data,
//           pagination: {
//             ...tableState.pagination,
//             total: response.total_pages
//           },
//           loading: false
//         });
//         // setTableData(response.data);
//         // setPaginator(pagination);
//         // setLoading(false);
//       });
//   };

//   return (
//     <div className="App">
//       <div className="table-wrapper">
//         <Table
//           columns={columns}
//           rowKey={record => record.id}
//           dataSource={tableState.data}
//           pagination={tableState.pagination}
//           loading={tableState.loading}
//           onChange={handleTableChange}
//         />
//       </div>
//     </div>
//   );
// }
// const columns = [
//   {
//     title: "Name",
//     dataIndex: "name",
//     sorter: true,
//     render: name => `${name.first} ${name.last}`,
//     width: "20%"
//   },
//   {
//     title: "Gender",
//     dataIndex: "gender",
//     filters: [
//       { text: "Male", value: "male" },
//       { text: "Female", value: "female" }
//     ],
//     width: "20%"
//   },
//   {
//     title: "Email",
//     dataIndex: "email"
//   }
// ];
class App extends React.Component {
  state = {
    data: [],
    pagination: {},
    loading: false
  };

  componentDidMount() {
    this.fetch();
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    this.fetch(pagination.current);
  };

  fetch = (currentPage = 1) => {
    this.setState({ loading: true });
    fetch(
      `https://reqres.in/api/users?page=${currentPage}&per_page=${PageSize}`
    )
      .then(res => res.json())
      .then(data => {
        const pagination = { ...this.state.pagination };
        pagination.total = data.total;

        this.setState({
          loading: false,
          data: data.data,
          pagination
        });
      });
  };

  render() {
    return (
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    );
  }
}

export default App;
