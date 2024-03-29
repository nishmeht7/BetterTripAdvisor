import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  card: {
    width: 345,
    height: 150,
    margin: 5,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundImage: 'url(https://source.unsplash.com/1600x900/?skyline)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const getImage = () => ("https://source.unsplash.com/1600x900/?hotel");

export default function HotelCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { result } = props;
  const { city, hotelId, name, state } = result;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClick = () => {
    props.history.push(`/hotelInfo?hotelId=${hotelId}`)
  }

  return (
    <Card onClick={handleClick} className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {name.substring(0,1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={`${city}, ${state}`}
      />
      <CardMedia
        className={classes.media}
        image={getImage()}
        title={name}
      />
    </Card>
  );
}
