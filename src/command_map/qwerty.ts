import * as action from 'src/action'
import * as help from 'src/action/help'

export const NORMAL = {
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
    'v': action.mark_complete,

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
}