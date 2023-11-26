import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import dp from "../files/dp.png";
import { useState, useEffect } from "react";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 10,
  p: 3,
};

export default function RecipeReviewCard({ selectedUser }) {
  const [expanded, setExpanded] = React.useState(false);
  const [data, setData] = useState([]);
  const [single, setSingle] = useState([]);
  var a;
  var b;
  useEffect(() => {
    a = JSON.parse(localStorage.getItem("User"));
    setData(a);
  }, [selectedUser]);
  console.log(data);
  useEffect(() => {
    b = a.filter((e) => e.u_id === selectedUser);
    setSingle(b);
  }, [b]);
  console.log(single);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={style}>
      {single.map((i, index) => {
        return (
          <>
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: red[500], textTransform: "capitalize" }}
                  aria-label="recipe"
                >
                  {i.name.charAt(2)}
                </Avatar>
              }
              title={
                <p style={{ fontWeight: "bolder", fontSize: "20px" }}>
                  {i.name}
                </p>
              }
              subheader={<p style={{ fontWeight: "bolder" }}>{i?.email}</p>}
            />
            <CardMedia component="img" style={{ height: '320px' }} image={dp} alt="Paella dish" />
            <CardActions disableSpacing>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Phone : +91 {i.phone}</Typography>
                <Typography paragraph>Address : {i?.address}</Typography>
              </CardContent>
            </Collapse>
          </>
        );
      })}
    </Card>
  );
}
