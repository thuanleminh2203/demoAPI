import { Table, Input, Button, Icon , message} from 'antd';
import Highlighter from 'react-highlight-words';
import React from 'react';
import axios from 'axios'


// var data1 = [];
// axios({
//     method : 'GET',
//     url: 'https://5d0c82719ab9d80014c260c1.mockapi.io/api/users',
//     data : null
// }).then(res => {data1.push(res.data); console.log(data1);
// })
// .catch(err => console.log(err))



// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//   },
//   {
//     key: '2',
//     name: 'Joe Black',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//   },
//   {
//     key: '3',
//     name: 'Jim Green',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//   },
//   {
//     key: '4',
//     name: 'Jim Red',
//     age: 32,
//     address: 'London No. 2 Lake Park',
//   },
// ];
// var data1 = [];

class ListSv extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchText: '',
      data : []
    };
  }
  componentDidMount(){
    axios({
        method : 'GET',
        url: 'https://5d0c82719ab9d80014c260c1.mockapi.io/api/users',
        data : null
    }).then(res => {
      this.setState({
        data : res.data
      })
      
      // console.log(this.state.data);
    })
    .catch(err => console.log(err))
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };
  showMessage = (id) =>{
    message.success(id);
    // console.log(record.target)
  }

  render() {
    let {data} = this.state;
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: '20%',
        ...this.getColumnSearchProps('age'),
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        ...this.getColumnSearchProps('address'),
      },{
        title: 'Action',
        key: 'action',
        render : record => (
          <>
             
            {(record.id)}
              
            <Button type="primary" onClick={record.id => this.showMessage(record.id)}  style={{marginRight : '5px'}}><Icon type="edit" />Chi tiết</Button>
            <Button type="danger"><Icon type="delete" />Xóa</Button>
          </>
        )
        

      }
    ];
    return <Table rowKey = {record => record.id} columns={columns} dataSource={data} />;
  }
}

export default ListSv;