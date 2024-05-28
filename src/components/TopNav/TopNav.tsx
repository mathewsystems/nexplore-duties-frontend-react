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

import { Link } from "react-router-dom";
import "./TopNav.scss"

export default function TopNav() {

    return (
        <div>

            <div id="section_page_header">

                <div id="img_site_logo_wrapper" data-testid="img_site_logo_wrapper">
                    <img id="img_site_logo" data-testid="img_site_logo" src="./imgs/NXP_Logo_RGB.png" alt="Nexplore" title="Nexplore"/>
                </div>

            </div>

            <div id="top_nav_wrapper" data-testid="top_nav_wrapper">

                <ul id="ul_top_nav" data-testid="ul_top_nav">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/duties">Duties</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>

            </div>

        </div>
    );

}