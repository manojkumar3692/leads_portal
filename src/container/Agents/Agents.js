import React, { PureComponent } from 'react';
import {withRouter} from 'react-router-dom'
import './Agents.scss';
import {useParams} from 'react-router-dom'
import ListComponent from '../../component/ListComponent/ListComponent';

class Agents extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      leadData: []
    }
    this.claimLeads = this.claimLeads.bind(this)
  }


  componentDidMount() {
    let leadData = JSON.parse(localStorage.getItem('privyr')) || []
    this.setState({ leadData })
  }

  claimLeads(lead,index) {
    const setLeadData = JSON.parse(localStorage.getItem('privyr'))
    if('isClaim' in lead && lead.isClaim) {
      alert('already taken')
    }
    setLeadData[index]['isClaim'] = true
    setLeadData[index]['claimedBy'] = this.props.match.params.id
    localStorage.setItem('privyr', JSON.stringify(setLeadData));
    this.setState({leadData: setLeadData})
  }

  render() {
    return (
      <div>
        <div className="background">
          <div className="container">
            <div className="screen">
              <div className="screen-header">
                <div className="screen-header-left">
                  <div className="screen-header-button close"></div>
                  <div className="screen-header-button maximize"></div>
                  <div className="screen-header-button minimize"></div>
                </div>
                <div className="screen-header-right">
                  <div className="screen-header-ellipsis"></div>
                  <div className="screen-header-ellipsis"></div>
                  <div className="screen-header-ellipsis"></div>
                </div>
              </div>
              <div className="screen-body">
                <div className="screen-body-item">
                  <div className="app-title">
                    <span>ACTIVE LEADS</span>
                  </div>
                </div>
              </div>
              <ListComponent data={this.state.leadData} agentId={this.props.match.params.id} />
              {/* {
                this.state.leadData.map((lead, index) => {
                  return (
                    <div className="screen-list" key={index}>
                      <div className="screen-image">
                        <img src={'../../images/lead-icon-png-29.jpg'}></img>
                      </div>
                      <div className="screen-content">
                        <h1>{lead.fullName}</h1>
                        <p>{lead.comments}</p>
                        <div>
                          <h2>{lead.email}</h2>
                          <h2>{lead.phoneNumber}</h2>
                        </div>
                      </div>
                      <div className="screen-action">
                        <div>
                          <button onClick={() => this.claimLeads(lead,index)}>Accept</button>
                          </div>
                      </div>
                    </div>
                  )
                })
              } */}

            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Agents);