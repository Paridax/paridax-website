import React from 'react';
import './index.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import * as Pg from './pages';
import { getUserData } from './utils/api';
import { UserContext, LoadingContext } from './utils/context';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoaderLg } from './components/Loader';

function App() {

  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [apiOutage, setApiOutage] = React.useState(false);

  React.useEffect(() => {
    getUserData()
      .then(({ data }: any) => {
        if (!data.loggedIn) {
          // console.log('Guest');
          setLoading(false);
        } else {
          setUser(data);
          setLoading(false);
          // // console.log(data);
        }
      }).catch((err: Error) => {
        // // console.log(err);
        setApiOutage(true);
        setLoading(false);
      });
  }, []);
  
  if (!loading) {
    return (
      <div className="overflow-x-hidden">
        <UserContext.Provider value={[user, setUser]}>
          <LoadingContext.Provider value={[loading, setLoading]}>
            <Routes>
              <Route path="/" element={<Pg.Landing />} />
              <Route path="/dashboard" element={<Pg.Dashboard />} />
              <Route path="/dashboard/users" element={<Pg.DashboardViewUsers />} />
              <Route path="/dashboard/users/:userId" element={<Pg.DashboardViewUser />} />
              <Route path="/dashboard/blog" element={<Pg.DashboardViewBlogs />} />
              <Route path="/dashboard/blog/create" element={<Pg.DashboardCreateBlog />} />
              <Route path="/dashboard/blog/posts/:postId" element={<Pg.DashboardViewBlog />} />\
              <Route path="blog/" element={<Pg.BlogSelection />} />
              <Route path="blog/:postId" element={<Pg.BlogPost />} />
              <Route path="/login" element={<Pg.Login />} />
              <Route path="/register" element={<Pg.Register />} />
              <Route path="/logout" element={<Pg.Logout />} />

              <Route path="/projects" element={<Pg.WorkInProgress />} />
              <Route path="/mc-lockdown" element={<Pg.WorkInProgress />} />
              <Route path="/advance-bot" element={<Pg.WorkInProgress />} />

              <Route path="*" element={<Pg.NotFound />} />
            </Routes>
          </LoadingContext.Provider>
        </UserContext.Provider>
      </div>
    );
  }

  // if (!loading && apiOutage) {
  //   return (
  //     <div className="flex items-center justify-around h-screen">
  //       <div>
  //         <h1 className="text-lg font-semibold text-primary mx-auto my-3">API Outage</h1>
  //         <div className="mx-auto shrink"><LoaderLg color="text-primary" /></div>
  //       </div>
  //     </div>
  //   );
  // }
  
  return (
    <div>
      <ProtectedRoute />
    </div>
  );
}

// < Route path="test" element={<Pg.Loading />} / >

export default App;