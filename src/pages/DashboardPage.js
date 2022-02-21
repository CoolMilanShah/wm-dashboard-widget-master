import React from 'react';
import { Col, Row } from 'reactstrap';
import Page from '../components/Page';
import { LineChart } from '../components/Charts/LineChart';
import { BarChart } from '../components/Charts/BarChart';
import { StackedBarChart } from '../components/Charts/StackedBarChart';

class DashboardPage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <Page
        className="DashboardPage"
        title="Dashboard"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}>
        <Row>
          <Col lg="6" md="12" sm="12" xs="12">
            <BarChart
              displayTitle="Gross Revenue"
              barType="GrossRevenueBarData"
            />
          </Col>

          <Col lg="6" md="12" sm="12" xs="12">
            <BarChart displayTitle="Net Revenue" barType="NetRevenueBarData" />
          </Col>
        </Row>

        <Row>
          <Col lg="6" md="12" sm="12" xs="12">
            <StackedBarChart
              displayTitle="Gross Revenue Percentage"
              barType="GrossRevenueBarData"
            />
          </Col>

          <Col lg="6" md="12" sm="12" xs="12">
            <LineChart lineType="ExpenseLineData" title="Total Expenses" />
          </Col>

          <Col lg="6" md="12" sm="12" xs="12">
            <LineChart lineType="AUMLineData" title="Total AUM" />
          </Col>

          <Col lg="6" md="12" sm="12" xs="12">
            <LineChart lineType="SIPLineData" title="Total SIP" />
          </Col>
        </Row>
      </Page>
    );
  }
}
export default DashboardPage;
