import * as action from 'src/action'
import {EditMode, update_mode} from "src/mode";
import * as help from 'src/action/help'
import * as task_detail from 'src/action/task_detail'
import * as qwerty from './qwerty'
import * as colemak from './colemak'

const maps = qwerty

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


const NORMAL_COMMAND_MAP: CommandMap = fill_partial_commands_to_command_map(maps.NORMAL)


const PROJECT_SORT_COMMAND_MAP: CommandMap = fill_partial_commands_to_command_map({
    'd': action.sort_due_date,
    'n': action.sort_none,
})

const TASK_DETAIL_COMMAND_MAP: CommandMap = fill_partial_commands_to_command_map({
    'c': task_detail.focus_comments,
    'd': task_detail.focus_description,
    'a': task_detail.add_subtask,

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
    'Backspace': action.bullshit_clear_assignee,
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