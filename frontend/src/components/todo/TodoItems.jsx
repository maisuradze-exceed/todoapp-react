// Import from libraries
import React, { Component } from 'react';
import propTypes from 'prop-types';

// Material UI
import { Button, Checkbox } from '@material-ui/core/';
import Delete from '@material-ui/icons/Delete';

// Import from components
import FormDialog from './FormDialog';

class TodoItems extends Component {
  render() {
    const { data, check, del } = this.props;
    const todos = data.map((element) => (
      <div key={element._id}>
        <li>
          <Checkbox
            color='primary'
            checked={element.isCompleted}
            onChange={(event) => check(event, element._id)}
          />
          <span id='text' className={element.isCompleted ? 'done' : ''}>
            {element.value}
          </span>
          <div className='btn-div'>
            <FormDialog edit={element.value} id={element._id} />
            <Button
              className='btn-del'
              variant='contained'
              color='secondary'
              size='small'
              onClick={() => del(element._id)}
              startIcon={<Delete />}
            >
              Delete
            </Button>
          </div>
        </li>
      </div>
    ));
    return <div>{todos}</div>;
  }
}

TodoItems.propTypes = {
  check: propTypes.func.isRequired,
  data: propTypes.arrayOf(propTypes.objectOf({
    _id: propTypes.string,
    isCompleted: propTypes.bool,
    value: propTypes.string,
    user: propTypes.string,
    _v: propTypes.number,
  })).isRequired,
  del: propTypes.func.isRequired,
};

export default TodoItems;
