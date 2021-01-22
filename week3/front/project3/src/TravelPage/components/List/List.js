import React from 'react';
import { Paper, Typography, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Title from './Title';
import Card from '../Card';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import ContentCard from '../ContentCard';

const useStyle = makeStyles((theme) => ({
  root: {
    minWidth: '300px',
    backgroundColor: '#EBECF0',
    paddingTop:'15px',
    marginLeft: theme.spacing(1),
  },
  cardContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    paddingBottom: theme.spacing(2),
  },
}));
export default function List({ list, index }) {
  const classes = useStyle();
  return (
        <div>
          <Paper className={classes.root}>
            <CssBaseline />
            <Title title={list.title} listId={list.id} />
            <Droppable droppableId={list.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={classes.cardContainer}
                >
                  {list.cards.map((card, index) => (
                    <ContentCard key={card.id} card={card} index={index} />
                  ))}
                  {provided.placeholder}
                  
                </div>
              )}
            </Droppable>
          </Paper>
        </div>
  );
}