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
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (authorId !== parseInt(currentUserId)) {
    return null;
  }

  return (
    <>
      <IconButton onClick={handleClick}>
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
          onClick={() => {
            handleClose();
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
