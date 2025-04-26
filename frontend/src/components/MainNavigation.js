import React from "react";
import { Form, NavLink, useRouteLoaderData } from "react-router-dom";

const MainNavigation = () => {
  const menuItems = [
    { name: "Home", href: "/", current: true },
    { name: "Books", href: "/books", current: false },
  ];
  const userObj = useRouteLoaderData("root");

  return (
    <header>
      <nav className="bg-gray-300 rounded-md">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            {menuItems.map((menuItem) => {
              return (
                <NavLink
                  exact={menuItem.name.toString()}
                  to={menuItem.href}
                  className="text-md  text-blue-600 dark:text-blue-500 hover:underline"
                >
                  {menuItem.name}
                </NavLink>
              );
            })}
          </div>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">            
            {userObj.userType === 'admin' && (
              <NavLink to="/admin" className="text-md  text-blue-600 dark:text-blue-500 hover:underline">
              Admin Dashboard
            </NavLink>
            )}
          </div>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            {!userObj.token && (
              <NavLink to="/auth" className="text-md  text-blue-600 dark:text-blue-500 hover:underline">
                Login
              </NavLink>
            )}
            {userObj.token && (
              <Form action="/logout" method="post">
                <button className="text-md  text-blue-600 dark:text-blue-500 hover:underline">Logout</button>
              </Form>
            )}
          </div>
          
        </div>
      </nav>
    </header>
  );
};

export default MainNavigation;
