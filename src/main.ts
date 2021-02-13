import * as action from './action'
type EditMode = 'NORMAL' | 'INSERT'
let current_mode: EditMode = 'NORMAL'
let command_stack: string[] = []


function push_command_stack(s: string): boolean {
    console.log('pushing to stack', s)
    return true
}

function clear_command_stack() {
    command_stack.splice(0,command_stack.length)
}

let command_map: {[key: string]: Function} = {
    // edit commands
    'm': action.set_assign_to_me,
    't': action.set_due_today,

    // focus movement
    'j': () => action.move_line(1),
    'k': () => action.move_line(-1),
    'J': () => action.select_move(1),
    'K': () => action.select_move(-1),
    'd': action.focus_due_date,
    'a': action.focus_assign,
    'c': action.focus_comments,

    // screen movement
    'g i': () => action.go_inbox(),
    'g h': () => action.go_home(),
    'g t': () => action.go_my_tasks(),
    'g p': () => action.go_portfolio(),
    'g g': () => action.go_goals(),
    'g 1': () => action.go_project_at_index(1),
    'g 2': () => action.go_project_at_index(2),
    'g 3': () => action.go_project_at_index(3),
    'g 4': () => action.go_project_at_index(4),
    'g 5': () => action.go_project_at_index(5),

    'Tab': action.show_task_detail,
}


function determine_mode(new_active: HTMLElement): EditMode {
    if (new_active.contentEditable === 'true') return 'INSERT'
    switch (new_active.tagName) {
        case 'TEXTAREA':
            return 'INSERT'
        case 'INPUT':
            return 'INSERT'
        default:
            return 'NORMAL'
    }
}

function update_mode(new_active: Element): void {
    let new_mode = determine_mode(new_active as HTMLElement)
    if (new_mode !== current_mode) {
        current_mode = new_mode
        console.log('Updated mode to', new_mode)
    }
}

function update_last_active(): void {
    if (!document.activeElement) return
    update_mode(document.activeElement as HTMLElement)
    console.log('New active element', document.activeElement)
}

function keydown_event_string(event: KeyboardEvent): string {
    let cmd = event.metaKey ? 'cmd+' : ''
    let alt = event.altKey ? 'alt+' : ''
    return cmd + alt + event.key
}


function handle_keydown(event: KeyboardEvent): void {
    if (current_mode !== 'NORMAL') return
    // console.log(event.key, event.altKey, event.metaKey, event.shiftKey)
    let s = keydown_event_string(event)
    command_stack.push(s)
    console.log(command_stack)
    let command = command_map[command_stack.join(' ')]
    if (command == null) {
        clear_command_stack()
        return
    }
    let keep_stack = command(event)
    if (!keep_stack) {
        clear_command_stack()
    }
}


Object.keys(command_map).forEach(k => {
    let tokens = k.split(' ')
    if (tokens.length > 0) {
        tokens.pop()
        tokens.forEach(t => {
            if (command_map[t]) return
            command_map[t] = () => push_command_stack(t)
        })
    }
})
document.addEventListener('focus', update_last_active, true)
document.addEventListener('keydown', handle_keydown)


document.addEventListener('change', function (e) {console.log(e)})
document.addEventListener('click', function (e) {console.log(e)})
document.addEventListener('focus', function (e) {console.log(e)})
