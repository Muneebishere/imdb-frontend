import React from 'react';
import { useHistory } from "react-router-dom";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import * as urls from '../urls';
import AddIcon from '@material-ui/icons/Add';
import { watchListGrid } from '../Assets/styles/watchListGrid';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export default function SingleLineGridList(props) {
  const classes = watchListGrid();
  const history = useHistory();

  function handleClick(id, tv_show_id, season_id){
    if(props.type === "film"){
      if(props.subtype === "movie"){history.push("/movies/" + id)}
      if(props.subtype === "tv_show"){history.push('/tv_shows/' + id)}
    } else if (props.type === "season"){
      history.push('/tv_shows/' + tv_show_id + '/seasons/' + id)
    } else if (props.type === "episode"){
      history.push('/tv_shows/' + tv_show_id + '/seasons/' + season_id + '/episodes/' + id)
    }
  }

  function existsInWatchlist(id) {
    if(props.type === "film") { return (props.watchlist_ids.indexOf(id) > -1)}
    if(props.type === "season") { return (props.seasons_on_watchlist.indexOf(id) > -1)}
    if(props.type === "episode") { return (props.episodes_on_watchlist.indexOf(id) > -1)}
  }

  return (
    <div className={classes.root}>
      <GridList cellHeight={300} className={classes.gridList} cols={5}>
        {props.list.map(item => (
          <GridListTile key={item.id} className={classes.listTile}>
            <img 
              src={urls.BASE_URL + item.show_detail.poster} 
              alt={item.show_detail.title} 
              className={classes.img}
              onClick={() => handleClick(item.id, item.tv_show_id ? item.tv_show_id : null, item.season_id ? item.season_id : null)}/>
            
            <GridListTileBar
              title={
                  <Typography component="h2" align="left" className={classes.title}>
                    {item.show_detail.title}
                  </Typography>}
              subtitle={
                <Typography component="h2" align="left" className={classes.rating}>
                  <StarIcon /> 8.7
                </Typography>}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                props.showWatchListBtn && ( 
                !existsInWatchlist(item.id) ? (
                  <IconButton className={classes.iconBtn} onClick={() => props.addToWatchlist(props.type, item.id)} aria-label={`Add ${item.show_detail.title}`}>
                    <AddIcon className={classes.icon} />
                  </IconButton> ) : (
                  <IconButton className={classes.iconBtn} onClick={() => props.removeFromWatchlist(props.type, item.id)} aria-label={`Add ${item.show_detail.title}`}>
                    <CheckCircleIcon className={classes.icon} />
                  </IconButton>
                ))
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
