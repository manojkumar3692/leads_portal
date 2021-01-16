import React, { PureComponent } from 'react';
import {withRouter} from 'react-router-dom';
import LeadLogo from '../../images/lead-icon-png-29.jpg';
// import './Agents.scss';

class ListComponent extends PureComponent {
  constructor(props) {
    super(props)
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
    }else {
    setLeadData[index]['isClaim'] = true
    setLeadData[index]['claimedBy'] = this.props.match.params.id
    localStorage.setItem('privyr', JSON.stringify(setLeadData));
    this.setState({leadData: setLeadData})
    alert('You have claimed successfully , Redirect to /leads')
    }
  }

  render() {
    return (
      <div>
              {
                this.props.data.map((lead, index) => {
                  return (
                    <div className="screen-list" key={index}>
                      <div className="screen-image">
                        <img src={LeadLogo}></img>
                      </div>
                      <div className="screen-content">
                        <h1>{lead.fullName}</h1>
                        <p>{lead.comments}</p>
                        <div className="screen-content-more">
                          <h2>{lead.email}</h2>
                          <h2>{lead.phoneNumber}</h2>
                        </div>
                        <div className="screen-action">
                        {
                            this.props.ClaimMetaData && <p>{lead.hasOwnProperty('claimedBy') && `${'Claimed By :' + lead.claimedBy}`}</p>
                        }
                      </div>
                      </div>
                      <div className="screen-action">
                        <div>
                          { !this.props.ClaimMetaData && <button onClick={() => this.claimLeads(lead,index)}>Accept</button>}
                          </div>
                      </div>
                    </div>
                  )
                })
              }
      </div>
    )
  }
}

export default  withRouter(ListComponent);