import React from 'react';
import axios from 'axios';
import moment from 'moment';
import CdCards from '../components/cdCards/CdCards.jsx';

export default class ServerManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    axios.get('/geCDs')
      .then((res) => {
        const { data } = res;
        this.setState({ data });
      })
      .catch((err) => {
        //  we can log error to monitor system
        console.log(err); // eslint-disable-line
      });
  }

  render() {
    const { data } = this.state;
    console.log(data);
    return (
      <div className="container">
        <div className="header">
          <h3>CD PORTAL</h3>
        </div>
        <div className="cds">
          <CdCards items={data} />
        </div>
      </div>
    );
  }
}
