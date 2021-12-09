import React from 'react';
import PropTypes from 'prop-types';
import { useAxios } from '../query/AxiosProvider';

import { IconButton, Menu, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ContextMenuDelete = ({ authorId, deleteMutation }) => {
  const { userId: currentUserId } = useAxios();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const preventPropagation = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const handleClick = (event) => {
    preventPropagation(event);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    preventPropagation(e);
    setAnchorEl(null);
  };

  if (authorId !== parseInt(currentUserId)) {
    return null;
  }

  return (
    <>
      <IconButton
        onClick={handleClick}
        onMouseDown={preventPropagation}
        onTouchStart={preventPropagation}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={(e) => {
            handleClose(e);
            deleteMutation.mutate();
          }}
        >
          <DeleteIcon /> Delete
        </MenuItem>
      </Menu>
    </>
  );
};

ContextMenuDelete.propTypes = {};

export default ContextMenuDelete;
