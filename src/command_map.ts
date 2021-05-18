import * as action from './action'
import {EditMode, update_mode} from "./mode";
import * as help from './action/help'
import * as task_detail from './action/task_detail'

export type CommandMap = { [key: string]: Function }

function push_command_stack(s: string): boolean {
    return true
}

export function fill_partial_commands_to_command_map(command_map: CommandMap): CommandMap {
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
    return command_map
}


const NORMAL_COMMAND_MAP: CommandMap = fill_partial_commands_to_command_map({
    // edit commands
    'm': action.set_assign_to_me,
    't': action.set_due_today,
    'w': action.set_due_tomorrow,

    // focus movement
    'j': () => action.move_line(1),
    'k': () => action.move_line(-1),
    'J': () => action.select_move(1),
    'K': () => action.select_move(-1),
    'd': action.focus_due_date,
    'a': action.focus_assign,
    'p': action.focus_project_attribute,


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

    // project navigation
    's': action.open_sort_menu,

    'Tab': action.show_task_detail,
    'o': action.show_task_detail,

    // visana
    '?': help.show_help,
})


const PROJECT_SORT_COMMAND_MAP: CommandMap = fill_partial_commands_to_command_map({
    'd': action.sort_due_date,
    'n': action.sort_none,
})

const TASK_DETAIL_COMMAND_MAP: CommandMap = fill_partial_commands_to_command_map({
    'c': task_detail.focus_comments,
    'd': task_detail.focus_description,

    'Escape': task_detail.close,
})

const HELP_COMMAND_MAP: CommandMap = fill_partial_commands_to_command_map({
    'Escape': help.hide_help,
})


function blur() {
    (document.activeElement as HTMLElement)?.blur()
    update_mode(null)
}

const INSERT_COMMAND_MAP: CommandMap = fill_partial_commands_to_command_map({
    'Escape': blur,
})

export const COMMAND_MAP_MAP: Record<EditMode, CommandMap> = {
    'NORMAL': NORMAL_COMMAND_MAP,
    'PROJECT_SORT': PROJECT_SORT_COMMAND_MAP,
    'INSERT': INSERT_COMMAND_MAP,
    'TASK_DETAIL': TASK_DETAIL_COMMAND_MAP,
    'HELP': HELP_COMMAND_MAP,
    'WAITING': {},
}