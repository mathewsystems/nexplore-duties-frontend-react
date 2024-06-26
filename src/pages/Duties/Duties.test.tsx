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

import { cleanup, render, screen } from '@testing-library/react';
import DutiesPage from './Duties';

// JSDOM Bug Workaroundq
const originalConsoleError = console.error;
const jsDomCssError = "Error: Could not parse CSS stylesheet";
console.error = (...params) => {
  if (!params.find((p) => p.toString().includes(jsDomCssError))) {
    originalConsoleError(...params);
  }
};

describe('Duties Page Render Tests', () => {

  beforeEach(() => {
    cleanup();
  });

  test('Renders Duties Page, with task list and page meta data', () => {

    render(
      <DutiesPage/>
    );

    let element = screen.getByText(/Duties/i);
    expect(element).toBeInTheDocument();
    
    // Task List Rendering
    element = screen.getByTestId('task_list_section');
    expect(element).toBeInTheDocument();
    
    element = screen.getByTestId('task_list_wrapper');
    expect(element).toBeInTheDocument();
    
    element = screen.getByTestId('txt_total_records');
    expect(element).toBeInTheDocument();

  });

});