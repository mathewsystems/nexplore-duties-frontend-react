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

import { formatDate } from "date-fns";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { Task } from "../../models/baseClasses";
import { TaskPriority } from "../../models/interfaces/taskPriority";
import { TaskStatus } from "../../models/interfaces/taskStatus";

export default function TaskList({tasks, deleteCallbackFn}: {tasks: Task[], deleteCallbackFn:any}) {

    const renderedItems: React.ReactNode = tasks.map(t => {
        return (
            <div className="task_item" key={t.id}>

                <Panel header={t.id + ' - ' + t.name} data-testid={`panelTask_${t.id}`}>
                    <div className='btnDelete'>
                        <Button data-testid={`btnDeleteTask_${t.id}`} onClick={() => deleteCallbackFn(t.id)} icon="pi pi-times"></Button>
                    </div>

                    <div>Created By: {t.assignedBy}</div>
                    <div>Assigned By: {t.assignedBy}</div>
                    <div>Assigned To: {t.responsiblePerson}</div>
                    <div>Priority: {t.priority == null ? '' : TaskPriority[t.priority]}</div>
                    <div>Posted On: {t.postingDate == null ? '' : formatDate(t.postingDate, 'yyyy-MM-dd HH:mm')}</div>
                    <div>Deadline: {t.deadline == null ? '' : formatDate(t.deadline, 'yyyy-MM-dd HH:mm')}</div>
                    <div>Summary: {t.abstract}</div>
                    <div>Status: {t.statusCode == null ? '' : TaskStatus[t.statusCode]}</div>
                </Panel>
                
            </div>
        )
    });

    return (
        <div id="task_list_wrapper" data-testid="task_list_wrapper">
            {renderedItems}
        </div>
    );

}