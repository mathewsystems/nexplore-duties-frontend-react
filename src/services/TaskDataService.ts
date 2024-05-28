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

import axios from "axios";
import { Task } from "../models/baseClasses";
import { AddTaskRequest } from "../models/wsTypes/addTaskRequest";
import uuid from 'uuid-random';
import { GetTasksResponse } from "../models/wsTypes/getTasksResponse";
import { AddTaskResponse } from "../models/wsTypes/addTaskResponse";

export default class TaskDataService {

    private serverHost = process.env.REACT_APP_HTTP_API_SERVER_HOST;

    public async getTaskList():Promise<GetTasksResponse> {

        const requestUuid = uuid();
        const requestTimestamp = new Date();

        const httpHeaders = {
            "X-API-OPERATION": "/tasks/get/",
            "X-API-REQUEST-TIMESTAMP": requestTimestamp.toISOString(),
            "X-API-REQUEST-UUID": requestUuid
        };

        const res = await axios.get(this.serverHost + "/tasks/", {
            headers: httpHeaders
        });

        console.debug(res.data);

        const respObj:GetTasksResponse = res.data;

        return respObj;
    
    }

    public async addTask(task: Task):Promise<string|undefined> {

        const requestUuid = uuid();
        const requestTimestamp = new Date();

        const httpHeaders = {
            "X-API-OPERATION": "/tasks/add/",
            "X-API-REQUEST-TIMESTAMP": requestTimestamp.toISOString(),
            "X-API-REQUEST-UUID": requestUuid
        };
    
        const reqObj:AddTaskRequest = {
            requestUuid: requestUuid,
            requestTimestamp: new Date(),
            newTask: task
        };

        await axios.post<AddTaskResponse>(this.serverHost + "/tasks/add/", reqObj, {
            headers: httpHeaders
        })
        .then((res) => {

            console.debug(res.data);
    
            const respObj:AddTaskResponse = res.data;

            return respObj.taskId;

        })
        .catch(_err => {
    
            const respObj:AddTaskResponse = _err.response.data;

            console.error("Add task API call unsuccessful. " + respObj.errors?.toString());

            throw new Error(respObj.errors?.toString());

        });

        return undefined;
    
    }

    public async deleteTask(id: string) {

        if (id.length === 0) {
            throw new Error("Invalid ID");
        }

        const requestUuid = uuid();
        const requestTimestamp = new Date();

        const httpHeaders = {
            "X-API-OPERATION": "/tasks/delete/",
            "X-API-REQUEST-TIMESTAMP": requestTimestamp.toISOString(),
            "X-API-REQUEST-UUID": requestUuid
        };

        await axios.delete(this.serverHost + "/tasks/" + id, {
            headers: httpHeaders
        });
    
    }

}