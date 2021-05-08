import React from 'react';
import Header from 'components/Header';
import Wrapper from 'components/Wrapper';
import Task from 'components/Task';
import 'styles/Tasks.scss';

export default function Tasks() {
  const elements = [{ title: 'Title1', text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' },
    { title: 'Title2', text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' }];

  return (
    <div className="Tasks">
      <Header title="Tasks" />
      <Wrapper className="content small-padding">
        <h2>Your tasks</h2>
        {elements.map(((value) => (
          <Task
            title={value.title}
            text={value.text}
          />
        )))}
      </Wrapper>
    </div>
  );
}
