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


export function focus_assign(e: KeyboardEvent): HTMLElement {
    e.preventDefault()
    let cell_el = document.getElementById('highlightedCell') as HTMLElement
    let row_el = cell_el.parentElement!.parentElement as HTMLElement
    let assign_el = row_el.querySelector('.SpreadsheetTaskRow-assigneeCell') as HTMLElement
    assign_el.click()
    return assign_el
}


export function focus_due_date(e: KeyboardEvent) {
    e.preventDefault()
    let cell_el = document.getElementById('highlightedCell') as HTMLElement
    let row_el = cell_el.parentElement!.parentElement as HTMLElement
    let due_date_el = row_el.querySelector('.SpreadsheetDueDateCell-dueDateDisplay') as HTMLElement
    due_date_el.click()
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
    focus_due_date(e)
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


export function set_assign_to_me(e: KeyboardEvent) {
    let cell_el = get_active_cell() as HTMLElement
    focus_assign(e)
    let input_el = cell_el.parentElement!.parentElement!.querySelector('input') as HTMLInputElement
    input_el.value = 'me'
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