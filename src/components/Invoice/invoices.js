import React from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { Button, Segment, List } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import * as routes from '../../constants/routes';


const Invoices = ({ invoices, history }) => {
  if(!isLoaded(invoices)) {
    return (
      <div className="ui segment">
        <p></p>
        <div className="ui active dimmer">
          <div className="ui loader"></div>
        </div>
      </div>
    )
  }

  const emptyList = (
    <Segment textAlign='center' raised padded>
      No invoices available
    </Segment>
  );
  const invoiceList = Object.keys(invoices || {}).map((id) =>
    <List.Item key={ id }>
      <List.Content floated='right'>
        <Button inverted color='blue' onClick={  () => { history.push(`${routes.INVOICE}/${id}`) }}>View</Button>
      </List.Content>
      <List.Content>
        { invoices[id].title }
      </List.Content>
    </List.Item>
  );

  const list = isEmpty(invoices)
    ? emptyList
    : (
      <List divided verticalAlign='middle'>
        { invoiceList }
      </List>
    );

  return list;
}

export default withRouter(Invoices);