import React from 'react';
import Header from 'components/Header';
import Wrapper from 'components/Wrapper';
import CTask from 'components/CTask';
import Task from 'models/Task';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import 'styles/Tasks.scss';

export default function Tasks() {
  const elements : Task[] = [{
    title: 'Title1', user: 'floffler', finalDate: new Date(2021, 5, 5), text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
  },
  {
    title: 'Title2', user: 'floffler', finalDate: new Date(2021, 5, 5), text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
  },
  {
    title: 'Title3', user: 'floffler', finalDate: new Date(2021, 5, 5), text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
  },
  {
    title: 'Title4', user: 'floffler', finalDate: new Date(2021, 5, 5), text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
  }];

  const [value, setValue] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleCreating = () => {

  };

  function handleSubmit(event) {
    alert('Podano następujące imię: ');
    event.preventDefault();
  }

  return (
    <div className="Tasks">
      <Header title="Tasks" />
      <Wrapper className="content small-Padding">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="heading">Add Task</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form onSubmit={handleSubmit}>
              <TextField
                required
                fullWidth
                label="Name"
                defaultValue=""
              />
              <TextField
                id="standard-textarea"
                label="Description"
                multiline
                fullWidth
                rowsMax={4}
                value={value}
                onChange={handleChange}
              />
              <TextField
                required
                id="datetime-local"
                label="Due date"
                type="datetime-local"
                className="dateField"
                defaultValue="2017-05-24T10:30"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <br />
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleCreating}
              >
                Create New
              </Button>
            </form>
          </AccordionDetails>
        </Accordion>
        {elements.map(((taskTemp) => <CTask title={taskTemp.title} text={taskTemp.text} user={taskTemp.user} finalDate={taskTemp.finalDate} />))}
      </Wrapper>
    </div>
  );
}
