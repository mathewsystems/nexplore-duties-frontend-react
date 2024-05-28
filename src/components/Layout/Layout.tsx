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

import { Outlet } from "react-router-dom";
import PageFooter from "../PageFooter/PageFooter"
import TopNav from "../TopNav/TopNav"
import "./Layout.scss"

export const LayoutComponent = () => {
    
    return (
        <>
            <div id="section_top" data-testid="section_top">
                <TopNav/>
            </div>
            <div id="content_wrapper" data-testid="content_wrapper">
                <Outlet/>
            </div>
            <div id="footer_wrapper" data-testid="footer_wrapper">
                <PageFooter/>
            </div>
        </>
    );

};