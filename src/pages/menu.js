import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import routeApi from "../api/routes";

const options = [
  "Supprimer",
  "Bloquer",
  "Se désabonner",
];

const ITEM_HEIGHT = 48;

export default function LongMenu({
  pseudo,
  posteId,
  refresh,
  victime,
  isUser,
  loaded,
  user,
}) {
  const token = localStorage.getItem("FBIdToken");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async () => {
    setAnchorEl(null);
  };
  const handleDelete = async () => {
    const result = await routeApi.deletePost(token, posteId);
    if (!result.ok) {
      console.log(result);
    } else {
      refresh();
    }
  };
  const handleBlouque = async () => {
    //console.log(victime);
    const result = await routeApi.blouquePostUser(token, victime);
    if (!result.ok) {
      console.log(result);
    } else {
      refresh();
    }
  };
  const handleFollow = async () => {
    //console.log(victime);
    const result = await routeApi.unFollowUser(token, victime);
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
        style={{}}
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
        {loaded && (
          <MenuItem
            onClick={() => {
              window.location.href = "/profil/" + user;
            }}
          >
            Consulter
          </MenuItem>
        )}
        {loaded && isUser && (
          <MenuItem onClick={handleDelete}>Supprimer</MenuItem>
        )}

        {loaded && !isUser && (
          <MenuItem onClick={handleBlouque}>{"Bloquer"}</MenuItem>
        )}
        {loaded && !isUser && (
          <MenuItem onClick={handleFollow}>{" Se désabonner"}</MenuItem>
        )}
      </Menu>
    </div>
  );
}
