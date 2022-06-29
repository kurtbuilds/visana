import {delay} from "src/util";
import {update_mode} from "../mode";

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function get_active_cell(): Element | null {
    let highligted = document.getElementById('highlightedCell')
    if (highligted) {
        if (highligted.classList.contains('SpreadsheetGridTaskNameCell')) {
            return highligted
        } else {
            let cell = highligted.parentElement!.parentElement!.querySelector('.SpreadsheetGridTaskNameCell')
            if (cell) {
                return cell
            }
        }
    }
    return null
}

function get_current_index(): number | null {
    let tasks = document.getElementsByClassName('SpreadsheetGridTaskNameCell')
    let active_el = get_active_cell()
    if (!active_el) return null
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i] === active_el) {
            return i
        }
    }
    return null
}

function set_current_index(i: number) {
    let tasks = document.getElementsByClassName('SpreadsheetGridTaskNameCell')
    if (i >= tasks.length || i < 0) return;
    (tasks[i] as HTMLElement).focus()
}


function select_click_index(i: number) {
    let tasks = document.getElementsByClassName('SpreadsheetGridTaskNameCell')
    if (i >= tasks.length) return;
    (tasks[i] as HTMLElement).dispatchEvent(new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
        shiftKey: true,
    }))
}


export function move_line(n: number) {
    let idx = get_current_index()
    let new_idx = idx == null ? 0 : idx + n
    set_current_index(new_idx)
}


export function select_move(n: number) {
    let idx = get_current_index()
    let new_idx = idx == null ? 0 : idx + n
    select_click_index(new_idx)
}


export function focus_assign(e: KeyboardEvent) {
    e.preventDefault()
    let cell_el = document.getElementById('highlightedCell') as HTMLElement
    let row_el = cell_el.parentElement!.parentElement as HTMLElement
    // let assign_el = row_el.querySelector('.SpreadsheetTaskRow-assigneeCell') as HTMLElement
    let assign_el = row_el.querySelector('.AssigneeWithNameDisplay') as HTMLElement
    assign_el.click()
    let input_el = row_el.querySelector('input') as HTMLElement
    input_el.focus()
}


export function focus_due_date(e: KeyboardEvent): Promise<void> {
    e.preventDefault()
    let cell_el = document.getElementById('highlightedCell') as HTMLElement
    let row_el = cell_el.parentElement!.parentElement as HTMLElement
    let due_date_el = row_el.querySelector('.SpreadsheetMutableDateCell') as HTMLElement
    due_date_el.click()

    async function focus_date() {
        await delay(10)
        let el = document.activeElement as HTMLElement
        el = el.children[0].children[0].children[0] as HTMLElement
        el.click()
        await delay(10)
        el = document.querySelector("#due_date_input_id_select") as HTMLElement
        el.focus()
    }
    return focus_date()
        .catch(e => console.error(e))
}


export function focus_project_attribute(e: KeyboardEvent) {
    e.preventDefault()
    let cell_el = document.getElementById('highlightedCell') as HTMLElement
    let row_el = cell_el.parentElement!.parentElement as HTMLElement
    let project_el = row_el.querySelector('.SpreadsheetTaskRow-projectsCell .SpreadsheetPotsCell-clickTarget') as HTMLElement
    project_el.click()
}


export async function set_due_date(e: KeyboardEvent, date: Date) {
    let cell_el = document.getElementById('highlightedCell') as HTMLElement
    await focus_due_date(e)

    let input_el = document.getElementById('due_date_input_id_select') as HTMLInputElement
    input_el.value = date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
    })
    input_el.dispatchEvent(new Event('input', {
        bubbles: true,
        cancelable: true,
    }))
    input_el.dispatchEvent(new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        view: window,
        key: 'Enter',
    }))
    cell_el.focus()
}


export async function set_due_today(e: KeyboardEvent) {
    return set_due_date(e, new Date())
}


export async function set_due_tomorrow(e: KeyboardEvent) {
    return set_due_date(e, new Date(+new Date() + 1000*60*60*24))
}

export async function set_assign_to_me(e: KeyboardEvent) {
    focus_assign(e)
    await delay(100)
    let input_el = document.activeElement as HTMLInputElement
    // input_el.value = 'me'
    input_el.dispatchEvent(new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        view: window,
        //@ts-ignore
        keyCode: 40,
    }))
    input_el.dispatchEvent(new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        view: window,
        //@ts-ignore
        keyCode: 13,
    }))
}


export function go_home() {
    (document.getElementsByClassName('SidebarTopNavLinks-homeButton')[0] as HTMLElement).click()
}


export function go_my_tasks() {
    (document.getElementsByClassName('SidebarTopNavLinks-myTasksButton')[0] as HTMLElement).click()
}


export function go_inbox() {
    (document.getElementsByClassName('SidebarTopNavLinks-notificationsButton')[0] as HTMLElement).click()
}


export function go_portfolio() {
    (document.getElementsByClassName('SidebarTopNavLinks-myPortfoliosbutton')[0] as HTMLElement).click()
}

export function go_goals() {
    (document.getElementsByClassName('SidebarTopNavLinks-goalsButton')[0] as HTMLElement).click()
}


export function go_project_at_index(n: number) {
    (document.querySelectorAll('.SidebarDraggableItemRowStructure-dropTarget--sidebarItem a')[n - 1] as HTMLElement).click()
}

export function show_task_detail(e: KeyboardEvent) {
    e.preventDefault()
    let el = document.querySelector('#highlightedCell .SpreadsheetGridTaskNameCell-detailsButtonClickArea') as HTMLElement
    if (!el) return
    el.click();
    // Going into detail leaves the task name (in the grid) in an editable state. The command "Enter" does that, so
    // we remove focus after opening the detail pane.
    ;(document.activeElement as HTMLElement).blur()
    update_mode(null)
}



export function open_sort_menu() {
    (document.getElementsByClassName('SortMenu')[0] as HTMLElement).click()
    update_mode(null)
}

export function sort_due_date() {
    document.getElementById('view_options_sort_ByDate')?.click()
    update_mode(null)
}

export function sort_none() {
    document.getElementById('view_options_sort_ByPriority')?.click()
    update_mode(null)

}


export function mark_complete(e: KeyboardEvent) {
    e.preventDefault()
    let cell_el = document.getElementById('highlightedCell') as HTMLElement
    let row_el = cell_el.parentElement!.parentElement as HTMLElement
    let completion_checkbox = row_el.querySelector('.TaskRowCompletionStatus-checkbox') as HTMLElement
    completion_checkbox.click()
    move_line(1)
}


export function bullshit_clear_assignee(e: KeyboardEvent) {
    let el = document.activeElement as HTMLInputElement | undefined
    if (!el) return
    if (!Array.from(el.parentElement!.classList).includes('SpreadsheetAssigneeCell-input')) return
    if (el.value !== '') return
    el.dispatchEvent(new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        view: window,
        //@ts-ignore
        keyCode: 27, // escape
    }))
    let cell_el = document.activeElement!.querySelector('.SpreadsheetAssigneeCell-removeButton') as HTMLElement
    cell_el.click()
}