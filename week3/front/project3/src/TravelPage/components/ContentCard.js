import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Draggable} from 'react-beautiful-dnd';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
rooti: {
    width:'500px',
    minWidth: '500px',
},

bullet: {
display: 'inline-block',
margin: '0 2px',
transform: 'scale(0.8)',
},
title: {
fontSize: 14,
color:'rgb(10, 19, 99)',
},
content:{
    fontWeight:700,
fontFamily:'BMHANNAAir',
color:'rgb(10, 19, 99)',
},
score:{

    fontFamily:'BMHANNAAir',
    color:'rgb(10, 19, 99)',
    fontSize:18,
},
pos: {
marginBottom: 12,
},
button:{
    color:'rgb(10, 19, 99)',
    marginTop:'-15px',
}
});

export default function ContentCard({card, index}) {
const classes = useStyles();
//const bull = <span className={classes.bullet}>•</span>;

return (
    <Draggable draggableId = {card.id} index = {index} >
        {(provided) =>(
            <div 
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            >
            <Card className={classes.rooti}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {card.content}
                    </Typography>
                    <Typography variant="h5" className={classes.content} component="h2">
                        {card.contentname}
                    </Typography>
                    <Typography variant="body2" className={classes.score} component="p">
                        인기점수 :{card.score} 점
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button className={classes.button} size="small" onClick ={()=> window.open('https://www.visitjeju.net/kr/detail/view?contentsid='+ card.contentid, '_blank')}>More</Button>
                </CardActions>
            </Card>    
            </div>
        )}
    </Draggable>
    );
}