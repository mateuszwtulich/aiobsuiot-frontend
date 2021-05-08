import React from 'react';

import '../styles/AdminTasks.scss';
import Task from 'components/Task';
import Header from 'components/Header';
import Wrapper from 'components/Wrapper';

export default function AdminTasks() {
  const elements = [{ title: 'Title1', text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' },
    { title: 'Title2', text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' }];

  return (
    <div className="AdminTasks">
      <Header title="Admin tasks" />
      <Wrapper className="content small-padding">
        <h2>Manage tasks</h2>
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
