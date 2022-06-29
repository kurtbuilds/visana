import {current_mode, update_mode} from "./mode";
import {COMMAND_MAP_MAP} from "./command_map";

let command_stack: string[] = []

function clear_command_stack() {
    command_stack.splice(0, command_stack.length)
}

function update_last_active(): void {
    if (!document.activeElement) return
    update_mode(document.activeElement as HTMLElement)
}

function keydown_event_string(event: KeyboardEvent): string {
    let cmd = event.metaKey ? 'cmd+' : ''
    let alt = event.altKey ? 'alt+' : ''
    return cmd + alt + event.key
}


function handle_keydown(event: KeyboardEvent): void {
    let mode = current_mode()
    // console.log(event.key, event.altKey, event.metaKey, event.shiftKey)
    if (['Meta'].includes(event.key)) return
    let s = keydown_event_string(event)
    command_stack.push(s)
    console.log('Mode:', mode, 'Command stack:', command_stack)
    let command = COMMAND_MAP_MAP[mode][command_stack.join(' ')]
    console.log('Chosen command', command?.name)
    if (command == null) {
        clear_command_stack()
        update_mode(document.activeElement)
        return
    }
    let keep_stack = command(event)
    if (!keep_stack) {
        clear_command_stack()
    }
}


document.addEventListener('focus', update_last_active, true)
document.addEventListener('keydown', handle_keydown)


// Debug tools
// document.addEventListener('change', function (e) {console.log(e)})
// document.addEventListener('click', function (e) {console.log(e)})
// document.addEventListener('focus', function (e) {console.log(e)})
// document.addEventListener('keydown', function (e) {console.log(e)})
// document.addEventListener('keyup', function (e) {console.log(e)})
// document.addEventListener('keypress', function (e) {console.log(e)})
