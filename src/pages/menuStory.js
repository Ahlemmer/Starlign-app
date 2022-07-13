import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import routeApi from "../api/routes";
import { useState } from "react";

const ITEM_HEIGHT = 48;

export default function MenuStory({ posteId, refresh }) {
  const token = localStorage.getItem("FBIdToken");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async () => {
    setAnchorEl(null);
  };
  const handleDelete = async () => {
    const result = await routeApi.deleteStory(token, posteId);
    if (!result.ok) {
      console.log(result);
    } else {
      refresh();
    }
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        style={{
          color: "#fff",
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem onClick={handleDelete}>Supprimer</MenuItem>
      </Menu>
    </div>
  );
}
