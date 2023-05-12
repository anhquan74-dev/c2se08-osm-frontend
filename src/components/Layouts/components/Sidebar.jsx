import { Category, Comment, Dashboard, Notes, Person, PersonOutline } from '@mui/icons-material';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';

const sideBarArr = [
  {
    to: '/admin/dashboard',
    title: 'Dashboard',
    icon: <Dashboard />,
  },
  {
    to: '/admin/customer',
    title: 'Customer',
    icon: <Person />,
  },
  {
    to: '/admin/provider',
    title: 'Provider',
    icon: <PersonOutline />,
  },
  {
    to: '/admin/category',
    title: 'Category',
    icon: <Category />,
  },
  {
    to: '/admin/post',
    title: 'Post',
    icon: <Notes />,
  },
  {
    to: '/admin/comment-analysis',
    title: 'Comment Analysis',
    icon: <Comment />,
  },
];

const Sidebar = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          {sideBarArr.map((item, index) => {
            return (
              <NavLink key={index} to={item.to} className="sidebar__item">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            );
          })}
        </List>
      </nav>
    </Box>
  );
};

export default Sidebar;
