function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function get_active_cell(): Element | null {
    if (document.activeElement && document.activeElement.classList.contains('SpreadsheetGridTaskNameCell')) {
        return document.activeElement
    }
    return document.getElementById('highlightedCell')
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


export function focus_assign() {
    (document.querySelector('#highlightedCell .SpreadsheetTaskRow-assigneeCell') as HTMLElement).click()
}


export function focus_due_date(e: KeyboardEvent) {
    e.preventDefault()
    let cell_el = document.getElementById('highlightedCell') as HTMLElement
    let row_el = cell_el.parentElement!.parentElement as HTMLElement
    let due_date_el = row_el.querySelector('.SpreadsheetDueDateCell-dueDateDisplay') as HTMLElement
    due_date_el.click()
}


export function focus_project_attribute() {
    (document.querySelector('#highlightedCell .SpreadsheetTaskRow-projectsCell') as HTMLElement).click()
}


export async function set_due_today(e: KeyboardEvent) {
    let cell_el = document.getElementById('highlightedCell') as HTMLElement
    focus_due_date(e)
    let input_el = document.getElementById('due_date_input_id_select') as HTMLInputElement
    input_el.value = new Date().toLocaleDateString('en-US', {
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

export function set_assign_to_me() {
    // TODO
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
    (document.activeElement as HTMLElement).blur()
}


export function focus_comments(e: KeyboardEvent) {
    e.preventDefault();
    let el = document.getElementsByClassName('ProsemirrorEditor')[1] as HTMLElement
    el.focus()
    // put focus on the end of any existing content instead of at the start (which is what happens by default.)
    let sel = window.getSelection()!
    let range = document.createRange()
    range.selectNodeContents(el)
    sel.removeAllRanges()
    sel.addRange(range)
    document.getSelection()!.collapseToEnd()
}
