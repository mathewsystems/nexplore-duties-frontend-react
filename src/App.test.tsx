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
import App from './App';
import React from 'react';

describe('Application Render Tests', () => {

  beforeEach(() => {
    cleanup();
  });

  test('Renders Home Page, with Build and Version information', () => {

    render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    let element = screen.getByText(/Build/i);
    expect(element).toBeInTheDocument();

    element = screen.getByText(/Version/i);
    expect(element).toBeInTheDocument();

    // !Important! API Server URL
    element = screen.getByTestId('http_api_server_url');
    expect(element).toBeInTheDocument();
    expect(element.hasChildNodes()).toBe(true);


  });

  test('Environment Configuration Tests', () => {

    render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    let element = process.env.REACT_APP_HTTP_API_SERVER_HOST;
    expect(element).toBeDefined();
    expect(element).toMatch(/https?:\/\/(.*)/);

  });

  test('Site Layout Components Rendering Tests', () => {

    render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

    // Main layout
    let element = screen.getByTestId('section_top');
    expect(element).toBeInTheDocument();

    element = screen.getByTestId('content_wrapper');
    expect(element).toBeInTheDocument();

    element = screen.getByTestId('footer_wrapper');
    expect(element).toBeInTheDocument();

    element = screen.getByText(/Copyright/i);
    expect(element).toBeInTheDocument();

    // Logo Existence
    element = screen.getByTestId('img_site_logo_wrapper');
    expect(element).toBeInTheDocument();

    element = screen.getByTestId('img_site_logo');
    expect(element).toBeInTheDocument();

    // Top Nav Bar
    element = screen.getByTestId('top_nav_wrapper');
    expect(element).toBeInTheDocument();

    element = screen.getByTestId('ul_top_nav');
    expect(element).toBeInTheDocument();
    
    // Menu Items > 0
    expect(element.hasChildNodes()).toBe(true);
    
  });


});
