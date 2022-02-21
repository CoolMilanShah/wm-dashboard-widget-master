import React, { useState } from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { STATE_LOGIN, STATE_SIGNUP } from './components/AuthForm';
import GAListener from './components/GAListener';
import {
  EmptyLayout,
  LayoutRoute,
  MainLayout,
  AccessDeniedComponent,
} from './components/Layout';
import PageSpinner from './components/PageSpinner';
import AuthPage from './pages/AuthPage';
import './styles/reduction.scss';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));

const ManageVerticalPage = React.lazy(() =>
  import('./pages/ManageVertical/ManageVertical'),
);
const ManageSubVerticalPage = React.lazy(() =>
  import('./pages//ManageSubVertical/ManageSubVertical'),
);
const ManageVendorPage = React.lazy(() =>
  import('./pages/ManageVendor/ManageVendor'),
);
const ManageCompanyPage = React.lazy(() =>
  import('./pages/ManageCompany/ManageCompany'),
);
const ManageClientPage = React.lazy(() =>
  import('./pages/ManageClient/ManageClient'),
);
const ManageTransactionPage = React.lazy(() =>
  import('./pages/ManageTransaction/ManageTransaction'),
);

const ManageAumPage = React.lazy(() => import('./pages/ManageAUM/ManageAum'));
const ManageExpensePage = React.lazy(() =>
  import('./pages/ManageExpense/ManageExpense'),
);
const ManageInsuranceDetailPage = React.lazy(() =>
  import('./pages/ManageInsurancePolicyDetail/ManageInsuranceDetail'),
);

const ManageTermDepositPage = React.lazy(() =>
  import('./pages/ManageTermPolicyDetail/ManageTermDetail'),
);

const FileUpload = React.lazy(() => import('./pages/FileUpload'));

const DocUpload = React.lazy(() => import('./pages/Documents/Upload'));

const DocDownload = React.lazy(() => import('./pages/Documents/Download'));

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

// eslint-disable-next-line react/prefer-stateless-function
const App = () => {
  const [admin, setAdmin] = useState(false);

  return (
    <BrowserRouter basename={getBasename()}>
      <GAListener>
        <Switch>
          <LayoutRoute
            exact
            path="/"
            layout={EmptyLayout}
            component={props => (
              <AuthPage
                {...props}
                authState={STATE_LOGIN}
                setAdmin={setAdmin}
              />
            )}
          />
          <LayoutRoute
            exact
            path="/admin"
            layout={EmptyLayout}
            component={props => (
              <AuthPage
                {...props}
                authState={STATE_LOGIN}
                admin={true}
                setAdmin={setAdmin}
              />
            )}
          />
          <LayoutRoute
            exact
            path="/signup"
            layout={EmptyLayout}
            component={props => (
              <AuthPage {...props} authState={STATE_SIGNUP} />
            )}
          />

          <MainLayout>
            <React.Suspense fallback={<PageSpinner />}>
              <Route
                exact
                path="/dashboard"
                render={props =>
                  admin === 'true' ? (
                    <DashboardPage {...props} />
                  ) : (
                    <AccessDeniedComponent {...props} />
                  )
                }
              />

              <Route
                exact
                path="/manage-verticals"
                component={ManageVerticalPage}
              />
              <Route
                exact
                path="/manage-subverticals"
                component={ManageSubVerticalPage}
              />
              <Route
                exact
                path="/manage-vendors"
                component={ManageVendorPage}
              />
              <Route
                exact
                path="/manage-companies"
                component={ManageCompanyPage}
              />
              <Route exact path="/manage-client" component={ManageClientPage} />
              <Route
                exact
                path="/manage-transaction"
                render={props =>
                  admin === 'true' ? (
                    <ManageTransactionPage {...props} />
                  ) : (
                    <AccessDeniedComponent {...props} />
                  )
                }
              />
              <Route
                exact
                path="/manage-aum"
                render={props =>
                  admin === 'true' ? (
                    <ManageAumPage {...props} />
                  ) : (
                    <AccessDeniedComponent {...props} />
                  )
                }
              />
              <Route
                exact
                path="/manage-expense"
                render={props =>
                  admin === 'true' ? (
                    <ManageExpensePage {...props} />
                  ) : (
                    <AccessDeniedComponent {...props} />
                  )
                }
              />
              <Route
                exact
                path="/manage-insurancedetail"
                component={ManageInsuranceDetailPage}
              />
              <Route
                exact
                path="/manage-termdeposits"
                component={ManageTermDepositPage}
              />
              <Route exact path="/file-upload" component={FileUpload} />
              <Route exact path="/document-upload" component={DocUpload} />
              <Route exact path="/document-download" component={DocDownload} />
            </React.Suspense>
          </MainLayout>
          <Redirect to="/" />
        </Switch>
      </GAListener>
    </BrowserRouter>
  );
};

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (width > 576 && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (width > 768 && width < 991) {
    return { breakpoint: 'md' };
  }

  if (width > 992 && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
