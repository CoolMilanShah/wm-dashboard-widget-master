import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import AuthForm, { STATE_LOGIN } from '../components/AuthForm';

class AuthPage extends React.Component {
  handleAuthState = authState => {
    if (authState === STATE_LOGIN) {
      this.props.history.push('/login');
    } else {
      this.props.history.push('/signup');
    }
  };

  render() {
    return (
      <Row
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Col md={6} lg={4}>
          <Card body>
            <AuthForm
              authState={this.props.authState}
              onChangeAuthState={this.handleAuthState}
              history={this.props.history}
              admin={this.props.admin}
              setAdmin={this.props.setAdmin}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default AuthPage;
