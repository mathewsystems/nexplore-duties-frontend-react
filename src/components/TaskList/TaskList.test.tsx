/*
 * Copyright 2024 Mathew Chan. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * @author Mathew Chan
 * @email mathew.chan@mathewsystems.com
 * @web mathewsystems.com
 * @web matcphotos.com
 */

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import TaskList from './TaskList';
import { Task } from '../../models/baseClasses';
import { TaskPriority } from '../../models/interfaces/taskPriority';

// JSDOM Bug Workaroundq
const originalConsoleError = console.error;
const jsDomCssError = "Error: Could not parse CSS stylesheet";
console.error = (...params) => {
  if (!params.find((p) => p.toString().includes(jsDomCssError))) {
    originalConsoleError(...params);
  }
};

// Mock Data
const mockTaskList: Task[] = [
    {
        id: '10001',
        name: 'Task 10001',
        abstract: 'Task Summary 10001',
        description: 'Task Description 10001',
        priority: TaskPriority.HIGH,
        postingDate: new Date(),
        deadline: new Date()
    },
    {
        id: '10002',
        name: 'Task 10002',
        abstract: 'Task Summary 10002',
        description: 'Task Description 10002',
        priority: TaskPriority.NORMAL,
        postingDate: new Date(),
        deadline: new Date()
    },
    {
        id: '10003',
        name: 'Task 10003',
        abstract: 'Task Summary 10003',
        description: 'Task Description 10003',
        priority: TaskPriority.LOW,
        postingDate: new Date(),
        deadline: new Date()
    }
];

describe('Task List Component Functional Tests', () => {

  beforeEach(() => {
    cleanup();
  });

  // List Item Rendering Correctness
  test('Task List Rendering Tests - Item Count', () => {

    // Delete Btn Mock
    const deleteCallback = jest.fn();

    render(
      <TaskList tasks={mockTaskList} deleteCallbackFn={deleteCallback}/>
    );

    // Test Panel Items Rendering
    const listWrapper = screen.getByTestId('task_list_wrapper');

    // Check items count
    expect(listWrapper.childNodes.length).toBe(mockTaskList.length);

    // Loop through all panels
    mockTaskList.forEach((t) => {

        const panelElement = screen.getByTestId(`panelTask_${t.id}`);
        
        expect(panelElement).toBeInTheDocument();

    });

  });

  // Test Button Implementation, Existence and Function
  test('Delete Task Event Firing Test', () => {

    // Delete Btn Mock
    const deleteCallback = jest.fn();

    render(
      <TaskList tasks={mockTaskList} deleteCallbackFn={deleteCallback}/>
    );

    // Loop through all buttons, fire each of them
    mockTaskList.forEach((t) => {

        const btnDelete = screen.getByTestId(`btnDeleteTask_${t.id}`);
    
        expect(btnDelete).toBeInTheDocument();
        
        // Task List Rendering
        fireEvent.click(btnDelete);
    
        // Check Callback Parameter
        expect(deleteCallback).toBeCalledWith(`${t.id}`);

    });
    
    expect(deleteCallback).toHaveBeenCalledTimes(mockTaskList.length);

  });

});