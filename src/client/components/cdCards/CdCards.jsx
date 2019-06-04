import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class CdCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
      opened: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!isEqual(nextProps.items, prevState.items)) {
      return { items: nextProps.items };
    }
    return null;
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { items } = this.state;
    const slicedata = items.slice(0, 50);
    const CDBoxesComponents = slicedata.map(item => (
      <Card key={item.id} style={{ margin: '50px 50px', width: '300px' }} >
        <CardMedia
          style={{ height: '350px' }}
          image={item.posterurl}
          title={item.title}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {item.title}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="edit">
            <Button style={{
              background: 'linear-gradient(45deg, #B511CD 30%, #FB01B9 90%)',
              border: 0,
              borderRadius: 3,
              boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
              color: 'white',
              height: 48,
              padding: '0 30px'
            }} aria-describedby={item.id} variant="contained" onClick={this.handleClickOpen}>
              Edit
            </Button>
          </IconButton>
        </CardActions>
      </Card>
    ));

    return <div className="cds-container">
      {CDBoxesComponents}
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="dialog-title">Edit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="url"
            label="Image URL"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <IconButton aria-label="edit">
            <Button variant="contained" onClick={this.handleClickOpen}>
              <DeleteIcon />
            </Button>
          </IconButton>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>;
  }
}

CdCard.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired
};

export default CdCard;
