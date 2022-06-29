import * as action from 'src/action'
import {HELP_ELEMENT_ID} from "src/action/help";
import * as help from 'src/action/help'
import {update_mode} from "src/mode";

export function show_help() {
    let help_el = document.createElement('div')
    help_el.style.cssText = 'position: fixed; top: 0; bottom: 0; left: 0; right: 0; background: white;'
    help_el.innerHTML = `
<h1>Visana Shortcuts</h1>
Press &lt;Esc&gt; to hide.

<h2>Normal mode</h2>
<p>Normal mode is the default mode.</p>

<p><strong>?</strong>&nbsp;-&nbsp;Open this help menu.</p>
<p><strong>n</strong>&nbsp;-&nbsp;Down one line.</p>
<p><strong>e</strong>&nbsp;-&nbsp;Up one line.</p>
<p><strong>t h</strong>&nbsp;-&nbsp;Go to Home.</p>
<p><strong>t t</strong>&nbsp;-&nbsp;Go to My Tasks.</p>
<p><strong>t i</strong>&nbsp;-&nbsp;Go to My Inbox.</p>
<p><strong>t g</strong>&nbsp;-&nbsp;Go to Goals.</p>
<p><strong>t {1-5}</strong>&nbsp;-&nbsp;Go to one of your first 5 projects.</p>
<p><strong>Tab</strong>&nbsp;-&nbsp;Open task detail pane.</p>
<p><strong>o</strong>&nbsp;-&nbsp;Open task detail pane.</p>
<p><strong>h</strong> - Mark task complete.</p>

<h2>Insert Mode</h2>
<p>Insert mode is when you are editing text.</p>
<p>No current keyboard shortcuts.</p>

<h2>Task Detail Mode</h2>
<p>Task Detail Mode is the task detail pane is open.</p>
<p><strong>a</strong> - Add a subtask</p>
<p><strong>c</strong> - Insert a comment.</p>
<p><strong>d</strong>&nbsp;-&nbsp;Edit the description.</p>
<p><strong>Esc</strong>&nbsp;-&nbsp;Close the task detail pane.</p>
`
    help_el.id = HELP_ELEMENT_ID
    document.body.appendChild(help_el)
    document.body.style.position = 'relative'
    update_mode(null)
}


const COLEMAK_NORMAL = {
    // edit commands
    'm': action.set_assign_to_me,
    'y': action.set_due_today,
    'w': action.set_due_tomorrow,

    // focus movement

    //colemak
    'n': () => action.move_line(1),
    'e': () => action.move_line(-1),
    'N': () => action.select_move(1),
    'E': () => action.select_move(-1),
    'd': action.focus_due_date,
    'a': action.focus_assign,
    'p': action.focus_project_attribute,
    'h': action.mark_complete,
    //qwerty

    // screen movement
    't i': () => action.go_inbox(),
    't h': () => action.go_home(),
    't t': () => action.go_my_tasks(),
    't p': () => action.go_portfolio(),
    't g': () => action.go_goals(),
    't 1': () => action.go_project_at_index(1),
    't 2': () => action.go_project_at_index(2),
    't 3': () => action.go_project_at_index(3),
    't 4': () => action.go_project_at_index(4),
    't 5': () => action.go_project_at_index(5),

    // project navigation
    's': action.open_sort_menu,

    'Tab': action.show_task_detail,
    'o': action.show_task_detail,

    // visana
    '?': show_help,
}

const QWERTY_NORMAL = {
    // edit commands
    'm': action.set_assign_to_me,
    'y': action.set_due_today,
    'w': action.set_due_tomorrow,

    // focus movement

    //colemak
    'j': () => action.move_line(1),
    'k': () => action.move_line(-1),
    'J': () => action.select_move(1),
    'K': () => action.select_move(-1),
    'd': action.focus_due_date,
    'a': action.focus_assign,
    'p': action.focus_project_attribute,
    'h': action.mark_complete,
    //qwerty

    // screen movement
    't i': () => action.go_inbox(),
    't h': () => action.go_home(),
    't t': () => action.go_my_tasks(),
    't p': () => action.go_portfolio(),
    't g': () => action.go_goals(),
    't 1': () => action.go_project_at_index(1),
    't 2': () => action.go_project_at_index(2),
    't 3': () => action.go_project_at_index(3),
    't 4': () => action.go_project_at_index(4),
    't 5': () => action.go_project_at_index(5),

    // project navigation
    's': action.open_sort_menu,

    'Tab': action.show_task_detail,
    'o': action.show_task_detail,

    // visana
    '?': show_help,
}


export const NORMAL = QWERTY_NORMAL;