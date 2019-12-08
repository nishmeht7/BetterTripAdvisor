import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  card: {
    width: 550,
    height: 'auto',
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
  likes: {
    fontSize: 12,
    color: 'gray',
  }
}));

export default function ReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { review, user, handleLikeReview, handleEditReview, handleRemoveReview } = props;
  const { reviewId, title, reviewSubmissionTime, userNickname, reviewText, ratingOverall, userId, likes } = review;

  let letter = 'U'
  if(userNickname !== null) {
    letter = userNickname.substring(0,1).toUpperCase();
  }
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let noun = likes == 1 ? 'person' : 'people';

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {letter}
          </Avatar>
        }
        action={
          userId === user.userId &&
            <div>
            <IconButton onClick={() => handleEditReview(reviewId)} aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleRemoveReview(reviewId)} aria-label="edit">
              <DeleteIcon />
            </IconButton>
            </div>  
        }
        title={title}
        subheader={userNickname}
      />
      <CardActions disableSpacing>
        <IconButton onClick={() => handleLikeReview(reviewId)} aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <CardContent>
          <Typography paragraph> {reviewText}
          <br />
          <span className={classes.likes}>{`${likes} ${noun} found this review helpful`}</span>
          </Typography>
        </CardContent>
      </CardActions>
    </Card>
  );
}
