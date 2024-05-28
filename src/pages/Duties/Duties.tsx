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

import { formatDate } from 'date-fns';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Messages } from 'primereact/messages';
import { Panel } from 'primereact/panel';
import { useEffect, useRef, useState } from 'react';
import { sanitizeStringFields } from '../../commons/commonFunctions';
import TaskList from '../../components/TaskList/TaskList';
import { Task } from '../../models/baseClasses';
import { TaskPriority } from '../../models/interfaces/taskPriority';
import TaskDataService from '../../services/TaskDataService';
import './Duties.scss';

const taskPriorities = [
    { name: 'Low', code: TaskPriority.LOW },
    { name: 'NORMAL', code: TaskPriority.NORMAL},
    { name: 'High', code: TaskPriority.HIGH },
];

const fieldLimits = {
    name: 80,
    abstract: 1000,
    description: 3000
};

const today = new Date();

export default function DutiesPage() {

    // Service Dependency Injection
    const taskService = new TaskDataService();
    
    // Page State Hooks
    const [dataTimestamp, setDataTimestamp] = useState<Date | null>(null);

    const messages = useRef<Messages>(null);

    const [dialogAddVisible, setDialogAddVisible] = useState(false);
    const [btnRefreshLoading, setBtnRefreshLoading] = useState(false);
    const [btnAddLoading, setBtnAddLoading] = useState(false);
    const [btnAddDisabled, setBtnAddDisabled] = useState(true);
    // EOF - Page State Hooks

    // Form fields
    const defaultTaskValues = {
        id: '',
        name: '',
        priority: TaskPriority.NORMAL
    }

    const [addTaskData, setAddTaskData] = useState<Task>({...defaultTaskValues});

    // Page Data Hooks
    const [totalRecords, setTotalRecords] = useState(0);
    const [pageTaskList, setPageTaskList] = useState<Task[]>([]);

    // Delete Button Variable
    let deleteId = '';

    // Page initializer hook
    useEffect(() => {
        fetchTaskList();
    },[])
    
    /* Page State Functions */
    const fetchTaskList = async() => {

        setBtnRefreshLoading(true);

        await taskService.getTaskList()
            .then(r => {
                setTotalRecords((r.totalRecords == null ? 0 : r.totalRecords))
                setPageTaskList((r.tasks == null ? [] : r.tasks));
                setDataTimestamp(new Date());
            })
            .catch(_err => {

                console.error("Error fetching task list from server. " + _err);

                messages?.current?.show([{
                    severity: 'error',
                    summary: "Error fetching task list from server. " + _err,
                    life: 8000
                }]);

            });

        setBtnRefreshLoading(false);
    
    }

    function deleteTask(id: string) {
    
        console.debug("Deleting task " + id);
    
        taskService.deleteTask(id)
            .then(() => {

                messages?.current?.show([{
                    severity: 'success',
                    summary: `Task ${id} deleted successfully.`
                }]);

                console.log("Task deleted. Retrieving new task list from server...");
        
                fetchTaskList();

            });
    
    }

    async function addTask(task:Task) {

        // Sanitize
        task = sanitizeStringFields(task);
    
        console.log("Adding task ", addTaskData.name, addTaskData.abstract);

        await taskService.addTask(task)
            .then((taskId) => {

                messages?.current?.show([{
                    severity: 'success',
                    summary: `Task added successfully. New Task ID: ${taskId}`
                }]);

                console.log("Task deleted. Retrieving new task list from server...");
        
                fetchTaskList();

            })
            .catch(_err => {
                
                throw _err;
            
            });

    }
    /* EOF - Page State Functions */

    /* Form Handling Functions */
    const handleFormChange = (event:any) => {

        const { name, value } = event.target;
        
        setAddTaskData((prevFormData) => ({ ...prevFormData, [name]: value }));

    };

    function onFieldBlur(event:any) {

        const { name, value } = event.target;

        const sanitizedValue = value.trim();
        
        setAddTaskData((prevFormData) => ({ ...prevFormData, [name]: sanitizedValue }));

        validateAddTaskForm();

    }
    
    const handleSubmit = (event:any) => {
        
        event.preventDefault();
        
        console.debug(addTaskData);

        setBtnAddLoading(true);

        // Call API
        addTask(addTaskData)
            .then(() => {

                // Reset Form Fields
                setAddTaskData({...defaultTaskValues});

                setBtnAddDisabled(true);

            })
            .catch(_err => {
                
                console.debug("Error adding task.");
                console.debug(_err);

                messages?.current?.show([{
                    severity: 'error',
                    summary: "Error adding task. Reason: " + _err.message,
                    life: 10000
                }]);

            })
            .finally(() => {

                setBtnAddLoading(false);

                // Close Dialog
                setDialogAddVisible(false);

            });

    };
    
    const handleCancelDialog = (event:any) => {
        event.preventDefault();
        setDialogAddVisible(false);
    };
    /* EOF - Form Handling Functions */

    // Confirm Deletion Dialog
    function onConfirmDelete() {

        if (deleteId == null || deleteId === '' || deleteId.length === 0) {
            console.error('Task ID undefined for deletion');
            return;
        }

        deleteTask(deleteId);
        
        deleteId = '';
        
    }

    function confirmDelete() {

        confirmDialog({
            message: `Do you want to delete task ${deleteId}?`,
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept: onConfirmDelete
        });

    };
    // EOF - Confirm Deletion Dialog

    /* Form Validation Functions */

    // Fields valid states
    const [fieldInvalid, setFieldInvalid] = useState({
        name: false,
        abstract: false,
        description: false
    });

    function validateAddTaskForm() {

        let localFormValid = true;

        // Task title field
        if (addTaskData.name == null || addTaskData.name.length === 0 || addTaskData.name.length > fieldLimits.name) {

            setFieldInvalid((prevData) => ({ ...prevData, name: true}));
            localFormValid = false;

        } else {
            setFieldInvalid((prevData) => ({ ...prevData, name: false}));
        }

        // Summary field
        if (addTaskData.abstract == null || addTaskData.abstract.length === 0 || addTaskData.abstract.length > fieldLimits.abstract) {

            setFieldInvalid((prevData) => ({ ...prevData, abstract: true}));
            localFormValid = false;

        } else {
            setFieldInvalid((prevData) => ({ ...prevData, abstract: false}));
        }

        // Full description field
        if (addTaskData.description != null && addTaskData.description.length > fieldLimits.description) {

            setFieldInvalid((prevData) => ({ ...prevData, description: true}));
            localFormValid = false;

        } else {
            setFieldInvalid((prevData) => ({ ...prevData, description: false}));
        }

        setBtnAddDisabled(!localFormValid);

    }

    function onInvalid() {
        setBtnAddDisabled(true);
    }
    /* EOF - Form Validation Functions */

    /* Page Component Callbacks */
    const taskListDeleteBtnCallbackFn = (taskId:string) => {

        deleteId = taskId;
        
        confirmDelete();

    }
    /* EOF - Page Callbacks */
        
    return (
        <div>

            <h1>Duties</h1>

            <div>
                <Messages ref={messages} />
            </div>

            <div id="main_controls_wrapper">
                <Button id="btn_refresh" name="btn_refresh" data-testid="btn_refresh" icon="pi pi-refresh" onClick={fetchTaskList} loading={btnRefreshLoading}>Refresh</Button>
                <Button label="Add" icon="pi pi-plus" onClick={() => setDialogAddVisible(true)} />
            </div>

            <div id="meta_data_wrapper">
                <div>
                    Data Timestamp: <span>{dataTimestamp == null ? '' : formatDate(dataTimestamp, 'yyyy-MM-dd HH:mm:ss')}</span>
                </div>
                <div>
                    Total Records: <span data-testid="txt_total_records">{totalRecords}</span>
                </div>
            </div>

            <div id="task_list_section" data-testid="task_list_section">
                <TaskList tasks={pageTaskList} deleteCallbackFn={taskListDeleteBtnCallbackFn}/>
            </div>

            <Dialog id="dialogAdd" header="Add Task" modal={true} visible={dialogAddVisible} onHide={() => {setDialogAddVisible(false)}}>

                <div>
                    
                    <form>

                        <Panel header="Task Info" className='form_sections'>
                            <div>
                                <InputText name="name" maxLength={fieldLimits.name} placeholder="Task Title" value={addTaskData.name} onChange={handleFormChange}
                                    onBlur={onFieldBlur} minLength={6} invalid={fieldInvalid.name} onInvalid={onInvalid} required={true}/>
                            </div>
                            <div>
                                <Calendar name="deadline" placeholder="Deadline" value={addTaskData.deadline}
                                    onChange={handleFormChange} showTime showIcon hourFormat="24" minDate={today}/>
                            </div>
                            <div><Dropdown name="priority" placeholder="Priority" value={addTaskData.priority} options={taskPriorities} optionLabel='name' optionValue='code'
                                    highlightOnSelect={true} checkmark={true} onChange={handleFormChange}/></div>
                        </Panel>
                        
                        <Panel header="Details" className='form_sections'>
                            <div>
                                <InputTextarea name="abstract" maxLength={fieldLimits.abstract} placeholder="Task Summary" value={addTaskData.abstract}
                                    onBlur={onFieldBlur} onChange={handleFormChange} minLength={10} invalid={fieldInvalid.abstract} required={true}
                                    rows={5}/>
                            </div>
                            <div>
                                <InputTextarea name="description" maxLength={fieldLimits.description} placeholder="Full Description" value={addTaskData.description}
                                    onBlur={onFieldBlur} onChange={handleFormChange} invalid={fieldInvalid.description}
                                    rows={8}/>
                            </div>
                        </Panel>

                        <div className="form_buttons_wrapper">
                            <Button type='submit' icon="pi pi-check" onClick={handleSubmit} loading={btnAddLoading} disabled={btnAddDisabled}>Add</Button>
                            <Button icon="pi pi-times" onClick={handleCancelDialog}>Cancel</Button>
                        </div>

                    </form>

                </div>

            </Dialog>
            
            <ConfirmDialog />

        </div>
    );

}